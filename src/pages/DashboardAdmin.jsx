import React, { useEffect } from 'react';

const DashboardAdmin = () => {
  useEffect(() => {
    console.log('Composant DashboardAdmin monté.');

    return () => {
      console.log('Composant DashboardAdmin démonté.');
    };
  }, []);

  try {
    console.log('Rendu du composant DashboardAdmin.');
    return (
      <div>
        <h1>Tableau de bord : Administrateur</h1>
        <p>Gérez les utilisateurs et les rôles ici.</p>
      </div>
    );
  } catch (error) {
    console.error('Erreur lors du rendu de DashboardAdmin :', error);
    return <div>Erreur lors du chargement du tableau de bord administrateur.</div>;
  }
};

export default DashboardAdmin;
