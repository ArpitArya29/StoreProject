import express from "express"
import { addStore, getAllUsers, getRatingsCount, getUsersAndAdmins } from "../controllers/admin.controller.js";
import { authmiddleware, checkadmin } from "../middlewares/auth.middleware.js";

const adminRoutes = express.Router();
// adminroutes.use(checkadmin);

adminRoutes.get("/getuserandadmin",authmiddleware, checkadmin, getUsersAndAdmins);

adminRoutes.get("/getallusers", authmiddleware, checkadmin, getAllUsers)

adminRoutes.get("/getratingcount", authmiddleware, checkadmin, getRatingsCount)

adminRoutes.post("/addstore", authmiddleware, checkadmin, addStore);

export default adminRoutes;