import express from "express";
import { postIssue, deleteIssue, getIssue, getIssues, updateIssue } from "./issues.service";


const issuesRouter = express.Router();

issuesRouter.post('/',postIssue);

issuesRouter.get('/',getIssues);

issuesRouter.get('/:id',getIssue);

issuesRouter.patch('/:id',updateIssue);

issuesRouter.delete('/:id',deleteIssue);

export default issuesRouter;