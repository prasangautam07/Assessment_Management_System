import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { validateUser } from "./api/UserApi"; 
import { useAuth } from "./AuthContext"; // Assuming you have an AuthContext to manage user state

export const ProtectedRoutes = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null); // null = loading
  const { setUser } = useAuth(); // Get user from AuthContext if needed
  useEffect(() => {
    const checkUser = async () => {
      const user = await validateUser(setUser);
      console.log("User validation result:", user);
      setIsUserLoggedIn(!!user); // ✅ true if user exists
    };

    checkUser();
  }, []);

  if (isUserLoggedIn === null) return <p>Loading...</p>; // Optional loader

  return isUserLoggedIn ? <Outlet /> : (
  <Navigate to="/student/login" />);
};
