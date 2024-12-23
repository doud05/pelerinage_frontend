import React, { useEffect } from 'react';

const DashboardAdmin = () => {
  useEffect(() => {
    console.log('Composant DashboardAdmin monté.');
  }, []);

  return (
    <div>
      <h1>Tableau de bord : Administrateur</h1>
      <p>Gérez les utilisateurs et les rôles ici.</p>
    </div>
  );
};

export default DashboardAdmin;
