import express from "express";
import {
  postIssue,
  deleteIssue,
  getAllIssues,
  getOneIssues,
  updateIssue,
} from "./issues.service";
import jwtVerify from "../../middlewares/jwt.validation";

const issuesRouter = express.Router();

issuesRouter.post("/", jwtVerify, postIssue);

issuesRouter.get("/", getAllIssues);

issuesRouter.get("/:id", getOneIssues);

issuesRouter.patch("/:id", updateIssue);

issuesRouter.delete("/:id", deleteIssue);

export default issuesRouter;
