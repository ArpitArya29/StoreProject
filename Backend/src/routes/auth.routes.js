import express from "express";
import { checkCurrentUser, login, logout, register, updatePassword } from "../controllers/auth.controller.js";

import { authmiddleware } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.get("/logout", authmiddleware, logout);

authRoutes.get("/check", authmiddleware, checkCurrentUser);

authRoutes.put("/updatepassword", authmiddleware, updatePassword)

export default authRoutes;