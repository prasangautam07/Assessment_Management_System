import { Outlet } from 'react-router-dom';
import { VerticalNavbar } from '../../components/VerticalNavbar';
import { HorizontalNavbar } from '../../components/HorizontalNavbar';

export const TeacherDashboardLayout = () => {
  return (
    <div className="flex">
      <VerticalNavbar role="teacher"/>
      <div className="flex-1">
        <HorizontalNavbar role="teacher"/>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
