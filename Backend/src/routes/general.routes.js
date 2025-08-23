import express from "express";
import { authmiddleware } from "../middlewares/auth.middleware.js";
import { getAllStores } from "../controllers/general.controller.js";

const generalRoutes = express.Router();

generalRoutes.get("/getallstores", authmiddleware, getAllStores)

export default generalRoutes;