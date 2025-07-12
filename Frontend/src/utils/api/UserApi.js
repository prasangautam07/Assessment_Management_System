import axios from 'axios';
import { toast } from 'react-toastify';
const localHost=true;
const apiUrl = localHost ? 'http://localhost:3000/api' : 'https://assessment-management-system-3gj3.onrender.com/api';

//const apiUrl = 'https://assessment-management-system-3gj3.onrender.com/api';
//const apiUrl = 'http://localhost:3000/api';
export const validateUser = async (setUser) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No access token found in localStorage');
    return null;
  }
  console.log('Validating user with token:', token);

  try {
    const response = await axios.get(`${apiUrl}/users/validate`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    console.log('User validated:', response);
    if (setUser) {
      setUser(response.data.user);
      console.log('User set in context:', response.data.user);
    }
    return response.data;

  } catch (error) {
    console.error('Token invalid or expired:', error.response?.data?.message || error.message);
    return null;
  }
};

export const loginUser= async (username, password,setError)=>{
    try {
    const res = await axios.post(
      `${apiUrl}/users/login`,
      { username, password }, // Request body
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const accessToken = res.data.accessToken;
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
      `${apiUrl}/users/register`,
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
