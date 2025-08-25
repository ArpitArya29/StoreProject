import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create( (set)=>({
    ratings: null,
    isRatingStore: false,

    rateStore: async(data)=>{
        set( {isRatingStore: true} )
        try {
            const res = await axiosInstance.post("/user/rate", data);
            set( {ratings: res.data.rate})
            toast.success("Rated Successfully")
            
        } catch (error) {
            console.log("Error fetching stores", error);
            
        }finally{
            set( {isRatingStore: false} )
        }
    }
}))