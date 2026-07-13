import express from "express";

import { login, register, profile } from "./authServices.js";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/me", profile);

export default authRouter;
