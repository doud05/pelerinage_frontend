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
  try {
    const { data } = await api.post('/auth/login', credentials);
    console.log('Réponse API login :', data);
    return data;
  } catch (error) {
    console.error('Erreur API login :', error.response?.data || error.message);
    throw error;
  }
};

/**
 * @description Inscription utilisateur
 */
export const register = async (userData) => {
  try {
    const { data } = await api.post('/auth/register', { ...userData, role: 'pelerin' });
    console.log('Réponse API register :', data);
    return data;
  } catch (error) {
    console.error('Erreur API register :', error.response?.data || error.message);
    throw error;
  }
};

/**
 * @description Récupère le profil utilisateur authentifié
 */
export const fetchUserProfile = async () => {
  try {
    const { data } = await api.get('/auth/profile');
    console.log('Profil utilisateur récupéré :', data);
    return data;
  } catch (error) {
    console.error('Erreur API fetchUserProfile :', error.response?.data || error.message);
    throw error;
  }
};

/**
 * @description Récupère la liste des utilisateurs
 */
export const fetchUsers = async () => {
  try {
    const { data } = await api.get('/utilisateurs');
    console.log('Liste des utilisateurs récupérée :', data);
    return data;
  } catch (error) {
    console.error('Erreur API fetchUsers :', error.response?.data || error.message);
    throw error;
  }
};

/**
 * @description Met à jour le rôle d'un utilisateur
 */
export const updateUserRole = async (userId, role) => {
  try {
    const { data } = await api.put(`/utilisateurs/${userId}`, { role });
    console.log('Utilisateur mis à jour :', data);
    return data;
  } catch (error) {
    console.error('Erreur API updateUserRole :', error.response?.data || error.message);
    throw error;
  }
};

/**
 * @description Déconnexion utilisateur
 */
export const logout = () => {
  localStorage.removeItem('token');
};

export default api;
