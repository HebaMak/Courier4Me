import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const deliverySchema = new mongoose.Schema({
  email: { type: String },
  date: { type: String },
  shipment: { type: String, required: true },
  size: { type: String, required: true },
  weight: { type: String, required: true },
  pickupStreet: { type: String, required: true },
  pickupHouseNo: { type: String, required: true },
  pickupZipCode: { type: String, required: true },
  pickupCity: { type: String, required: true },
  pickupDate: { type: String, required: true },
  deliveryStreet: { type: String, required: true },
  deliveryHouseNo: { type: String, required: true },
  deliveryZipCode: { type: String, required: true },
  deliveryCity: { type: String, required: true },
  comment: { type: String },
  courierEmail: { type: String },
  requestStatus: { type: String },
  packageStatus: { type: String },
  notificationForCourier: { type: String },
});

const Delivery = mongoose.model("deliveries", deliverySchema);

export const validateDelivery = (deliveryObject) => {
  const errorList = [];
  const allowedKeys = [
    "email",
    "date",
    "shipment",
    "size",
    "weight",
    "pickupStreet",
    "pickupHouseNo",
    "pickupZipCode",
    "pickupCity",
    "pickupDate",
    "deliveryStreet",
    "deliveryHouseNo",
    "deliveryZipCode",
    "deliveryCity",
    "comment",
    "courierEmail",
    "requestStatus",
    "packageStatus",
    "notificationForCourier",
  ];

  const validatedKeysMessage = validateAllowedFields(
    deliveryObject,
    allowedKeys
  );
  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }
  if (deliveryObject.shipment == null) {
    errorList.push("shipment is a required field");
  }
  if (deliveryObject.size == null) {
    errorList.push("size is a required field");
  }
  if (deliveryObject.weight == null) {
    errorList.push("weight is a required field");
  }
  if (deliveryObject.pickupStreet == null) {
    errorList.push("pickupStreet is a required field");
  }
  if (deliveryObject.pickupHouseNo == null) {
    errorList.push("pickupHouseNo is a required field");
  }
  if (deliveryObject.pickupZipCode == null) {
    errorList.push("pickupZipCode is a required field");
  }
  if (deliveryObject.pickupCity == null) {
    errorList.push("pickupCity is a required field");
  }
  if (deliveryObject.pickupDate == null) {
    errorList.push("pickupDate is a required field");
  }
  if (deliveryObject.deliveryStreet == null) {
    errorList.push("deliveryStreet is a required field");
  }
  if (deliveryObject.deliveryHouseNo == null) {
    errorList.push("deliveryHouseNo is a required field");
  }
  if (deliveryObject.deliveryZipCode == null) {
    errorList.push("deliveryZipCode is a required field");
  }
  if (deliveryObject.deliveryCity == null) {
    errorList.push("deliveryCity is a required field");
  }

  return errorList;
};

export default Delivery;
