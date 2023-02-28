import express from "express";
import {
  createDelivery,
  getDeliveries,
  clearDeliveries,
  removeDelivery,
  updateDelivery,
  userDeliveries,
} from "../controllers/delivery.js";

const deliveryRouter = express.Router();

deliveryRouter.get("/", getDeliveries);
deliveryRouter.get("/userDels/:email", userDeliveries);
deliveryRouter.delete("/remove/:email", clearDeliveries);
deliveryRouter.delete("/:id", removeDelivery);
deliveryRouter.put("/:id", updateDelivery);
deliveryRouter.post("/create", createDelivery);

export default deliveryRouter;
