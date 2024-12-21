import React, { createContext, useState, useEffect } from 'react';
import { login, logout, fetchUserProfile } from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (credentials) => {
  try {
    const data = await login(credentials);
    localStorage.setItem('token', data.token);
    setUser(data.user); // Utilise directement l'utilisateur renvoyé par le backend
  } catch (error) {
    console.error('Erreur de connexion :', error.message);
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
        setUser(profile);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur :', error.message);
        logoutUser();
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
