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
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && error.response.data.message === 'Token expiré.') {
      try {
        const refreshResponse = await api.post('/auth/refresh');
        const newToken = refreshResponse.data.token;

        localStorage.setItem('token', newToken);

        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config); // Relancer la requête originale
      } catch (refreshError) {
        console.error('Erreur lors du rafraîchissement du token :', refreshError.message);
        localStorage.removeItem('token'); // Supprimer le token expiré
        window.location.href = '/login'; // Rediriger vers la connexion
      }
    }
    return Promise.reject(error);
  }
);

// Ajout explicite des exports manquants
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

export const logout = () => {
  localStorage.removeItem('token');
};

export default api;
