import { User, Phone, Calendar, Tag,VenusAndMars } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";

export const Profile = () => {
  const { user } = useAuth();
  const formatted = new Date(user.dob).toLocaleDateString();
  const [avatar, setAvatar] = useState("https://www.w3schools.com/howto/img_avatar.png");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-evenly gap-8 mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-[60vh] p-6">
      <div className="flex flex-col gap-8 w-full md:w-1/2">
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-primary flex flex-col items-start">
          <h1 className="font-semibold text-2xl text-indigo-700 mb-2">Personal Information</h1>
          <hr className="my-4 w-full border-t-2 border-gray-200" />
          <div className="flex flex-col gap-3 text-gray-700 font-medium text-base">
            <span className="flex items-center gap-2"><User size={18}/> Full Name: <span className="font-semibold text-indigo-600">{user.name}</span></span>
            <span className="flex items-center gap-2"><Phone size={18}/> Contact: <span className="font-semibold text-indigo-600">{user.contact_no}</span></span>
            <span className="flex items-center gap-2"><VenusAndMars size={18}/> Gender: <span className="font-semibold text-indigo-600">{user.gender}</span></span>
            <span className="flex items-center gap-2"><Calendar size={18}/> Date Of Birth: <span className="font-semibold text-indigo-600">{formatted}</span></span>
            <span className="flex items-center gap-2"><Tag size={18}/> Category: <span className="font-semibold text-indigo-600">{user.category}</span></span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full md:w-1/2 items-center">
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 border-t-4 border-primary w-full max-w-xs">
          <div className="relative">
            <img
              src={avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-primary/20 shadow-lg object-cover"
            />
            <label className="absolute bottom-2 right-2 bg-primary text-white rounded-full p-2 cursor-pointer shadow-md hover:opacity-80 transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>
            </label>
          </div>
          <p className="mt-4 text-gray-600">Choose photo to update</p>
        </div>
      </div>
    </div>
  );
};

