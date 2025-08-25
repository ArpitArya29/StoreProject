import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useOwnerStore = create( (set)=>({
    users: null,
    // ownedStores: false,
    avgRating: null,
    isUsersLoading: false,

    getUserRatings: async(id)=>{
        set( {isUsersLoading: true} )
        try {
            const res = await axiosInstance.get(`/owner/getusersandrate/${id}`);
            set( {users: res.data.users , avgRating: res.data.avgRating})
            console.log(res.data);
            
            // toast.success("Rated Successfully")
            
        } catch (error) {
            console.log("Error fetching stores", error);
            
        }finally{
            set( {isUsersLoading: false} )
        }
    }
}))