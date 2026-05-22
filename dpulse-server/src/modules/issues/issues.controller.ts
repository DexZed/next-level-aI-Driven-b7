import express from "express";
import { createIssue, deleteIssue, getIssue, getIssues, updateIssue } from "./issues.service";


const issuesRouter = express.Router();

issuesRouter.post('/',createIssue);

issuesRouter.get('/',getIssues);

issuesRouter.get('/:id',getIssue);

issuesRouter.patch('/:id',updateIssue);

issuesRouter.delete('/:id',deleteIssue);

export default issuesRouter;