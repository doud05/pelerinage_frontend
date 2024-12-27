import React, { useEffect, useState } from 'react';
import { getPelerins } from '../services/api';

const AnnuaireAdmin = () => {
  const [pelerins, setPelerins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('Composant AnnuaireAdmin chargé.');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Début de fetchData dans AnnuaireAdmin.');
        setLoading(true);
        const response = await getPelerins(1, 10);
        console.log('Réponse API reçue :', response);

        if (response.success && Array.isArray(response.data)) {
          console.log('Mise à jour des données de pelerins.');
          setPelerins(response.data);
        } else {
          console.error('Format inattendu dans la réponse API :', response);
          setError('Format de données inattendu.');
        }
      } catch (err) {
        console.error('Erreur lors du chargement des données :', err.message || err);
        setError('Impossible de charger les données.');
      } finally {
        setLoading(false);
        console.log('Fin de fetchData dans AnnuaireAdmin.');
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: 'lightblue', padding: '20px' }}>
      <h1>Annuaire des Pèlerins</h1>
      {loading && <p>Chargement des données...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && pelerins.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Ville</th>
              <th>Téléphone</th>
            </tr>
          </thead>
          <tbody>
            {pelerins.map((pelerin) => (
              <tr key={pelerin.id}>
                <td>{pelerin.id}</td>
                <td>{pelerin.nom}</td>
                <td>{pelerin.prenom}</td>
                <td>{pelerin.ville}</td>
                <td>{pelerin.telephone_portable || pelerin.telephone_fixe || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && !error && <p>Aucun pèlerin trouvé.</p>
      )}
    </div>
  );
};

export default AnnuaireAdmin;
