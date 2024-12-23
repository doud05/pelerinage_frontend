import React, { useEffect } from 'react';

const DashboardGestionnaire = () => {
  useEffect(() => {
    console.log('Composant DashboardGestionnaire monté.');
  }, []);

  return (
    <div>
      <h1>Tableau de bord : Gestionnaire</h1>
      <p>Gérez les pèlerinages et les réservations ici.</p>
    </div>
  );
};

export default DashboardGestionnaire;
