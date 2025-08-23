import express from "express";
import { authmiddleware, checkowner } from "../middlewares/auth.middleware.js";
import { getOwnedStores, getUsersRatedStore } from "../controllers/owner.controller.js";

const ownerRoutes = express.Router();

ownerRoutes.get("/getusersandrate/:storeid", authmiddleware, checkowner, getUsersRatedStore);

ownerRoutes.get("/getownedstores",authmiddleware, checkowner, getOwnedStores);

export default ownerRoutes;