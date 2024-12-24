import { createContext, useState, useEffect } from 'react';
import { login, register, fetchUserProfile, logout } from '../services/api';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (credentials) => {
    const data = await login(credentials);
    if (data && data.user) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
    }
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
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile()
        .then((profile) => {
          if (profile && profile.user) {
            setUser(profile.user);
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération du profil :', error);
          logoutUser();
        });
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
