import express from "express";

import { login, logout, refresh, register } from "./auth.service";

const authRouter = express.Router();

authRouter.post("/signup", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/refresh", refresh);

export default authRouter;
