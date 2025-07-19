import React from 'react'
import { StudentLoginPage } from '../user/pages/StudentLoginPage'
import { StudentRegisterPage } from '../user/pages/StudentRegisterPage'
import { TeacherLoginPage } from '../user/pages/TeacherLoginPage'
import { ProfilePage } from '../dashboard/studentDashboard/pages/ProfilePage'
import { StudentDashboardLayout } from '../dashboard/studentDashboard/pages/StudentDashboardLayout'
import { ResultsPage } from '../dashboard/studentDashboard/pages/ResultsPage'
import { ProtectedRoutes } from '../utils/ProtectedRoutes'
import { HomePage } from '../HomePage'
import { Route, Routes } from 'react-router-dom'
import { TeacherDashboardLayout } from '../dashboard/teacherDashboard/pages/TeacherDashboardLayout'
import { TeacherDashboard } from '../dashboard/teacherDashboard/components/UsersProfiles'
export const PagesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/student/login" element={<StudentLoginPage />} />
      <Route path="/student/register" element={<StudentRegisterPage />} />
      <Route path="/teacher/login" element={<TeacherLoginPage />} />
      <Route element={<ProtectedRoutes role='student'/>}>
        <Route path="/student/dashboard" element={<StudentDashboardLayout />} >
          <Route index element={<ProfilePage />} />
          <Route path="marks" element={<ResultsPage />} />
        </Route>          
      </Route>
      <Route element={<ProtectedRoutes role='teacher'/>}>
        <Route path="/teacher/dashboard" element={<TeacherDashboardLayout />} >
          <Route index element={<TeacherDashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}
