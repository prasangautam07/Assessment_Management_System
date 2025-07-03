// src/dashboard/layouts/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import { VerticalNavbar } from '../components/VerticalNavbar';
import { HorizontalNavbar } from '../components/HorizontalNavbar';

export const DashboardLayout = () => {
  return (
    <div className="flex">
      <VerticalNavbar />
      <div className="flex-1">
        <HorizontalNavbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
