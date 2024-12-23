import { createContext, useState, useEffect } from 'react';
import { login, register, fetchUserProfile, logout } from '../services/api';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (credentials) => {
    const data = await login(credentials);
    if (!data.user || !data.user.role) {
      throw new Error('Utilisateur ou rôle introuvable dans la réponse.');
    }
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const registerUser = async (userData) => {
    const data = await register(userData);
    return data;
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
        if (!profile || !profile.user || !profile.user.role) {
          throw new Error('Profil utilisateur invalide ou rôle introuvable.');
        }
        setUser(profile.user);
      } catch {
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

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
