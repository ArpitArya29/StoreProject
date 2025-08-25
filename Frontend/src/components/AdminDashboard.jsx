import React, { useEffect, useMemo, useState } from "react";
import { useAdminStore } from "../stores/useAdminStore";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  ShieldCheck,
  Users,
  Star,
  Store,
  UserPlus,
} from "lucide-react";
import { useGeneralStore } from "../stores/useGeneralStore";
import CreateStoreModel from "./CreateStoreModel";
import RegisterUserModel from "./RegisterUserModel";

const AdminDashboard = () => {
  const { authUser, logout } = useAuthStore();
  console.log(authUser);

  const { allUsers, totalRatings, fetchAllUser, ratings, addStore } =
    useAdminStore();
  const { allStores, getAllStores } = useGeneralStore();

  const [showRegisterPage, setShowRegisterPage] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [isAddStoreModelOpen, setIsAddStoreModelOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUser();
    ratings();
    getAllStores();
  }, []);

  const handleRegisterUser = () => {
    setShowRegisterPage(true);
    setShowRole(true);
  };

  const handleGoBack = () => {
    setShowRegisterPage(false);
    setShowRole(false);
  };

  const handleAddStore = async (data) => {
    await addStore(data);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const addressArr = useMemo(() => {
    if (!Array.isArray(allUsers)) return [];

    const tagSet = new Set();

    allUsers.forEach((user) => tagSet.add(user.address));

    return Array.from(tagSet);
  }, [allUsers]);

  const roles = ["ADMIN", "USER", "OWNER"];

  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [role, setRole] = useState("ALL");

  const filteredUsers = useMemo(() => {
    return (allUsers || [])
      .filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
      )
      .filter((user) =>
        user.address.toLowerCase().includes(searchAddress.toLowerCase())
      )
      .filter((user) => (role === "ALL" ? true : user.role === role));
  }, [allUsers, searchName, searchAddress, role]);

  if (!authUser) {
    return <div>Loading</div>;
  }

  return (
    <div className="min-h-screen w-auto flex flex-col items-center mt-5 px-10">
      <div className="card-body shadow-lg bg-base-200 rounded-2xl w-full items-center mb-4 flex flex-row justify-around">
        <h1 className="text-4xl font-bold  ">ADMIN DASHBBOARD</h1>
        <button onClick={handleLogout} className="btn btn-ghost text-2xl">
          Logout
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 w-full">
        <div className="card bg-base-300 shadow-lg flex flex-row justify-between">
          <div className="card-body p-4 justify-center">
            <User className="w-8 h-8" />
          </div>

          <div className="card-body p-4 justify-center">
            <div className="text-lg font-bold">{authUser.name}</div>
          </div>
        </div>

        <div className="card bg-base-300 shadow-lg flex flex-row justify-between">
          <div className="card-body p-4  justify-center">
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

      {/* STATS CARDS */}
      <div className="grid grid-cols-3 gap-5 w-full mt-8">
        {/* Total Users */}
        <div className="card bg-base-300 shadow-lg flex flex-row justify-between">
          <div className="card-body p-4 justify-center">
            <Users className="h-8 w-8" />
          </div>
          <div className="card-body p-4 justify-center">
            <div className="text-lg font-bold">
              {allUsers ? allUsers.length : "Loading..."}
            </div>
          </div>
        </div>

        {/* Total Ratings */}
        <div className="card bg-base-300 shadow-lg flex flex-row justify-between">
          <div className="card-body p-4 justify-center">
            <Star className="h-8 w-8" />
          </div>
          <div className="card-body p-4 justify-center">
            <div className="text-lg font-bold">
              {/* {totalRatings} */}
              {totalRatings !== null ? totalRatings : "Loading..."}
            </div>
          </div>
        </div>

        {/* Add Store (just a placeholder card for now) */}
        <div className="card bg-base-300 shadow-lg flex flex-row justify-between">
          <div className="card-body p-4 justify-center">
            <Store className="h-8 w-8" />
          </div>
          <div className="card-body p-4 justify-center">
            <div className="text-lg font-bold">{allStores?.length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 w-full mt-5">
        <button
          onClick={() => {
            setIsAddStoreModelOpen(true);
          }}
          className="btn btn-primary"
        >
          <Store size={20} />
          Add Store
        </button>
        <button onClick={handleRegisterUser} className="btn btn-secondary">
          <UserPlus size={20} />
          Add User
        </button>
      </div>

      <div className="flex justify-between items-center mb-6 gap-4 w-full mt-10">
        <input
          type="text"
          placeholder="Search by name"
          className="input input-bordered w-full md:w-1/3 bg-base-200"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search by Address"
          className="input input-bordered w-full md:w-1/3 bg-base-200"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
        />

        <select
          className="select select-bordered bg-base-200"
          value={role}
          onChange={(e) =>
            setRole(e.target.value === "All Roles" ? "ALL" : e.target.value)
          }
        >
          <option>All Roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      {/* USERS TABLE */}
      <div className="card bg-base-200 shadow-xl w-full p-6">
        <h2 className="text-xl font-bold mb-4">All Users</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers &&
                filteredUsers.map((user, idx) => (
                  <tr key={user._id}>
                    <td>{idx + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.address}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateStoreModel
        isOpen={isAddStoreModelOpen}
        onClose={() => setIsAddStoreModelOpen(false)}
        onSubmit={handleAddStore}
      />

      <RegisterUserModel
        isOpen={showRegisterPage}
        onClose={() => setShowRegisterPage(false)}
      />
    </div>
  );
};

export default AdminDashboard;
