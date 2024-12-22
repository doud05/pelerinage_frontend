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
 * @param {Object} credentials - Les informations de connexion (email et mot de passe)
 * @returns {Object} Données utilisateur et token
 */
export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

/**
 * @description Inscription utilisateur
 * Attribue un rôle par défaut ('pelerin') si non spécifié.
 * @param {Object} userData - Les informations d'inscription (email, mot de passe)
 * @returns {Object} Données utilisateur et token
 */
export const register = async (userData) => {
  const { data } = await api.post('/auth/register', { ...userData, role: 'pelerin' });
  return data;
};

/**
 * @description Récupère le profil utilisateur authentifié
 * @returns {Object} Données du profil utilisateur
 */
export const fetchUserProfile = async () => {
  const { data } = await api.get('/auth/profile');
  return data;
};

/**
 * @description Déconnexion utilisateur
 * Supprime le token local
 */
export const logout = () => {
  localStorage.removeItem('token');
};

/**
 * @description Récupère tous les utilisateurs (administrateur uniquement)
 * @returns {Array} Liste des utilisateurs
 */
export const getAllUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

/**
 * @description Met à jour le rôle d'un utilisateur
 * (administrateur uniquement)
 * @param {number} userId - ID de l'utilisateur
 * @param {string} role - Nouveau rôle (e.g., 'admin', 'gestionnaire', 'pelerin')
 * @returns {Object} Utilisateur mis à jour
 */
export const updateUserRole = async (userId, role) => {
  const { data } = await api.put(`/users/${userId}/role`, { role });
  return data;
};

/**
 * @description Récupère les données du tableau de bord spécifique à un rôle
 * @param {string} role - Le rôle de l'utilisateur ('admin', 'gestionnaire', 'pelerin')
 * @returns {Object} Données du tableau de bord
 */
export const getDashboardData = async (role) => {
  const { data } = await api.get(`/dashboard/${role}`);
  return data;
};

/**
 * @description Récupère les réservations de l'utilisateur authentifié
 * @returns {Array} Liste des réservations
 */
export const getUserReservations = async () => {
  const { data } = await api.get('/reservations');
  return data;
};

/**
 * @description Crée une réservation pour un pèlerin
 * @param {Object} reservationData - Données de la réservation
 * @returns {Object} Réservation créée
 */
export const createReservation = async (reservationData) => {
  const { data } = await api.post('/reservations', reservationData);
  return data;
};

export default api;
