import { createContext, useState, useEffect } from 'react';
import { login, register, fetchUserProfile, logout } from '../services/api';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (credentials) => {
    console.log('Tentative de connexion avec :', credentials);
    const data = await login(credentials);
    console.log('Réponse API login :', data);

    if (!data.user || !data.user.role) {
      console.error('Utilisateur ou rôle introuvable dans la réponse.');
      throw new Error('Utilisateur ou rôle introuvable dans la réponse.');
    }

    localStorage.setItem('token', data.token);
    console.log('Token stocké dans localStorage :', localStorage.getItem('token'));

    setUser(data.user);
    console.log('Utilisateur défini dans le contexte :', data.user);

    return data;
  };

  const registerUser = async (userData) => {
    console.log('Tentative d’inscription avec :', userData);
    const data = await register(userData);
    console.log('Réponse API register :', data);

    return data;
  };

  const logoutUser = () => {
    console.log('Déconnexion de l’utilisateur.');
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
          console.error('Profil utilisateur invalide ou rôle introuvable.');
          throw new Error('Profil utilisateur invalide ou rôle introuvable.');
        }

        setUser(profile.user);
        console.log('Utilisateur chargé dans le contexte :', profile.user);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error.message);
        logoutUser();
      }
    };

    const token = localStorage.getItem('token');
    console.log('Token récupéré depuis localStorage :', token);

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

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
