import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create( (set)=>({
    authUser: null,
    isSignedUp: false,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,

    checkAuth: async()=>{
        set( {isCheckingAuth: true} )
        try {
            const res = await axiosInstance.get("/auth/check");
            set( {authUser: res.data.user} )

        } catch (error) {
            console.log("Error checking auth", error);
            set( {authUser: null} )

        }finally{
            set( {isCheckingAuth: false} )
        }
    },

    signUp: async(data)=>{
        set( {isSigningUp: true} )
        try {
            const res = await axiosInstance.post("/auth/register", data)
            console.log(res);
            
            set( {isSignedUp: true} )
            toast.success(res.data.message)

        } catch (error) {
            console.log("Error signing up", error);
            toast.error(error.response.data.message)

        }finally{
            set( {isSigningUp: false} )
        }
    },

    login: async(data)=>{
        set( {isLoggingIn: true} )
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set( {authUser: res.data.user} )
            console.log(res.data);
            toast.success(res.data.message)

        } catch (error) {
            console.log("Error logging-in", error);
            if(error.response.status===401){
                toast.error("Unauthorized Login Attempt!")
            }else{
                toast.error(error.response.data.message)
            }

        }finally{
            set( {isLoggingIn: false} )
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.get("/auth/logout")
            toast.success("User Logged-out")
            set( {authUser: null})
        } catch (error) {
            console.log("Error logging-out", error);
            toast.error(res.data.message)
        }
    }

}))