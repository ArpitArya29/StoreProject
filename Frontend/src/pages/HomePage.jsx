import React, { useEffect } from "react";
import { useGeneralStore } from "../stores/useGeneralStore";
import StoreCard from "../components/StoreCard";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { allStores, isLoadingStores, getAllStores } = useGeneralStore();
  const { logout } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    getAllStores();
  }, [getAllStores]);

  const handleRatingUpdate = () => {
    getAllStores();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isLoadingStores) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 bg-base-100">
      <div className="container mx-auto">
        <div className="flex flex-row justify-around items-center">
          <h1 className="text-4xl font-bold text-center my-8">
            Welcome! Discover Our Stores
          </h1>
          <button onClick={handleLogout} className="btn btn-ghost">
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allStores && allStores.length > 0 ? (
            allStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onRatingUpdate={handleRatingUpdate}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-xl text-gray-500">
              No stores found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
