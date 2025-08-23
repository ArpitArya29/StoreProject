import { db } from "../lib/db.js";


export const getAllStores = async(req, res) =>{
    try {
        const stores = await db.store.findMany({
            include:{
                ratings: true
            }
        })

        return res.status(200).json({
            success: true,
            message: "Stores fetched successfully",
            stores
        })
    } catch (error) {
        console.log("Error fetching stores", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching stores",
            error
        })
        
    }
}