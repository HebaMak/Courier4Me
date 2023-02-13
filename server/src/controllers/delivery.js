import Delivery, { validateDelivery } from "../models/Delivery.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

//get all deliveries
export const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json({ success: true, result: deliveries });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get deliveries, try again later",
    });
  }
};

//create a new delivery
export const createDelivery = async (req, res) => {
  try {
    const { delivery } = req.body;

    if (typeof delivery !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'delivery' object. Received: ${JSON.stringify(
          delivery
        )}`,
      });

      return;
    }

    const errorList = validateDelivery(delivery);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newDelivery = await Delivery.create(delivery);

      res.status(201).json({ success: true, delivery: newDelivery });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create delivery, try again later",
    });
  }
};

// remove one delivery
export const removeDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) {
      return res.status(404).json({
        success: false,
        msg: `No delivery found wih this id: ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      msg: `Delivery with the id: ${req.params.id} has been deleted`,
      filtered: Delivery,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Unable to delete delivery" });
  }
};

//delete all deliveries
export const clearDeliveries = async (req, res) => {
  try {
    await Delivery.deleteMany({ email: req.params.email });
    res.status(200).json({
      success: true,
      result: `all deliveries with the mail ${req.params.email} are deleted`,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to delete deliveries, try again later",
    });
  }
};

//get all deliveries for specific user
export const userDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ email: req.params.email });
    res.status(200).json({ success: true, result: deliveries });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to delete deliveries, try again later",
    });
  }
};

//update delivery
export const updateDelivery = async (req, res) => {
  try {
    const { delivery } = req.body;
    if (typeof delivery !== "object") {
      return res.status(400).json({
        success: false,
        msg: `You need to provide a 'delivery' object. Received: ${JSON.stringify(
          delivery
        )}`,
      });
    }

    const updatedDelivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      {
        $set: delivery,
      },
      { new: true }
    );
    res.status(200).json({ success: true, user: updatedDelivery });
  } catch (err) {
    logError(err);
    res
      .status(500)
      .json({ success: false, msg: "You can update only your account" });
  }
};

//find declined deliveries of a courier
export const pendingDeliveries = async (req, res) => {
  try {
    const list = [];
    const deliveries = await Delivery.find({ courierEmail: req.params.email });
    deliveries.map((delivery) => {
      if (delivery.requestStatus === "pending") {
        list.push(delivery);
      }
    });
    res.status(200).json(list);
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get deliveries, try again later",
    });
  }
};

//find approved deliveries of a courier
export const approvedDeliveries = async (req, res) => {
  try {
    const list = [];
    const deliveries = await Delivery.find({ courierEmail: req.params.email });
    deliveries.map((delivery) => {
      if (delivery.requestStatus === "approved") {
        list.push(delivery);
      }
    });
    res.status(200).json(list);
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get deliveries, try again later",
    });
  }
};

//find declined deliveries of a courier
export const declinedDeliveries = async (req, res) => {
  try {
    const list = [];
    const deliveries = await Delivery.find({ courierEmail: req.params.email });
    deliveries.map((delivery) => {
      if (delivery.requestStatus === "declined") {
        list.push(delivery);
      }
    });
    res.status(200).json(list);
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get deliveries, try again later",
    });
  }
};
