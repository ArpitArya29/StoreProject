// src/components/StoreCard.jsx

import React, { useState } from "react";
import { Star, MapPin, User, Pencil, Send } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import { useUserStore } from "../stores/useUserStore";

const StoreCard = ({ store, onRatingUpdate }) => {
  const { authUser } = useAuthStore();
  const { ratings, rateStore } = useUserStore();
  const [userRating, setUserRating] = useState(store.ratings || 0);

  const handleRatingChange = (e) => {
    setUserRating(Number(e.target.value));
  };

  console.log(store);

  const submitRating = async () => {
    if (userRating > 0 && authUser) {
      await rateStore({
        storeid: store.id,
        rate: userRating,
      });
      if (onRatingUpdate) {
        onRatingUpdate();
      }
    }
  };

  return (
    <div className="card w-96 bg-base-200 shadow-xl image-full">
      <div className="card-body">
        <h2 className="card-title text-white">{store.name}</h2>
        <div className="flex items-center text-white">
          <MapPin size={16} className="mr-2" />
          <p>{store.address}</p>
        </div>
        <div className="flex items-center text-white">
          <Star size={16} className="mr-2 text-yellow-400" />
          <p>
            {store.averageRating
              ? store.averageRating.toFixed(1)
              : "No ratings yet"}{" "}
            ({store.ratings.length || 0} reviews)
          </p>
        </div>

        {authUser && (
          <div className="card-actions justify-end mt-4">
            <div className="rating rating-sm">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name={`rating-${store._id}`}
                  className="mask mask-star-2 bg-yellow-400"
                  value={star}
                  checked={userRating === star}
                  onChange={handleRatingChange}
                />
              ))}
            </div>
            <button className="btn btn-sm btn-accent" onClick={submitRating}>
              <Send size={16} />
              Rate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreCard;
