import express from "express";

import jwtVerify from "../../middlewares/jwt.validation";
import {
  deleteIssueHandler,
  getAllIssues,
  getOneIssues,
  postIssue,
  updateIssueHandler,
} from "./issues.service";

const issuesRouter = express.Router();

issuesRouter.post("/", jwtVerify, postIssue);

issuesRouter.get("/", getAllIssues);

issuesRouter.get("/:id", getOneIssues);

issuesRouter.patch("/:id", jwtVerify, updateIssueHandler);

issuesRouter.delete("/:id", jwtVerify, deleteIssueHandler);

export default issuesRouter;
