import React, { useState } from 'react';
import { Lock, Key, Eye, EyeOff, Mail, GraduationCap } from 'lucide-react';
import { toast } from 'react-toastify';

export const RegisterForm = ({ role }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Form fields state
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [program, setProgram] = useState('');
  const [password, setPassword] = useState('');

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://assessment-management-system-3gj3.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, program, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Registration successful!');
        toast.success('Usesr Successfully Registered!');
        setEmail('');
        setUsername('');
        setProgram('');
        setPassword('');
      } else {
        console.log(`Error: ${data.message || 'Registration failed'}`);
      }
    }catch (error) {
  console.log(`Server error: ${error.message || 'Please try again later.'}`);
  console.error(error);
}

  };

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div>
        <h1 className='font-bold text-2xl mb-1'>Signup</h1>
        <p>Enter your details to signup.</p>
      </div>
      <form className='flex flex-col gap-4 w-full' onSubmit={handlesubmit}>
        <div className='flex flex-col items-start gap-2'>
          <label htmlFor='email' className='text-md'>Email</label>
          <div className='flex items-center border border-gray-300 rounded-md p-2 w-full focus-within:border-blue-300'>
            <Mail size={20} />
            <input
              type='email'
              name='email'
              id='email'
              className='border-none outline-none w-full ml-2'
              placeholder='Enter your email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col items-start gap-2'>
          <label htmlFor='username' className='text-md'>Username</label>
          <div className='flex items-center border border-gray-300 rounded-md p-2 w-full focus-within:border-blue-300'>
            <Lock size={20} />
            <input
              type='text'
              name='username'
              id='username'
              className='border-none outline-none w-full ml-2'
              placeholder={role === 'teacher' ? 'Your Username' : 'Eg. THA079BEI022'}
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col items-start gap-2'>
          <label htmlFor='program' className='text-md'>Program</label>
          <div className='flex items-center border border-gray-300 rounded-md p-2 w-full focus-within:border-blue-300'>
            <GraduationCap size={20} />
            <input
              type='text'
              name='program'
              id='program'
              className='border-none outline-none w-full ml-2'
              placeholder='Eg. BEI'
              required
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col items-start gap-2'>
          <label htmlFor='password' className='text-md'>Password</label>
          <div className='flex items-center border border-gray-300 rounded-md p-2 w-full focus-within:border-blue-300'>
            <Key size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              className='outline-none w-full ml-2'
              placeholder='Enter your password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <Eye size={20} onClick={() => setShowPassword(false)} className='cursor-pointer ml-2' />
            ) : (
              <EyeOff size={20} onClick={() => setShowPassword(true)} className='cursor-pointer ml-2' />
            )}
          </div>
        </div>
        <div className='flex items-center w-full mx-auto'>
          <button
            type='submit'
            className='bg-primary text-white rounded-md p-2 mt-4 cursor-pointer w-70 mx-auto hover:opacity-80 hover:scale-[1.02] transition-transform duration-600'
          >
            Signup
          </button>
        </div>
      </form>
      <div className='flex items-center gap-2'>
        <p className='text-md'>Already have an Account?</p>
        <a href={`/${role}/login`} className='text-primary'>
          Login
        </a>
      </div>
    </div>
  );
};
