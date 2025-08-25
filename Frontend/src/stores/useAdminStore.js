import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminStore = create( (set)=> ({
    allUsers: null,
    fetchingAllUsers: false,
    totalRatings: null,
    isFetchingRatings: false,
    isAddingStore: false,

    fetchAllUser: async()=>{
        set( {fetchingAllUsers: true} )
        try {
            const res = await axiosInstance.get("/admin/getallusers");
            console.log(res.data.users);
            
            set( {allUsers: res.data.allUsers} );
        } catch (error) {
            console.log("Error fetching users", error);
            toast.error(error.response.data.message);
        }
        finally{
            set( {fetchingAllUsers: false})
        }
    },

    ratings: async()=>{
        set( {isFetchingRatings: true} )
        try {
            const res = await axiosInstance.get("/admin/getratingcount");
            console.log(res.data);
            
            set( {totalRatings: res.data.totalRatings} )
        } catch (error) {
            console.log("Error fetching ratings");
            toast.error("Error fetching ratings")
        }finally{
            set( {isFetchingRatings: false} )
        }
    },

    addStore: async(data)=>{
        set( {isAddingStore: true} )
        try {
            const res = await axiosInstance.post("/admin/addstore", data);
            toast.success("Store Added Successfully");
        } catch (error) {
            console.log("Error adding store", error);
            toast.error("Could not add store")
        }
    }

}))