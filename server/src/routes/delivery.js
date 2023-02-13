import express from "express";
import {
  createDelivery,
  getDeliveries,
  clearDeliveries,
  removeDelivery,
  updateDelivery,
  pendingDeliveries,
  approvedDeliveries,
  declinedDeliveries,
  userDeliveries,
} from "../controllers/delivery.js";

const deliveryRouter = express.Router();

deliveryRouter.get("/", getDeliveries);
deliveryRouter.get("/userDels/:email", userDeliveries);
deliveryRouter.delete("/remove/:email", clearDeliveries);
deliveryRouter.delete("/:id", removeDelivery);
deliveryRouter.put("/:id", updateDelivery);
deliveryRouter.post("/create", createDelivery);
deliveryRouter.get("/approved/:email", approvedDeliveries);
deliveryRouter.get("/pending/:email", pendingDeliveries);
deliveryRouter.get("/declined/:email", declinedDeliveries);

export default deliveryRouter;
