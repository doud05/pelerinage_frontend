import React, { createContext, useState, useEffect } from 'react';
import { login, register, fetchUserProfile, logout } from '../services/api';

// Création du contexte d'authentification
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stockage des informations utilisateur

  const loginUser = async (credentials) => {
    try {
      console.log('Tentative de connexion avec :', credentials);
      const data = await login(credentials);
      console.log('Réponse reçue pour login :', data);
      if (!data.user || !data.user.role) {
        throw new Error('Utilisateur ou rôle introuvable.');
      }
      localStorage.setItem('token', data.token); // Stockage du token
      setUser(data.user); // Mise à jour de l'utilisateur connecté
      return data;
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      throw error;
    }
  };

  const registerUser = async (userData) => {
    try {
      console.log('Tentative d’inscription avec :', userData);
      const data = await register(userData);
      console.log('Réponse reçue pour register :', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error.message);
      throw error;
    }
  };

  const logoutUser = () => {
    logout();
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        console.log('Profil utilisateur récupéré :', profile);
        if (!profile || !profile.user || !profile.user.role) {
          throw new Error('Profil utilisateur invalide ou rôle introuvable.');
        }
        setUser(profile.user);
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
