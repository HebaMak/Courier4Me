import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  isCourier: { type: Boolean, required: false },
  profilePic: { type: String, required: false },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(); // how math should ,
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "password",
    "isCourier",
    "profilePic",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (!userObject.firstName) {
    errorList.push("first name is a required field");
  }

  if (!userObject.lastName) {
    errorList.push("last name is a required field");
  }

  if (!userObject.email) {
    errorList.push("email is a required field");
  }

  if (!userObject.phoneNumber) {
    errorList.push("phone number is a required field");
  }

  if (!userObject.password) {
    errorList.push("password is a required field");
  }

  if (typeof userObject.isCourier !== "boolean") {
    errorList.push("password is a required field");
  }

  if (!validator.isEmail(userObject.email)) {
    errorList.push("Please enter a valid email");
  }

  if (
    !validator.isStrongPassword(userObject.password, {
      minLength: 6,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 1,
    })
  ) {
    errorList.push(
      "Password must be minimum 6 chars, and contain one capital and small letter"
    );
  }
  return errorList;
};

export default User;
