import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';
import PropTypes from 'prop-types';

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    console.warn('Utilisateur non connecté. Redirection vers /login.');
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    console.warn(`Accès refusé : rôle ${user.role} non autorisé. Redirection vers /.`);
    return <Navigate to="/" replace />;
  }

  console.log(`Accès autorisé pour l'utilisateur : ${user.email} avec le rôle ${user.role}`);
  return <Outlet />;
};

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
