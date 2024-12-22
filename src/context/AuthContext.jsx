import React, { createContext, useState, useEffect } from 'react';
import { login, register, fetchUserProfile, logout } from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Utilisateur connecté
  const [loading, setLoading] = useState(true); // État de chargement

  // Fonction de connexion
  const loginUser = async (credentials) => {
    try {
      const data = await login(credentials);
      if (!data.user || !data.user.role) {
        throw new Error("Le rôle de l'utilisateur est introuvable.");
      }
      localStorage.setItem('token', data.token); // Stockage du token
      setUser(data.user); // Mise à jour de l'état utilisateur
      return data.user; // Retourne l'utilisateur pour la redirection
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      throw error;
    }
  };

  // Fonction d'inscription
  const registerUser = async (userData) => {
    try {
      const data = await register(userData);
      if (!data.user || !data.user.role) {
        throw new Error("Le rôle de l'utilisateur est introuvable.");
      }
      return data; // Retourne les données pour la redirection
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error.message);
      throw error;
    }
  };

  // Fonction de déconnexion
  const logoutUser = () => {
    logout();
    localStorage.removeItem('token');
    setUser(null);
  };

  // Chargement du profil utilisateur
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setUser(profile);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error.message);
        logoutUser();
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Chargement...</div>; // Affichage pendant le chargement
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
