import express from "express";
import {
  postIssue,
  deleteIssue,
  getAllIssues,
  getOneIssues,
  updateIssueHandler,
} from "./issues.service";
import jwtVerify from "../../middlewares/jwt.validation";

const issuesRouter = express.Router();

issuesRouter.post("/", jwtVerify, postIssue);

issuesRouter.get("/", getAllIssues);

issuesRouter.get("/:id", getOneIssues);

issuesRouter.patch("/:id",jwtVerify, updateIssueHandler);

issuesRouter.delete("/:id", deleteIssue);

export default issuesRouter;
