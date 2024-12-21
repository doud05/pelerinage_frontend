import React, { createContext, useState, useEffect } from 'react';
import { login, logout, fetchUserProfile } from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loginUser = async (credentials) => {
    try {
      setError(null); // Réinitialiser les erreurs précédentes
      const data = await login(credentials);
      localStorage.setItem('token', data.token); // Stocker le token JWT
      setUser(data.user); // Mettre à jour l'utilisateur connecté
    } catch (err) {
      console.error('Erreur de connexion :', err);
      setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
      throw err;
    }
  };

  const logoutUser = () => {
    logout();
    localStorage.removeItem('token'); // Supprimer le token JWT
    setUser(null);
  };

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await fetchUserProfile(token); // Valider le token et récupérer le profil utilisateur
          setUser(userData);
        } catch (err) {
          console.error('Erreur lors de la récupération du profil utilisateur :', err);
          setUser(null);
          localStorage.removeItem('token'); // Supprimer un token invalide
        }
      }
      setLoading(false); // Fin du chargement initial
    };

    initializeUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
