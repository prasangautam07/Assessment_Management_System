import React from 'react'
import Logo from './assets/Logo.svg'
import { UserCircle } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export const HomePage = () => {
    return (
        <div className=' container-large p-4 rounded-md card-shadow '>
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className='flex gap-3 items-center justify-center'>
                    <img src={Logo} alt="" />
                    <div className='flex flex-col items-start text-[14px] font-semibold'>
                        <h2 className='text-[#4B4A4A]'>Tribhuvan University</h2>
                        <h2 className='text-[16px] text-[#090D4C]'>Institute of Engineering</h2>
                        <h3 className='text-[16px] text-[#090D4C]'>Thapathali Campus</h3>
                    </div>
                </div>
            </div>
            <h1 className='font-bold text-[#4B4A4A] text-xl mt-2'>Welcome to IOE-TEC</h1>
            <h1 className='font-semibold text-[17px]'>Assessment Management System</h1>
            <div className='container flex flex-col items-center justify-center mt-4'>
                <p className='text-2xl text-[#090D4C] font-semibold mt-2'>Please Choose Your Role</p>
                <div className='flex items-center justify-center gap-20 mt-4 mb-4 p-4 rounded-md'>
                    <NavLink to="/student-login" className='flex flex-col items-center bg-[#e5f2f8] p-4 rounded-md card-shadow hover:opacity-70 '>
                        <UserCircle className='text-primary w-8 h-8 ' />
                        <h1 className='text-[#090D4C] font-semibold text-[18px]'>Student</h1>
                    </NavLink>
                    <NavLink to="/teacher-login" className='flex flex-col items-center bg-[#e5f2f8] p-4 rounded-md card-shadow hover:opacity-70'>
                        <UserCircle className='text-primary w-8 h-8 ' />
                        <h1 className='text-[#090D4C] font-semibold text-[18px]'>Teacher</h1>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
