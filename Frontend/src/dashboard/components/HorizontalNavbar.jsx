import React from "react";
import { useState } from "react";
import { User, ChevronDown } from "lucide-react";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
export const HorizontalNavbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuth();
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/student/login");
  }
  return (
    <div className="bg-white h-15 flex items-center justify-end relative">
      <div className="flex items-center justify-end w-full pr-4">
        <p className="text-[#888888]">Welcome, {user.name}</p>
      </div>
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-end pr-4 text-gray-800 cursor-pointer hover:text-gray-500 rounded-md px-2 py-1"
      >
        <User className="" size={20} />
        <p>{user.username}</p>
        <ChevronDown className=" ml-1" size={16} />
      </div>
      {isDropdownOpen && (
        <div className="absolute top-12 right-4 h-22 flex flex-col items-center justify-center p-4 bg-white card-shadow">
          <p className="mt-3 mb-4 font-sm">{user.name}</p>
          <button onClick={handleLogOut} className="text-gray-500 mb-4 pt-2 cursor-pointer w-full border-t-2">Logout</button>
        </div>
      )}
    </div>
  );
};
