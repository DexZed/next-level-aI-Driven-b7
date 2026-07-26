import express from "express";
import { createReviews } from "./revServices";

const reviewsRouter = express.Router();


reviewsRouter.post("/", createReviews)

export default reviewsRouter