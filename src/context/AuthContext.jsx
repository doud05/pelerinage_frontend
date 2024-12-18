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
    }
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  useEffect(() => {
    // Vérifiez si un utilisateur est déjà connecté via le token
    const token = localStorage.getItem('token');
    if (token) {
      // Vous pourriez appeler une API pour récupérer les détails utilisateur
      setUser({ token }); // Pour l'instant, on utilise uniquement le token
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
