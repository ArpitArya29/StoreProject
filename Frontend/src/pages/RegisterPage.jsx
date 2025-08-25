import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  Code,
  MapPin,
  UserCheck,
} from "lucide-react";
import { z } from "zod";

import toast from "react-hot-toast";
import { useAuthStore } from "../stores/useAuthStore";

const RegisterSchema = z.object({
  name: z
    .string()
    .min(20, "Name must be atleast 20 characters")
    .max(60, "Name must be less than 60 characters"),
  email: z.string().email("Enter valid email"),
  address: z.string().max(400, "Address should not more than 400 letters"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters")

    .max(16, "Password must not more than 16 characters")
    .regex(/[A-Z]/, "Password must contains atleast one upper-case letter")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must include at least one special character"
    ),
});

const RegisterPage = ({ showRole }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isSigningUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterSchema) });

  const onsubmit = async (data) => {
    try {
      await signUp(data);
    } catch (error) {
      console.log("Error signing-up", error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-xl flex flex-col justify-center items-center p-6 bg-base-300 rounded-4xl">
        <div className="w-full max-w-md ">
          <div className="text-center mb-8">
            {!showRole ? (
              <div className="flex flex-col items-center gap-2 group">
                <h1 className="text-3xl font-bold">Welcome to our Platform</h1>
                <p className="text-gray-400">Register to your account</p>
              </div>
            ) : (
              <p className="text-gray-400 text-lg">Register the new User</p>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onsubmit)}
          className="space-y-6 w-full px-4"
        >
          {/* name */}
          <div className="form-control">
            <label className="label ">
              <span className="label-text font-medium">Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-5 pointer-events-none">
                <Code className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="text"
                {...register("name")}
                className={`input input-bordered w-full pl-10 ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-5 pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="email"
                {...register("email")}
                className={`input input-bordered w-full pl-10 ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-5 pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`input input-bordered w-full pl-10 ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Address</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-5 pointer-events-none">
                <MapPin className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="text"
                {...register("address")}
                className={`input input-bordered w-full pl-10 ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="Your Address"
              />
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {showRole && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Role</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCheck className="h-5 w-5 text-base-content/40" />
                </div>
                <select
                  {...register("role")}
                  className={`select select-bordered w-full pl-10 ${
                    errors.role ? "select-error" : ""
                  }`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="OWNER">Owner</option>
                </select>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Footer */}
        {!showRole && (
          <div className="text-center mt-4">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to={"/login"} className="link link-primary">
                Log In
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
