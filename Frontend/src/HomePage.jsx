import React from 'react'
import Logo from './assets/Logo.svg'
import { UserCircle,GraduationCap } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export const HomePage = () => {
    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* Gradient overlay with pattern */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-50 via-indigo-100 to-white" />
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-100 via-transparent to-transparent opacity-40" />
            {/* Main card */}
            <div className="relative z-10 container-large mt-10 p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg border border-gray-200">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex gap-3 items-center justify-center mb-2">
                        <img src={Logo} alt="" className="w-16 h-16 drop-shadow-lg" />
                        <div className="flex flex-col items-start text-[15px] font-semibold">
                            <h2 className="text-indigo-900 text-lg">Tribhuvan University</h2>
                            <h2 className="text-indigo-900 text-[17px]">Institute of Engineering</h2>
                            <h3 className="text-indigo-900 text-[17px]">Thapathali Campus</h3>
                        </div>
                    </div>
                </div>
                <h1 className="font-bold text-indigo-900 text-2xl mt-2 text-center">Welcome to IOE-TEC</h1>
                <h2 className="font-semibold text-indigo-900 text-lg text-center mb-2">Assessment Management System</h2>
                <div className="container flex flex-col items-center justify-center mt-6">
                    <p className="text-2xl text-indigo-900 font-semibold mt-2 mb-4 text-center">Please Choose Your Role</p>
                    <div className="flex flex-wrap items-center justify-center gap-10 mt-4 mb-4">
                        <NavLink to="/student/login" className="flex flex-col items-center bg-indigo-50 p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-indigo-100 transition-all duration-200">
                            <UserCircle className="text-indigo-600 w-10 h-10 mb-2" />
                            <h1 className="text-indigo-800 font-semibold text-[18px]">Student</h1>
                            <span className="text-xs text-gray-500 mt-1">Access your marks and profile</span>
                        </NavLink>
                        <NavLink to="/teacher/login" className="flex flex-col items-center bg-indigo-50 p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-indigo-100 transition-all duration-200">
                            <GraduationCap className="text-indigo-600 w-10 h-10 mb-2" />
                            <h1 className="text-indigo-800 font-semibold text-[18px]">Teacher</h1>
                            <span className="text-xs text-gray-500 mt-1">Manage students and assessments</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
