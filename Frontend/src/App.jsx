import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./stores/useAuthStore";

import { Loader } from "lucide-react";
import AdminDashboard from "./components/AdminDashboard";
import OwnerDashboard from "./components/OwnerDashboard";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, isSignedUp } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start">
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              authUser.role === "ADMIN" ? (
                <Navigate to="/dashboard" replace />
              ) : authUser.role === "OWNER" ? (
                <Navigate to="/owner" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/register"
          element={!isSignedUp ? <RegisterPage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/dashboard"
          element={
            authUser?.role === "ADMIN" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/home"
          element={authUser ? <HomePage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/owner"
          element={
            authUser?.role === "OWNER" ? (
              <OwnerDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
