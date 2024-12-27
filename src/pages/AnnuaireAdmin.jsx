import React, { useEffect, useState } from 'react';
import { getPelerins } from '../services/api';

const AnnuaireAdmin = () => {
  const [pelerins, setPelerins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('Composant AnnuaireAdmin chargé.');

  useEffect(() => {
    console.log('useEffect déclenché dans AnnuaireAdmin.');
    const fetchData = async () => {
      console.log('Début du fetchData pour AnnuaireAdmin.');
      setLoading(true);
      setError(null);
      try {
        const response = await getPelerins(1, 10); // Charger la première page avec 10 pèlerins
        console.log('Réponse API reçue :', response);
        const { success, data } = response;
        if (success && Array.isArray(data)) {
          console.log('Données validées, mise à jour de pelerins.');
          setPelerins(data);
        } else {
          console.error('Format inattendu dans la réponse API :', response);
          setError('Format de données inattendu.');
        }
      } catch (err) {
        console.error('Erreur lors du chargement des données :', err.message || err);
        setError('Impossible de charger les données.');
      } finally {
        console.log('Fin du fetchData pour AnnuaireAdmin.');
        setLoading(false);
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
        !loading && <p>Aucun pèlerin trouvé.</p>
      )}
    </div>
  );
};

export default AnnuaireAdmin;
