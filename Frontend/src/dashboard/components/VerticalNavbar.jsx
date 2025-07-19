import React from 'react'
import { UserCircle } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faPen } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
export const VerticalNavbar = ({role}) => {
  const { user } = useAuth();
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
        <div className="flex flex-col gap-2">
            <NavLink to="" className="flex items-center gap-2 p-2 font-semibold  hover:bg-gray-700 rounded-md">
              <UserCircle size={20} />
              <span>Profile</span>
            </NavLink>
            <NavLink to="marks" className="flex items-center gap-2 p-2 font-semibold  hover:bg-gray-700 rounded-md">
              <FontAwesomeIcon className=' font-bold text-xl' icon={faPen} />
              <span>Results</span>
            </NavLink>
        </div>
    </div>
  )
}
