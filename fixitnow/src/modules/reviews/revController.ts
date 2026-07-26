import express from "express";
import { createReviews } from "./revServices.js";

const reviewsRouter = express.Router();


reviewsRouter.post("/", createReviews)

export default reviewsRouter