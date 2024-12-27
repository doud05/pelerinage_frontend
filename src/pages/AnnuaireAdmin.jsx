import React, { useState, useEffect } from 'react';
import { getPelerins } from '../services/api';

const AnnuaireAdmin = () => {
  const [pelerins, setPelerins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Montage du composant AnnuaireAdmin.');
    const testAPI = async () => {
      try {
        console.log('Tentative de récupération des pèlerins...');
        const { data } = await getPelerins(1, 10);
        console.log('Réponse de l’API reçue :', data);
        if (data?.data) {
          setPelerins(data.data);
        } else {
          throw new Error('Réponse API invalide.');
        }
      } catch (err) {
        console.error('Erreur lors de l’appel API :', err);
        setError('Impossible de récupérer les données. Veuillez vérifier l’API.');
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h1>Annuaire des Pèlerins</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Ville</th>
          </tr>
        </thead>
        <tbody>
          {pelerins.map((p) => (
            <tr key={p.id}>
              <td>{p.nom}</td>
              <td>{p.prenom}</td>
              <td>{p.mail}</td>
              <td>{p.telephone_portable}</td>
              <td>{p.ville}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnuaireAdmin;
