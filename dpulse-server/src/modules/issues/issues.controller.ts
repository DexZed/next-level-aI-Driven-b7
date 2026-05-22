import express from "express";

const issuesRouter = express.Router();

issuesRouter.post('/issues');

issuesRouter.get('/issues');

issuesRouter.get('/issues/:id');

issuesRouter.patch('/issues/:id');

issuesRouter.delete('/issues/:id');

export default issuesRouter;