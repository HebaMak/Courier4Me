import Message, { validateMessage } from "../models/Message.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ success: true, result: messages });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get messages, try again later" });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (typeof message !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'message' object. Received: ${JSON.stringify(
          message
        )}`,
      });

      return;
    }

    const errorList = validateMessage(message);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newMessage = await Message.create(message);

      res.status(201).json({ success: true, message: newMessage });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create message, try again later",
    });
  }
};
