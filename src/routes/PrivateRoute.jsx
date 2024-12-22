import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user } = useContext(AuthContext); // Accès à l'utilisateur connecté

  // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
  if (!user) {
    console.warn("Utilisateur non connecté.");
    return <Navigate to="/login" replace />;
  }

  // Si le rôle de l'utilisateur n'est pas autorisé, redirige vers l'accueil
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    console.warn(`Rôle non autorisé : ${user.role}`);
    return <Navigate to="/" replace />;
  }


  // Si tout va bien, rend le contenu protégé
  return <Outlet />;
};

export default PrivateRoute;
