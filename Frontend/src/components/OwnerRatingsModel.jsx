// src/components/OwnerRatingsModel.jsx

import React from "react";
import { Star, X } from "lucide-react";

const OwnerRatingsModel = ({ isOpen, onClose, storeName, users }) => {
  console.log(users);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-base-100 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Ratings for {storeName}</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {users && users?.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name || "User"}</td>
                    <td className="flex items-center">
                      <Star size={16} className="text-yellow-400 mr-1" />
                      {user.rated}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No ratings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerRatingsModel;
