import axios from 'axios';
import { toast } from 'react-toastify';

export const validateUser = async () => {
  const token = localStorage.getItem('accessToken');
  console.log('Validating user with token:', token);

  try {
    const response = await axios.get('https://assessment-management-system-3gj3.onrender.com/api/users/validate', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    console.log('User validated:', response.data);
    return response.data;

  } catch (error) {
    console.error('Token invalid or expired:', error.response?.data?.message || error.message);
    return null;
  }
};

export const loginUser= async (username, password,setError)=>{
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
      return(true);
    } else {
      setError('Login failed: No token received');
      return(false);
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
    return(false);
  }
}

export const registerUser = async (email, username, program, password ,setError) => {
  try {
    const res = await axios.post(
      'https://assessment-management-system-3gj3.onrender.com/api/users/register',
      { email, username, program, password },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log('Registration successful:', res.data);
    toast.success('User successfully registered!');
    return true;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log(`Error: ${error.response.data.message}`);
      setError(error.response.data.message);
        return false;
    } else {
      console.log(`Server error: ${error.message || 'Please try again later.'}`);
      setError('Registration failed. Please try again later.');
        return false;
    }
  }
}
