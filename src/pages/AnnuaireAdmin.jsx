import React, { useState, useEffect } from 'react';
import { getPelerins, searchPelerins, exportPelerins, importPelerins } from '../services/api';

const AnnuaireAdmin = () => {
  const [pelerins, setPelerins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchPelerins = async () => {
    setLoading(true);
    try {
      const { data } = await getPelerins(page, limit);
      setPelerins(data.data);
    } catch (err) {
      setError('Erreur lors du chargement des pèlerins.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      fetchPelerins();
      return;
    }

    setLoading(true);
    try {
      const { data } = await searchPelerins(searchQuery);
      setPelerins(data.data);
    } catch (err) {
      setError('Erreur lors de la recherche.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      await exportPelerins(); // API pour déclencher le téléchargement
    } catch (err) {
      alert('Erreur lors de l\'exportation.');
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await importPelerins(formData); // API pour importer le fichier
      alert('Importation réussie.');
      fetchPelerins(); // Recharger la liste
    } catch (err) {
      alert('Erreur lors de l\'importation.');
    }
  };

  useEffect(() => {
    fetchPelerins();
  }, [page, limit]);

  return (
    <div>
      <h1>Annuaire des Pèlerins</h1>
      
      {/* Actions Import/Export */}
      <div>
        <button onClick={handleExport}>Exporter</button>
        <label>
          Importer
          <input
            type="file"
            accept=".xlsx"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Recherche */}
      <div>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>

      {/* Table des Pèlerins */}
      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Statut de la commande</th>
          </tr>
        </thead>
        <tbody>
          {pelerins.map((pelerin) => (
            <tr key={pelerin.id}>
              <td>{pelerin.nom}</td>
              <td>{pelerin.prenom}</td>
              <td>{pelerin.mail}</td>
              <td>{pelerin.telephone_portable}</td>
              <td>{pelerin.ville}</td>
              <td>{pelerin.commandes?.[0]?.statut || 'Aucune'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Précédent</button>
        <button onClick={() => setPage((prev) => prev + 1)}>Suivant</button>
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default AnnuaireAdmin;

