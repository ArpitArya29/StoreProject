import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useGeneralStore = create( (set)=>({
    allStores: null,
    isLoadingStores: false,

    getAllStores: async()=>{
        set( {isLoadingStores: true} )
        try {
            const res = await axiosInstance.get("/general/getallstores");
            set( {allStores: res.data.stores})
            // console.log(allStores);
            
        } catch (error) {
            console.log("Error fetching stores", error);
            
        }finally{
            set( {isLoadingStores: false} )
        }
    }
}))