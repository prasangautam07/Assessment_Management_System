import axios from 'axios';
import { toast } from 'react-toastify';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiUrl = baseUrl;

export const validateUser = async (setUser) => {
  const token = sessionStorage.getItem('accessToken');
  if (!token) {
    console.error('No access token found in localStorage');
    return null;
  }

  try {
    const response = await axios.get(`${apiUrl}/users/validate`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (setUser) {
      setUser(response.data.user);
    }
    return response.data;

  } catch (error) {
    console.error('Token invalid or expired:', error.response?.data?.message || error.message);
    return null;
  }
};

export const loginUser= async (username, password,setError,role)=>{
    try {
    const res = await axios.post(
      `${apiUrl}/users/login`,
      { username, password,role },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const accessToken = res.data.accessToken;
    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken);
      toast.success('Login successful!');
      return(true);
    } else {
      setError('Login failed: No token received');
      return(false);
    }
  } catch (error) {
    // Error handling
    toast.error('Server error.');
    if (error.response && error.response.data && error.response.data.message) {
      console.error(`Login error: ${error.response.data.message}`);
      setError("Server error. Please try again later.");
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

    toast.success('User successfully registered!');
    return true;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
        return false;
    } else {
      setError('Registration failed. Please try again later.');
        return false;
    }
  }
}

export const UploadUserAvatar = async (avatarUrl,username) => {
  try {
    const res = await axios.post(`${apiUrl}/users/upload-avatar`, {avatarUrl,username});
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
};


export const uploadToCloudinary = async (file) => {
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error('Failed to upload file to Cloudinary');
    }
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
};
