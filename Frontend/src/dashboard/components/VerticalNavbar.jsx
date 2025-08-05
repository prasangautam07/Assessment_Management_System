import React from 'react'
import { UserCircle,LogOut } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faPen } from '@fortawesome/free-solid-svg-icons';
import { NavLink,useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
export const VerticalNavbar = ({role}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate(`/${role}/login`);
  }
  return (
    <div className='flex flex-col h-screen w-60 bg-gray-800 text-white p-4 gap-10'>
      <div className='flex flex-col gap-1 p-2 h-16 mb-4'>
        <div className='flex items-center justify-start h-full w-full'>
          <FontAwesomeIcon className='text-white font-bold text-3xl' icon={faUser} />
        </div>
        <div className='flex flex-col justify-start'>
          <p className='flex justify-start text-[15px] font-bold'>{user.name}</p>
          <p className='flex justify-start text-[12px]'>{role}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {user.role === "student" ? (
          <>
            <NavLink
              to=""
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 font-semibold rounded-md transition-all ${
                  isActive
                    ? "bg-gray-700 border-l-4 border-primary"
                    : "hover:bg-gray-700"
                }`
              }
              end
            >
              <UserCircle size={20} />
              <span>Profile</span>
            </NavLink>
            <NavLink
              to="marks"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 font-semibold rounded-md transition-all ${
                  isActive
                    ? "bg-gray-700 border-l-4 border-primary"
                    : "hover:bg-gray-700"
                }`
              }
            >
              <FontAwesomeIcon className='font-bold text-xl' icon={faPen} />
              <span>Results</span>
            </NavLink>
          </>
        ) : (
          <NavLink
            to=""
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 font-semibold rounded-md transition-all ${
                isActive
                  ? "bg-gray-700 border-l-4 border-primary"
                  : "hover:bg-gray-700"
              }`
            }
            end
          >
          <UserCircle size={20} />
            <span>Students</span>
          </NavLink>
        )}
      </div>
      <div className="mt-auto pt-4 border-t border-gray-700 ">
        <button onClick={handleLogOut} className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 transition cursor-pointer">
          <LogOut size={20} className="text-white" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
