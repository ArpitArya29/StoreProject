import jwt from "jsonwebtoken";

import { db } from "../lib/db.js";

export const authmiddleware = async(req, res, next)=>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({
                message: "Unauthorized, not found any logged-in token"
            })
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(404).json({
                message: "Failed to verify token"
            })
        }

        const user = await db.user.findUnique({
            where:{
                id: decodedToken.id
            },
            select:{
                id: true,
                name: true,
                email: true,
                role: true
            }
        })

        if(!user){
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error authenticating user"
        })
    }
}


export const checkadmin = async(req, res, next)=>{
    try {
        const userId = req.user.id;

        const user = await db.user.findUnique({
            where:{
                id: userId
            },
            select:{
                role: true
            }
        })

        if(!user || user.role!=="ADMIN"){
            return res.status(403).json({
                message: "Access Denied - Admins Only"
            })
        }

        next();
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            error: "Error checking role"
        })
    }
}


export const checkowner = async(req, res, next)=>{
    try {
        const userId = req.user.id;

        const user = await db.user.findUnique({
            where:{
                id: userId
            },
            select:{
                role: true
            }
        })

        if(!user || user.role!=="OWNER"){
            return res.status(403).json({
                message: "Access Denied - Owners Only"
            })
        }

        next();
    } catch (error) {
        res.status(500).json({
            error: "Error checking role"
        })
    }
}