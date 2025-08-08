import axios from 'axios';

const token = localStorage.getItem('token');

const axiosAuth = axios.create({
  baseURL: 'http://localhost:8000/api',  // Cambia según tu backend
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosAuth;
