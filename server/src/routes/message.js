import express from "express";
import { createMessage, getMessages } from "../controllers/message.js";

const messageRouter = express.Router();

messageRouter.get("/", getMessages);
messageRouter.post("/create", createMessage);

export default messageRouter;
