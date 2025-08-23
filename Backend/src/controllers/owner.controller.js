import { db } from "../lib/db.js";

export const getUsersRatedStore = async(req, res) => {
    const {storeid} = req.params;

    try {
        const ratings = await db.rating.findMany({
            where: {
                storeid
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })

        const users = ratings.map(r=>({
            id: r.user.id,
            name: r.user.name,
            email: r.user.email,
            rated: r.rate
        }))

        const rateCount = users.reduce((sum, user) => sum + user.rated, 0);

        const avgRating = users.length > 0 ? rateCount/users.length : 0;

        return res.status(200).json({
            success: true,
            message: "Users with ratings fetched successfully",
            users,
            avgRating
        })

    } catch (error) {
        console.log("Error Fetching users with ratings", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching users with ratings",
            error
        })
    }
}

export const getOwnedStores = async(req, res) => {
    const ownerid = req.user.id;

    try {
        const stores = await db.store.findMany({
            where: {
                ownerid
            },
            include: {
                ratings: true
            }
        })

        const formattedStores = stores.map( store =>{
            const totalRatings = store.ratings.reduce((sum, r) => sum + r.rate, 0);

            const averageRating = store.ratings.length > 0 ? totalRatings/store.ratings.length : 0;

            return {
                id: store.id,
                name: store.name,
                address: store.address,
                averageRating: parseFloat(averageRating.toFixed(2))
            }
        })

        return res.status(200).json({
            success: true,
            message: "Stores fetched successfully",
            stores: formattedStores
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