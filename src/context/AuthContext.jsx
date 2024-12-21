import React, { createContext, useState, useEffect } from 'react';
import { login, logout } from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (credentials) => {
    try {
      const data = await login(credentials);
      localStorage.setItem('token', data.token); // Stocker le token JWT
      setUser(data.user); // Mettre à jour l'utilisateur connecté
    } catch (error) {
      console.error('Erreur de connexion :', error);
      throw error;
    }
  };

  const logoutUser = () => {
    logout();
    localStorage.removeItem('token'); // Supprimer le token JWT
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Option : effectuer une requête au backend pour valider le token et obtenir l'utilisateur
      setUser({ token }); // Placeholder pour simplifier
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
