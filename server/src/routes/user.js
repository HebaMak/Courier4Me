import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  login,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  resetPasswordPost,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.post("/login", login);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.get("/resetpassword/:id/:token", resetPassword);
userRouter.post("/resetpassword/:id/:token", resetPasswordPost);

export default userRouter;
