import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { z } from "zod";
import { useAuthStore } from "../stores/useAuthStore.js";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(6, "Password must contains atleast 6 letters")
    .max(16, "Password must not more than 16 characters")
    .regex(/[A-Z]/, "Password must contains atleast one upper-case letter")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must include at least one special character"
    ),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onsubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error("Error in logging in", error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-xl flex flex-col justify-center items-center p-6 bg-base-300 rounded-3xl">
        <div className="w-full max-w-md ">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-400">Login to continue</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onsubmit)}
          className="space-y-6 w-full px-4"
        >
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

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-base-content/60">
            Don't have an account?{" "}
            <Link to={"/register"} className="link link-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
