import React, { createContext, useState, useEffect } from 'react';
import { login, register, fetchUserProfile, logout } from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (credentials) => {
    try {
      const data = await login(credentials);
      localStorage.setItem('token', data.token); // Stockage du token
      setUser(data.user); // Mise à jour de l'état utilisateur
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      throw error;
    }
  };

  const registerUser = async (userData) => {
    try {
      const data = await register(userData);
      console.log('Inscription réussie :', data);
      return data; // Renvoie les données pour affichage ou utilisation
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error.message);
      throw error;
    }
  };

  const logoutUser = () => {
    logout();
    setUser(null); // Réinitialisation de l'état utilisateur
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setUser(profile);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error.message);
        logoutUser();
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
