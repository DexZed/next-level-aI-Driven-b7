import express from "express";
import {
  postIssue,
  deleteIssueHandler,
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

issuesRouter.delete("/:id",jwtVerify, deleteIssueHandler);

export default issuesRouter;
