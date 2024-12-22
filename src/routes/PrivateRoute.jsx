import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user } = useContext(AuthContext);

  // Redirection si l'utilisateur n'est pas connecté
  if (!user) {
    console.warn('Utilisateur non connecté. Redirection vers /login.');
    return <Navigate to="/login" replace />;
  }

  // Redirection si le rôle n'est pas autorisé
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    console.warn(`Rôle non autorisé : ${user.role}. Redirection vers /.`);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
