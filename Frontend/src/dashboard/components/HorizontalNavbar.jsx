import React from "react";
import { useState } from "react";
import { User, ChevronDown } from "lucide-react";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
export const HorizontalNavbar = ({role}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuth();
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate(`/${role}/login`);
  };
  return (
    <div className="bg-white h-15 flex items-center justify-end relative shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-end w-full pr-4">
        <p className="text-[#888888]">Welcome, {user.name}</p>
      </div>
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-end pr-4 text-gray-800 cursor-pointer hover:text-primary rounded-md px-2 py-1 transition"
      >
        <User className="mr-2" size={22} />
        <span className="font-semibold">{user.username}</span>
        <ChevronDown className="ml-1" size={16} />
      </div>
      {isDropdownOpen && (
        <div className="absolute top-12 right-4 min-w-[160px] flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
          <p className="mb-2 font-semibold text-gray-800">{user.name}</p>
          <hr className="w-full my-2 border-gray-200" />
          <button
            onClick={handleLogOut}
            className="text-primary font-semibold py-2 w-full rounded hover:bg-green-50 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
