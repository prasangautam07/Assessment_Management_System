import { Navigate,Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
    const user=true;
    return user ? <Outlet /> : <Navigate to="/student/login" />;
}
