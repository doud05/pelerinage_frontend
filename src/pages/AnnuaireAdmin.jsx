import React, { useEffect, useState } from 'react';

const AnnuaireAdmin = () => {
  const [pelerins, setPelerins] = useState([]);

  useEffect(() => {
    console.log('Composant AnnuaireAdmin monté.');
    try {
      // Ajouter des données simulées
      setPelerins([
        { id: 1, nom: 'Dupont', prenom: 'Jean', mail: 'jean.dupont@example.com', ville: 'Paris' },
        { id: 2, nom: 'Durand', prenom: 'Marie', mail: 'marie.durand@example.com', ville: 'Lyon' },
      ]);
    } catch (error) {
      console.error('Erreur lors du chargement des données simulées :', error);
    }
  }, []);

  return (
    <div style={{ backgroundColor: 'lightblue', padding: '20px' }}>
      <h1>Annuaire des Pèlerins</h1>
      {pelerins.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Ville</th>
            </tr>
          </thead>
          <tbody>
            {pelerins.map((p) => (
              <tr key={p.id}>
                <td>{p.nom}</td>
                <td>{p.prenom}</td>
                <td>{p.mail}</td>
                <td>{p.ville}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun pèlerin trouvé.</p>
      )}
    </div>
  );
};

export default AnnuaireAdmin;
