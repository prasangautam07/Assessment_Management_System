import axios from 'axios';

export const validateUser = async () => {
  const token = localStorage.getItem('accessToken');
  console.log('Validating user with token:', token);

  try {
    const response = await axios.get('http://localhost:3000/api/users/validate', {
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
