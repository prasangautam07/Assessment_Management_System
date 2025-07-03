import React from 'react'
import { LoginForm } from '../components/LoginForm';

export const TeacherLoginPage = () => {
  return (
    <div className=' container max-w-md p-4 rounded-md card-shadow '>
        <LoginForm role="teacher" />
    </div>
  )
}
