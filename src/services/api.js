import axios from 'axios';

// Base URL de l'API (configurée dans .env)
const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajout automatique du token JWT
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

/**
 * @description Connexion utilisateur
 */
export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

/**
 * @description Inscription utilisateur
 */
export const register = async (userData) => {
  const { data } = await api.post('/auth/register', { ...userData, role: 'pelerin' });
  return data;
};

/**
 * @description Récupère le profil utilisateur authentifié
 */
export const fetchUserProfile = async () => {
  const { data } = await api.get('/auth/profile');
  return data;
};

/**
 * @description Déconnexion utilisateur
 */
export const logout = () => {
  localStorage.removeItem('token');
};

/**
 * @description Met à jour le rôle d'un utilisateur
 */
export const updateUserRole = async (userId, role) => {
  const { data } = await api.put(`/users/${userId}/role`, { role });
  return data;
};

/**
 * @description Récupère les données du tableau de bord
 */
export const getDashboardData = async (role) => {
  const { data } = await api.get(`/dashboard/${role}`);
  return data;
};

/**
 * @description Récupère les réservations
 */
export const getUserReservations = async () => {
  const { data } = await api.get('/reservations');
  return data;
};

/**
 * @description Crée une réservation
 */
export const createReservation = async (reservationData) => {
  const { data } = await api.post('/reservations', reservationData);
  return data;
};

export default api;
