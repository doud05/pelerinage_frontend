import React, { useState, useEffect } from 'react';
import { getPelerins, searchPelerins, exportPelerins, importPelerins } from '../services/api';

const AnnuaireAdmin = () => {
  const [pelerins, setPelerins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Test API pour diagnostiquer le problème
  useEffect(() => {
    const testAPI = async () => {
      try {
        const response = await getPelerins(1, 10);
        console.log('Réponse de l’API :', response);
      } catch (error) {
        console.error('Erreur lors du test API :', error);
      }
    };
    testAPI();
  }, []);

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

  const handleExport = async () => {
    try {
      await exportPelerins();
      alert('Exportation réussie');
    } catch (error) {
      console.error('Erreur lors de l\'exportation :', error);
      alert('Échec de l\'exportation');
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await importPelerins(formData);
        alert('Importation réussie');
        fetchPelerins();
      } catch (error) {
        console.error('Erreur lors de l\'importation :', error);
        alert('Échec de l\'importation');
      }
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await searchPelerins(searchQuery);
      setPelerins(data.data);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
      setError('Impossible d’effectuer la recherche. Veuillez réessayer.');
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
