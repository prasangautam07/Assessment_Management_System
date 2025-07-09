import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { validateUser } from "./api"; 

export const ProtectedRoutes = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null); // null = loading

  useEffect(() => {
    const checkUser = async () => {
      const user = await validateUser();
      console.log("User validation result:", user);
      setIsUserLoggedIn(!!user); // ✅ true if user exists
    };

    checkUser();
  }, []);

  if (isUserLoggedIn === null) return <p>Loading...</p>; // Optional loader

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/student/login" />;
};
