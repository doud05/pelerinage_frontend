import axios from 'axios';

const API_BASE_URL = 'https://resa.pelerinagesdegap.fr/api'; // Remplacez par l'URL de votre backend

// Configuration par défaut d'axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajout automatique du token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fonction de connexion
export const login = async (credentials) => {
  const { data } = await api.post('/login', credentials);
  return data;
};

// Fonction d'inscription
export const register = async (userData) => {
  const { data } = await api.post('/register', userData);
  return data;
};

// Fonction de déconnexion
export const logout = () => {
  localStorage.removeItem('token');
};

// Récupérer tous les utilisateurs (nécessite une authentification)
export const getUsers = async () => {
  const { data } = await api.get('/utilisateurs');
  return data;
};
