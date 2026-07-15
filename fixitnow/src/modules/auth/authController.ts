import express from "express";

import { login, register, profile } from "./authServices.js";
import jwtVerify from "../../middlewares/tokenVerify.js";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/me", jwtVerify, profile);

export default authRouter;
