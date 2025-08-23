import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import generalRoutes from "./routes/general.routes.js";
import userRoutes from "./routes/user.routes.js";
import ownerRoutes from "./routes/owner.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/owner", ownerRoutes);
app.use("/api/v1/general", generalRoutes);

const port = process.env.PORT;

app.listen(port, ()=>{
    console.log("Server is running at port:", port);
})

