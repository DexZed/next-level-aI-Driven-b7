import express from "express";
import { confirmIntent, createIntent, getPaymentByUserId, getPaymentHistory } from "./subService.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", createIntent);
paymentRouter.post("/confirm", confirmIntent);
paymentRouter.get("/", getPaymentHistory);
paymentRouter.get("/:id", getPaymentByUserId);


export default paymentRouter;