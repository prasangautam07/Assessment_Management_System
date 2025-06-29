import React from 'react'
import { LoginPage } from './user/pages/LoginPage'
import { RegisterPage } from './user/pages/RegisterPage'
import { Route, Routes } from 'react-router-dom'
export const PagesRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}
