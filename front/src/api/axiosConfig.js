import axios from 'axios';

const axiosAuth = axios.create({
  baseURL: 'http://localhost/LARAVEL/ELCUMPA/RestauranteCumpa/public/api',
});

// Antes de cada petición añade el token actualizado
axiosAuth.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export default axiosAuth;
