import React, { useEffect } from 'react';

const DashboardPelerin = () => {
  useEffect(() => {
    console.log('Composant DashboardPelerin monté.');
  }, []);

  return (
    <div>
      <h1>Tableau de bord : Pèlerin</h1>
      <p>Bienvenue sur votre tableau de bord.</p>
    </div>
  );
};

export default DashboardPelerin;
