import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';
import PropTypes from 'prop-types';

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user } = useContext(AuthContext);

  console.log('PrivateRoute chargé.');

  // Log l'état actuel de l'utilisateur
  if (user) {
    console.log('Utilisateur actuel :', user);
  } else {
    console.log('Aucun utilisateur trouvé dans le contexte.');
  }

  // Vérifier si l'utilisateur est connecté
  if (!user) {
    console.warn('Utilisateur non connecté. Redirection vers /login.');
    return <Navigate to="/login" replace />;
  }

  // Vérifier si le rôle de l'utilisateur est autorisé
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    console.warn(
      `Accès refusé pour l'utilisateur : ${user.email}. Rôle ${user.role} non autorisé. Rôles requis : ${allowedRoles.join(', ')}`
    );
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>403 - Accès refusé</h1>
        <p>Vous n&apos;avez pas l&apos;autorisation d&apos;accéder à cette page.</p>
      </div>
    );
  }

  // Log l'autorisation et le rendu
  console.log(`Accès autorisé pour l'utilisateur : ${user.email} avec le rôle ${user.role}`);
  console.log('Rendu du composant enfant via <Outlet />.');
  
  // Rendu de la route autorisée
  return <Outlet />;
};

// Proptypes pour la validation des rôles
PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
