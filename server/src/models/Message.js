import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const messageSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  messageText: { type: String, required: true },
});

const Message = mongoose.model("messages", messageSchema);

export const validateMessage = (messageObject) => {
  const errorList = [];
  const allowedKeys = [
    "email",
    "firstName",
    "lastName",
    "phoneNumber",
    "messageText",
  ];

  const validatedKeysMessage = validateAllowedFields(
    messageObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (messageObject.email == null) {
    errorList.push("email is a required field");
  }

  if (messageObject.firstName == null) {
    errorList.push("first name is a required field");
  }

  if (messageObject.lastName == null) {
    errorList.push("last name is a required field");
  }
  if (messageObject.phoneNumber == null) {
    errorList.push("phone number is a required field");
  }
  if (messageObject.messageText == null) {
    errorList.push("message text is a required field");
  }

  return errorList;
};

export default Message;
