import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Lock, Key, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-toastify'


export const LoginForm = ({role}) => {
    const [showPassword, setShowPassword] = useState(false);
    const[error, setError] = useState(null);
    const[password, setPassword] = useState('');
    const[username, setUsername] = useState('');
    const Navigate=useNavigate();
 const handlesubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      'https://assessment-management-system-3gj3.onrender.com/api/users/login',
      { username, password }, // Request body
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const accessToken = res.data.accessToken; // Axios automatically parses JSON
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      console.log('Login successful!');
      toast.success('Login successful!');

      // Redirect based on role
      /* if (role === 'teacher') {
           Navigate('/teacher/dashboard');
         } else if (role === 'student') {
           Navigate('/dashboard');
         } */
      Navigate('/dashboard');
    } else {
      setError('Login failed: No token received');
    }
  } catch (error) {
    // Error handling
    if (error.response && error.response.data && error.response.data.message) {
      console.error(`Login error: ${error.response.data.message}`);
      setError(error.response.data.message);
    } else {
      console.error('Unexpected error:', error);
      setError('Server error. Please try again later.');
    }
  }
};

  return (
    <div className='flex flex-col items-center  justify-center gap-4'>
        <div>
          <h1 className='font-bold text-2xl mb-1'>{role==='teacher'?'Teacher Login':'Student Login'}</h1>
          <p className='font-semibold'>Welcome to IOE-TC </p>
          <p>Assesment Management System </p>
         <p className={`'text-sm text-red-600' ${error ? 'text-red-600 opacity-100' : 'opacity-0'}`}>{error || 'p'}</p>
        </div>
        <form className='flex flex-col gap-4 w-full' onSubmit={handlesubmit}>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="email" className='text-md'>Username</label>
            <div className='flex items-center border border-gray-300 rounded-md p-2 w-full focus-within:border-blue-300'>
              <Lock size={20} />
              <input
                type="text"
                name="username"
                id="username"
                className='border-none outline-none w-full ml-2'
                placeholder=' Eg. THA079BEI022'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                
              />
            </div>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="password" className='text-md'>Password</label>
            <div className='flex items-center border border-gray-300 rounded-md p-2 w-full focus-within:border-blue-300'>
              <Key size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className='outline-none w-full ml-2'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
              {showPassword
                ? <Eye size={20} onClick={() => setShowPassword(false)} className='cursor-pointer ml-2' />
                : <EyeOff size={20} onClick={() => setShowPassword(true)} className='cursor-pointer ml-2' />}
            </div>
          </div>
          <div className='flex items-center w-full mx-auto'>
            <button type="submit" className='bg-primary text-white rounded-md p-2 mt-4 cursor-pointer w-70 mx-auto hover:opacity-90 hover:scale-[1.02] transition-transform duration-600'>Login</button>
          </div>
        </form>
        {role==='student' && (
          <div className='flex items-center gap-2'>
          <p className='text-md'>Don't have an account?</p>
          <a href={`/${role}/register`} className='text-primary'>Register</a>
        </div>
        )}
        
      </div>
  )
}
