import React, { useEffect, useState } from 'react';
import { getPelerins } from '../services/api';

const AnnuaireAdmin = () => {
  const [pelerins, setPelerins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Composant AnnuaireAdmin monté.');
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getPelerins(1, 10); // Charger la première page avec 10 pèlerins
        const { data } = response;
        if (Array.isArray(data)) {
          setPelerins(data); // Mettre à jour les pèlerins si data est un tableau
        } else {
          console.error('Données reçues dans un format inattendu :', data);
          setError('Format de données inattendu.');
        }
        console.log('Données récupérées depuis l’API :', data);
      } catch (err) {
        console.error('Erreur lors du chargement des données :', err);
        setError('Impossible de charger les données.');
      } finally {
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
                <td>{pelerin.telephone_portable || pelerin.telephone_fixe}</td>
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
