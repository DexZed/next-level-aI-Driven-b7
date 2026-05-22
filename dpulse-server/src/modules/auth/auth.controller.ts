import express from "express";

const authRouter = express.Router();

authRouter.post('/auth/signup');

authRouter.post('/auth/login');

authRouter.post('/auth/logout');

authRouter.post('/auth/refresh');

export default authRouter;