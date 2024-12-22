import React, { createContext, useState, useEffect } from 'react';
import { login, register, fetchUserProfile, logout } from '../services/api';

// Création du contexte d'authentification
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stockage des informations utilisateur

  // Fonction de connexion
  const loginUser = async (credentials) => {
    try {
      const data = await login(credentials);
      localStorage.setItem('token', data.token); // Stockage du token dans localStorage
      setUser(data.user); // Mise à jour de l'utilisateur connecté
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      throw error; // Rejet en cas d'échec pour affichage de l'erreur
    }
  };

  // Fonction d'inscription
  const registerUser = async (userData) => {
    try {
      const data = await register(userData);
      console.log('Inscription réussie :', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error.message);
      throw error;
    }
  };

  // Fonction de déconnexion
  const logoutUser = () => {
    logout();
    localStorage.removeItem('token'); // Suppression du token
    setUser(null); // Réinitialisation de l'état utilisateur
  };

  // Chargement du profil utilisateur à partir du token
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setUser(profile);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error.message);
        logoutUser(); // Déconnexion en cas d'erreur
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
