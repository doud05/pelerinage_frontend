import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Page pour les routes non trouvées.
 */
const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>404 - Page non trouvée</h1>
      <p>Oups ! La page que vous recherchez n&apos;existe pas.</p>
      <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
        Retour à la page de connexion
      </Link>
    </div>
  );
};

export default NotFound;
