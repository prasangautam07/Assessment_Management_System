import React from 'react'
import { StudentLoginPage } from './user/pages/StudentLoginPage'
import { StudentRegisterPage } from './user/pages/StudentRegisterPage'
import { TeacherLoginPage } from './user/pages/TeacherLoginPage'
import { TeacherRegisterPage } from './user/pages/TeacherRegisterPage'
import { HomePage } from './HomePage'
import { Route, Routes } from 'react-router-dom'
export const PagesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/student-login" element={<StudentLoginPage />} />
      <Route path="/student-register" element={<StudentRegisterPage />} />
      <Route path="/teacher-login" element={<TeacherLoginPage />} />
      <Route path="/teacher-register" element={<TeacherRegisterPage />} />
    </Routes>
  )
}
