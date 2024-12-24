import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';
import PropTypes from 'prop-types';

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user } = useContext(AuthContext);

  // Vérifier si l'utilisateur est authentifié
  if (!user) {
    console.warn('[PrivateRoute] Utilisateur non connecté. Redirection vers /login.');
    return <Navigate to="/login" replace />;
  }

  // Logs pour vérifier le rôle de l'utilisateur
  console.info(`[PrivateRoute] Vérification des rôles : utilisateur ${user.email}, rôle ${user.role}`);

  // Vérifier si l'utilisateur a un rôle autorisé
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    console.warn(`[PrivateRoute] Accès refusé : rôle ${user.role} non autorisé. Redirection vers /.`);
    return <Navigate to="/" replace />;
  }

  console.info(`[PrivateRoute] Accès autorisé pour l'utilisateur : ${user.email} avec le rôle ${user.role}`);
  return <Outlet />;
};

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
