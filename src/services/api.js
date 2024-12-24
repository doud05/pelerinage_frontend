import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Intercepteur : Token ajouté', token);
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (credentials) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const { data } = await api.post('/auth/register', { ...userData, role: 'pelerin' });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const { data } = await api.get('/auth/profile');
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const { data } = await api.get('/utilisateurs');
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const { data } = await api.put(`/utilisateurs/${userId}/role`, { role });
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export default api;
