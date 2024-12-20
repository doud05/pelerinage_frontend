import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * @description Composant pour protéger les routes privées
 * Vérifie si l'utilisateur est authentifié avant de lui permettre l'accès
 */
const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirection si l'utilisateur n'a pas le rôle approprié
    return <Navigate to="/dashboard" replace />;
  }

  // Si l'utilisateur est authentifié et a le bon rôle, affiche la route
  return <Outlet />;
};

export default PrivateRoute;
