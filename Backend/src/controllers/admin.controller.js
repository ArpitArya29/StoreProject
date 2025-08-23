import { db } from "../lib/db.js";
import { UserRole } from "../generated/prisma/index.js";

export const getUsersAndAdmins = async(req, res) => {
    try {
        const users = await db.user.findMany({
            where:{
                role:{
                    in:['USER','ADMIN'],
                },
            },
            select:{
                id: true,
                name: true,
                email: true,
                address: true,
                role: true
            }
        });

        res.status(200).json({
            success: true,
            message: "Users Fetched Successfully",
            users
        })
    } catch (error) {
        console.log("Error finding users and admins");
        return res.status(500).json({
            success: false,
            message: "Error Fetching user and Admins"
        })
    }
}

export const getAllUsers = async(req, res) => {
    try {
        const allUsers = await db.user.findMany({
            where:{
                role: "USER"
            },
            select:{
                id: true,
                name: true,
                email: true,
                role: true
            }
        })

        res.status(200).json({
            success: true,
            message: "Users Fetchech Successfully",
            allUsers
        })
    } catch (error) {
        console.log("Error in fetching users");
        return res.status(500).json({
            success: false,
            message: "Error Fetching Users",
            error
        })
    }
}

export const addStore = async(req, res) => {
    const {name, address, ownerid} = req.body;

    try {
        const existingStore = await db.store.findFirst({
            where:{
                name,
                address
            }
        });

        if(existingStore){
            return res.status(409).json({
                message: "Store with this name already exists in given address"
            })
        }

        const newStore = await db.store.create({
            data:{
                name,
                address,
                ownerid
            }
        })

        if(newStore){
            await db.user.update({
                where: {
                    id: ownerid
                },
                data: {
                    role: UserRole.OWNER
                }
            })
        }

        res.status(201).json({
            success: true,
            message: "Store Created Successfully",
            newStore
        })

    } catch (error) {
        console.log("Error in creating store", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create store",
            error
        })
    }
}

export const getRatingsCount = async(req, res) => {
    try {
        const totalRatings = await db.rating.count();

        return res.status(200).json({
            success: true,
            message: "Fetched total ratings",
            totalRatings
        })
    } catch (error) {
        console.log("Error fetching rating number", error);
        return res.status(500).json({
            success: false,
            message: "Error in counting ratings",
            error
        })
    }
}
