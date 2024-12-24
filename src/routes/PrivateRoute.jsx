import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';
import PropTypes from 'prop-types';

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  console.log('Utilisateur récupéré dans PrivateRoute avec Outlet :', user);
  console.log('Route actuelle :', location.pathname);

  // Vérifier si l'utilisateur est connecté
  if (!user) {
    console.warn('Utilisateur non connecté. Redirection vers /login.');
    return <Navigate to="/login" replace />;
  }

  // Vérifier si l'utilisateur a un rôle autorisé
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    console.warn(`Accès refusé : rôle ${user.role} non autorisé.`);
    return <Navigate to="/" replace />;
  }

  console.log(`Accès autorisé pour l'utilisateur : ${user.email} avec le rôle ${user.role}`);
  return <Outlet />;
};

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
