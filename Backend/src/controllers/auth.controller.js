import bcrypt from "bcryptjs";
import { db } from "../lib/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";


export const register = async(req, res) => {
    const {name, email, password, address, role} = req.body;
    
    try {
        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        })
        

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const saltRounds = parseInt(process.env.BCRYPT_KEY);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await db.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                address,
                role: role || UserRole.USER
            }
        })

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user:{
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                address: newUser.address,
                role: newUser.role
            }
        })
    } catch (error) {
        console.log("Error in Creating the user", error);
        res.status(500).json({
            success: false,
            message: "Error Creating User"
        })
    }
}


export const login = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await db.user.findUnique({
            where:{
                email
            }
        })
    
        if(!user){
            return res.status(404).json({
                error: "User Not Found"
            })
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            return res.status(401).json({
                error:"Invalid Credentials"
            })
        }

        const token = jwt.sign(
            {id:user.id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )

        res.cookie("jwt",token,{
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV!=="development",
            maxAge: 1000*60*60*24*7 // 7 Days
        })

        res.status(201).json({
            success: true,
            message: "User Logged-in Successfully",
            user:{
                id:user.id,
                email:user.email,
                name:user.name,
                role:user.role
            }
        })
        
    } catch (error) {
        console.log("Error logging-in", error);
        
        res.status(500).json({
            success: false,
            error: "Error Logging User"
        })
    } 
}


export const logout = async(req, res) => {
    try {
        res.clearCookie("jwt",{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV!=="development"
        })

        res.status(200).json({
            success: true,
            message: "User Logged-out Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Failed to Logout"
        })
    }
}


export const checkCurrentUser = async(req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Fetched Currently Logged-in user",
            user: req.user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error Checking user"
        })
    }
}


export const updatePassword = async(req, res) => {
    const userid = req.user.id;
    const {currentPassword, newPassword} = req.body;

    try {
        const user = await db.user.findUnique({
            where:{
                id: userid
            }
        });

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "Incorrect current password"
            })
        }

        const saltRounds = parseInt(process.env.BCRYPT_KEY);
        const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await db.user.update({
            where:{
                id: userid
            },
            data: {
                password: newHashedPassword
            }
        })

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    } catch (error) {
        console.log("Error updating password");
        return res.status(500).json({
            success: false,
            message: "Error updating password",
            error
        })
    }
}





