// src/api.js
import axios from 'axios';

const API_BASE = 'https://watchads-backend-1.onrender.com'; // use your live backend URL

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
