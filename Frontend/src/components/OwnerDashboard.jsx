// src/pages/OwnerDashboard.jsx

import React, { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useGeneralStore } from "../stores/useGeneralStore";
import { User, Mail, ShieldCheck } from "lucide-react";
// import OwnerS from '../components/OwnerStoreCard';
import OwnerStoreCard from "../components/OwnerStoreCard";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const { authUser, logout } = useAuthStore();
  const { allStores, isLoadingStores, getAllStores } = useGeneralStore();
  const navigate = useNavigate();

  useEffect(() => {
    getAllStores();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const ownerStores = allStores?.filter((s) => s.ownerid === authUser.id);

  if (isLoadingStores || !authUser) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-auto flex flex-col items-center mt-5 px-10">
      <div className="flex flex-row justify-between card bg-base-200 w-full p-5 mb-4">
        <h1 className="text-4xl font-bold">OWNER DASHBOARD</h1>
        <button onClick={handleLogout} className="btn btn-ghost text-2xl">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-8">
        <div className="card bg-base-300 shadow-lg flex flex-row justify-between">
          <div className="card-body p-4 justify-center">
            <User className="w-8 h-8" />
          </div>
          <div className="card-body p-4 justify-center">
            <div className="text-lg font-bold">{authUser.name}</div>
          </div>
        </div>
        <div className="card bg-base-300 shadow-lg flex flex-row justify-between">
          <div className="card-body p-4 justify-center">
            <Mail className="w-8 h-8" />
          </div>
          <div className="card-body p-4 justify-center">
            <div className="text-lg font-bold">{authUser.email}</div>
          </div>
        </div>
        <div className="card bg-base-300 shadow-lg flex flex-row justify-between">
          <div className="card-body p-4 justify-center">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div className="card-body p-4 justify-center">
            <div className="text-lg font-bold">{authUser.role}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {ownerStores?.length > 0 ? (
          ownerStores.map((store) => (
            <OwnerStoreCard key={store.id} store={store} />
          ))
        ) : (
          <div className="card bg-base-200 col-span-full shadow-xl p-6 text-center">
            <p>You do not own any stores yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
