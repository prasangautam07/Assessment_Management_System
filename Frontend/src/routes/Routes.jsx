import React from 'react'
import { StudentLoginPage } from '../user/pages/StudentLoginPage'
import { StudentRegisterPage } from '../user/pages/StudentRegisterPage'
import { TeacherLoginPage } from '../user/pages/TeacherLoginPage'
import { ProfilePage } from '../dashboard/pages/ProfilePage'
import { DashboardLayout } from '../dashboard/pages/DashboardLayout'
import { ResultsPage } from '../dashboard/pages/ResultsPage'
import { ProtectedRoutes } from '../utils/ProtectedRoutes'
import { HomePage } from '../HomePage'
import { Route, Routes } from 'react-router-dom'
export const PagesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/student/login" element={<StudentLoginPage />} />
      <Route path="/student/register" element={<StudentRegisterPage />} />
      <Route path="/teacher/login" element={<TeacherLoginPage />} />
      <Route element={<ProtectedRoutes/>}>
        <Route path="/dashboard" element={<DashboardLayout />} >
          <Route index element={<ProfilePage />} />
          <Route path="marks" element={<ResultsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
