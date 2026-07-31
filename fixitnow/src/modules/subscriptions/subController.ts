import express from "express";
import { confirmIntent, createIntent, getPaymentHistory, handleWebhook } from "./subService.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", createIntent);
paymentRouter.post("/webhook", handleWebhook);
paymentRouter.post("/confirm", confirmIntent);
paymentRouter.get("/", getPaymentHistory);



export default paymentRouter;