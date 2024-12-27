import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';
import PropTypes from 'prop-types';

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user } = useContext(AuthContext);

  console.log('PrivateRoute chargé.');
  console.log('Rôles autorisés pour cette route :', allowedRoles);
  console.log('Utilisateur actuellement connecté :', user);
  console.log('Est autorisé ?', allowedRoles.includes(user?.role));

  if (!user) {
    console.warn('Utilisateur non connecté. Redirection vers /login.');
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    console.warn(`Accès refusé. Rôle requis : ${allowedRoles.join(', ')}. Rôle de l'utilisateur : ${user.role}`);
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>403 - Accès refusé</h1>
        <p>Vous n'avez pas la permission d'accéder à cette page.</p>
      </div>
    );
  }

  console.log(`Accès autorisé pour ${user.email} avec le rôle ${user.role}`);
  return <Outlet />;
};

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
