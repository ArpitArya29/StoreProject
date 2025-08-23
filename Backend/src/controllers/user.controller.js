import { db } from "../lib/db.js";

export const rateStore = async(req, res) => {
    const userid = req.user.id;
    const {storeid, rate} = req.body;

    try {
        const existingRating = await db.rating.findUnique({
            where:{
                userid_storeid: {
                    userid,
                    storeid
                }
            }
        });

        if(existingRating){
            const updatedRating = await db.rating.update({
                where: {
                    id: existingRating.id
                },
                data: {
                    rate
                }
            })

            return res.status(200).json({
                success: true,
                message: "Rating Updated Successfully",
                updatedRating
            })
        }
        else{
            const newRating = await db.rating.create({
                data: {
                    userid,
                    storeid,
                    rate
                }
            })

            return res.status(201).json({
                success: true,
                message: "Rating submitted Successfully",
                newRating
            })
        }

    } catch (error) {
        console.log("Failed rating store", error);
        return res.status(500).json({
            success: false,
            message: "Failed rating store",
            error
        })
    }
}