import express from "express";
import { authmiddleware } from "../middlewares/auth.middleware.js";
import { rateStore } from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.post("/rate", authmiddleware, rateStore)

export default userRoutes;