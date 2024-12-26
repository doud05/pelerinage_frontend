import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';
import PropTypes from 'prop-types';

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user } = useContext(AuthContext);

  // Vérifier si l'utilisateur est connecté
  if (!user) {
    console.warn('Utilisateur non connecté. Redirection vers /login.');
    return <Navigate to="/login" replace />;
  }

  // Vérifier si le rôle de l'utilisateur est autorisé
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    console.warn(
      `Accès refusé : rôle ${user.role} non autorisé. Rôles requis : ${allowedRoles.join(', ')}`
    );
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>403 - Accès refusé</h1>
        <p>Vous n&apos;avez pas l&apos;autorisation d&apos;accéder à cette page.</p>
      </div>
    );
  }

  console.log(`Accès autorisé pour l'utilisateur : ${user.email} avec le rôle ${user.role}`);
  return <Outlet />;
};

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
