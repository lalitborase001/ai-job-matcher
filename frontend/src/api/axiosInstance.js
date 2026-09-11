import axios from 'axios';

import { API_BASE_URL } from '../constants/config';



const axiosInstance = axios.create({
  // Vite looks for the environment variable first. If it's missing (like on localhost), it falls back.
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080', 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;