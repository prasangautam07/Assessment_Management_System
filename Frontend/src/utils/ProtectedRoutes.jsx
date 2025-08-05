import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { validateUser } from "./api/UserApi";
import { useAuth } from "./AuthContext";

export const ProtectedRoutes = ({ role }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null); 
  const [validatedUser, setValidatedUser] = useState(null);
  const { setUser } = useAuth();

  useEffect(() => {
    const checkUser = async () => {
      const checkedUser = await validateUser(setUser);
      setValidatedUser(checkedUser?.user || null);
      setIsUserLoggedIn(!!checkedUser);
    };
    checkUser();
  }, []);

  if (isUserLoggedIn === null) return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                    <svg className="animate-spin h-8 w-8 text-primary mb-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    <span className=" font-semibold">Loading...</span>
                </div>
            </div>);

  if (!isUserLoggedIn) return <Navigate to='/' />;

  if (role && validatedUser && validatedUser.role !== role) {
    return <Navigate to={`/${validatedUser.role}/dashboard`} />;
  }

  return <Outlet />;
};
