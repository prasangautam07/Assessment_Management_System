// src/dashboard/layouts/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import { VerticalNavbar } from '../../components/VerticalNavbar';
import { HorizontalNavbar } from '../../components/HorizontalNavbar';

export const StudentDashboardLayout = () => {
  return (
    <div className="flex">
      <VerticalNavbar role="student"/>
      <div className="flex-1">
        <HorizontalNavbar role="student" />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
