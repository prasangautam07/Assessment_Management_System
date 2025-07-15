import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { validateUser } from "./api/UserApi";
import { useAuth } from "./AuthContext";

export const ProtectedRoutes = ({ role }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null); // null = loading
  const [validatedUser, setValidatedUser] = useState(null);
  const { setUser } = useAuth();

  useEffect(() => {
    const checkUser = async () => {
      const checkedUser = await validateUser(setUser);
      console.log("Checked user:", checkedUser); // Debugging line
      setValidatedUser(checkedUser?.user || null);
      setIsUserLoggedIn(!!checkedUser);
    };
    checkUser();
  }, []);

  if (isUserLoggedIn === null) return <p>Loading...</p>;

  if (!isUserLoggedIn) return <Navigate to="/login" />;

  if (role && validatedUser && validatedUser.role !== role) {
    return <Navigate to={`/${validatedUser.role}/dashboard`} />;
  }

  return <Outlet />;
};
