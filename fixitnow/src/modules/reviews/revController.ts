import express from "express";
import { createReviews, getReviews } from "./revServices.js";

const reviewsRouter = express.Router();


reviewsRouter.post("/", createReviews)
reviewsRouter.get("/:id", getReviews)
export default reviewsRouter