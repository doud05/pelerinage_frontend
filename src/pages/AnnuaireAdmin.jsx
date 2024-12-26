import React, { useState, useEffect } from 'react';
import { getPelerins } from '../services/api';

const AnnuaireAdmin = () => {
  const [pelerins, setPelerins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPelerins = async () => {
      setLoading(true);
      try {
        const { data } = await getPelerins(1, 10);
        setPelerins(data.data || []);
      } catch (error) {
        setError('Erreur lors du chargement des pèlerins.');
      } finally {
        setLoading(false);
      }
    };

    fetchPelerins();
  }, []);

  return (
    <div>
      <h1>Annuaire des Pèlerins</h1>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {pelerins.map((p) => (
          <li key={p.id}>
            {p.nom} {p.prenom}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnuaireAdmin;
