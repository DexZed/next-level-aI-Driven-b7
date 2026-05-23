import express from "express";
import { postIssue, deleteIssue, getIssue, getAllIssues, updateIssue } from "./issues.service";


const issuesRouter = express.Router();

issuesRouter.post('/',postIssue);

issuesRouter.get('/',getAllIssues);

issuesRouter.get('/:id',getIssue);

issuesRouter.patch('/:id',updateIssue);

issuesRouter.delete('/:id',deleteIssue);

export default issuesRouter;