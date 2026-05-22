import express from "express";
import { login, logout, refresh, register } from "./auth.service";

const authRouter = express.Router();

authRouter.post("/auth/signup", register);

authRouter.post("/auth/login", login);

authRouter.post("/auth/logout", logout);

authRouter.post("/auth/refresh", refresh);

export default authRouter;
