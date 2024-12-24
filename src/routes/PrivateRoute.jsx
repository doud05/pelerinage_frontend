import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';
import PropTypes from 'prop-types';

const PrivateRoute = ({ allowedRoles = [], children }) => {
  const { user } = useContext(AuthContext);

  console.log('Utilisateur récupéré dans PrivateRoute simplifié :', user);

  if (!user) {
    console.warn('Utilisateur non connecté. Redirection vers /login.');
    return <Navigate to="/login" replace />;
  }

  console.log(`Accès autorisé pour l'utilisateur : ${user.email}, rôle : ${user.role}`);
  return children;
};

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
