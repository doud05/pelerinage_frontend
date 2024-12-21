import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;// URL de votre backend

// Configuration par défaut d'axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajout automatique du token JWT pour toutes les requêtes
api.interceptors.request.use((config) => {
  if (!config.url.endsWith('/auth/login')) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Gestion des erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API :', error.response || error.message);
    if (error.response && error.response.status === 401) {
      // Rediriger vers la page de connexion ou gérer l'expiration du token
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Fonction de connexion
export const login = async (credentials) => {
  try {
    return await api.post('/auth/login', credentials);
    console.log('Réponse brute du backend :', data);

    // Vérification que la réponse contient les données nécessaires
    if (!data.token || !data.user) {
      throw new Error('La réponse du serveur ne contient pas les propriétés attendues.');
    }

   return data;
  } catch (error) {
    console.error('Erreur lors de la connexion :', error.response?.data || error.message);
    throw error;
  }
};


// Fonction d'inscription
export const register = async (userData) => {
  try {
    console.log('Tentative d’inscription avec :', userData); // Log des informations d'entrée
    return await api.post('/auth/register', userData);  // Utilise la route correcte
    console.log('Réponse du backend :', data); // Log de la réponse pour débogage
    return data; // Retourne les données reçues
  } catch (error) {
    console.error('Erreur lors de l’inscription :', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Erreur lors de l’inscription.');
  }
};


// Fonction de déconnexion
export const logout = () => {
  localStorage.removeItem('token');
};

// Récupérer tous les utilisateurs (nécessite une authentification)
export const getUsers = async () => {
  try {
    const { data } = await api.get('/utilisateurs');
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des utilisateurs.');
  }
};

// Récupérer les informations du profil utilisateur
export const fetchUserProfile = async () => {
  try {
    const { data } = await api.get('/profile'); // Assurez-vous que cet endpoint existe dans votre backend
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération du profil utilisateur.');
  }
};

// Récupérer les réservations d'un utilisateur (optionnel si pertinent pour votre cas)
export const getUserReservations = async () => {
  try {
    const { data } = await api.get('/reservations');
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des réservations.');
  }
};
