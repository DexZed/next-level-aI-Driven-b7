import express from "express";
import { createIssue, deleteIssue, getIssue, getIssues, updateIssue } from "./issues.service";


const issuesRouter = express.Router();

issuesRouter.post('/issues',createIssue);

issuesRouter.get('/issues',getIssues);

issuesRouter.get('/issues/:id',getIssue);

issuesRouter.patch('/issues/:id',updateIssue);

issuesRouter.delete('/issues/:id',deleteIssue);

export default issuesRouter;