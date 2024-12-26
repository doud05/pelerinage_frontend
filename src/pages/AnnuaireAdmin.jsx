import React, { useState, useEffect } from 'react';
import { getPelerins, searchPelerins, exportPelerins, importPelerins } from '../services/api';

const AnnuaireAdmin = () => {
  const [pelerins, setPelerins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    console.log('Montage du composant AnnuaireAdmin.');
    fetchPelerins();
  }, [page, limit]);

  const fetchPelerins = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Appel API: getPelerins(page=${page}, limit=${limit})`);
      const { data } = await getPelerins(page, limit);
      if (data?.data) {
        console.log('Données récupérées :', data.data);
        setPelerins(data.data);
      } else {
        throw new Error('Données non valides.');
      }
    } catch (error) {
      console.error('Erreur API :', error);
      setError('Impossible de charger les pèlerins. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Annuaire des Pèlerins</h1>
      <div>
        <button onClick={handleExport}>Exporter</button>
        <label>
          <span>Importer</span>
          <input type="file" accept=".xlsx" onChange={handleImport} style={{ display: 'none' }} />
        </label>
      </div>
      <div>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
