import React, { useEffect, useState } from "react";
import { Store, Star, Eye } from "lucide-react";
import OwnerRatingsModel from "./OwnerRatingsModel";
import { useOwnerStore } from "../stores/useOwnerStore";

const OwnerStoreCard = ({ store }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { avgRating, getUserRatings, users } = useOwnerStore();

  console.log(store);

  useEffect(() => {
    getUserRatings(store.id);
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="flex items-center mb-2">
          <Store className="h-6 w-6 mr-2" />
          <h2 className="card-title">{store.name}</h2>
        </div>

        <div className="flex items-center text-lg text-gray-400 mb-4">
          <Star className="h-5 w-5 mr-2 text-yellow-400" />
          <p>
            Average Rating: {avgRating || "N/A"} ({store.ratingCount} reviews)
          </p>
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleOpenModal}>
            <Eye size={18} />
            View Rated Users
          </button>
        </div>
      </div>

      <OwnerRatingsModel
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        storeName={store.name}
        users={users}
      />
    </div>
  );
};

export default OwnerStoreCard;
