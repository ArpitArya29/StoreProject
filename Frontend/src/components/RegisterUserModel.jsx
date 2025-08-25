import React from "react";
import RegisterPage from "../pages/RegisterPage";
import { X } from "lucide-react";

const RegisterUserModel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-around z-50">
      <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
        <X className="w-5 h-5" />
      </button>
      <RegisterPage showRole={true} />
    </div>
  );
};

export default RegisterUserModel;
