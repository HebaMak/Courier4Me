import User, { validateUser } from "../models/User.js";
import Delivery from "../models/Delivery.js";
import Message from "../models/Message.js";
import { logError, logInfo } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

//get one user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: `No user found with the id ${req.params.id}`,
      });
    }
    user.password = null;
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    logError(error);
    res.json({ success: false, msg: "Unable to get user, try again later" });
  }
};

//get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

//create a new user
export const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newUser = await User.create(user);

      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    logError(error);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res
        .status(400)
        .json({ success: false, msg: "BAD REQUEST: Email already exists" });
    } else {
      res.status(500).json({
        success: false,
        msg: "Unable to create user, try again later",
      });
    }
  }
};

//login
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json({ success: false, msg: "no user found" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ success: false, msg: "Wrong password or email" });
      return;
    }

    res.json(user);
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to login user, try again later" });
  }
};

//update user info
export const updateUser = async (req, res) => {
  try {
    const { user } = req.body;
    if (typeof user !== "object") {
      return res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });
    }

    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: user,
      },
      { new: true }
    );
    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    logError(err);
    res
      .status(500)
      .json({ success: false, msg: "You can update only your account" });
  }
};

//forget password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }

    const secret = process.env.JWT + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "30m",
    });
    let baseLink;
    if (process.env.NODE_ENV === "production") {
      baseLink = "http://c39-hyf.herokuapp.com";
    } else {
      baseLink = "http://localhost:5000";
    }
    const link = `${baseLink}/api/user/resetpassword/${oldUser._id}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PSWD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_APP,
      to: email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logError(error);
        res.status(500).json({ success: false, msg: "Unable to send email" });
      } else {
        logInfo("Email sent: " + info.response);
      }
    });
    res.json({
      status:
        "The password reset link has been emailed, please check your mail. The link will be valid for 30 minutes.",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Unable to send email" });
  }
};

//reset password
export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    logError(error);
    res.send("Not Verified");
  }
};

// reset password post
export const resetPasswordPost = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    res.json({ status: "Something went wrong" });
  }
};

//delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    await Delivery.deleteMany({ email: user.email });
    await Message.deleteMany({ email: user.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: `No user found wih this id: ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      msg: `User with the id: ${req.params.id} has been deleted`,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Unable to delete user" });
  }
};
