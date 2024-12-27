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
        const { data } = await getPelerins(1, 10); // Charger la première page avec 10 pèlerins
        setPelerins(data);
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
        !loading && <p>Aucun pèlerin trouvé.</p>
      )}
    </div>
  );
};

export default AnnuaireAdmin;
