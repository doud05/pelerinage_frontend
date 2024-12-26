import React, { useState, useEffect } from 'react';
import { getPelerins, searchPelerins, exportPelerins, importPelerins } from '../services/api';

const AnnuaireAdmin = () => {
  const [pelerins, setPelerins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetch initial des pèlerins
  const fetchPelerins = async () => {
    setLoading(true);
    try {
      console.log(`Fetching pelerins: page=${page}, limit=${limit}`);
      const { data } = await getPelerins(page, limit);
      setPelerins(data.data);
      console.log('Pèlerins récupérés:', data.data);
    } catch (err) {
      console.error('Erreur lors du chargement des pèlerins:', err);
      setError('Erreur lors du chargement des pèlerins.');
    } finally {
      setLoading(false);
    }
  };

  // Recherche de pèlerins
  const handleSearch = async () => {
    if (!searchQuery) {
      fetchPelerins();
      return;
    }

    setLoading(true);
    try {
      console.log(`Recherche de pelerins avec query="${searchQuery}"`);
      const { data } = await searchPelerins(searchQuery);
      setPelerins(data.data);
      console.log('Résultats de recherche:', data.data);
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setError('Erreur lors de la recherche.');
    } finally {
      setLoading(false);
    }
  };

  // Exportation des pèlerins
  const handleExport = async () => {
    try {
      console.log('Exportation des pèlerins...');
      await exportPelerins();
      alert('Exportation réussie.');
    } catch (err) {
      console.error('Erreur lors de l\'exportation:', err);
      alert('Erreur lors de l\'exportation.');
    }
  };

  // Importation de fichiers Excel
  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Importation de fichier Excel...');
      await importPelerins(formData);
      alert('Importation réussie.');
      fetchPelerins(); // Recharger les données après importation
    } catch (err) {
      console.error('Erreur lors de l\'importation:', err);
      alert('Erreur lors de l\'importation.');
    }
  };

  // Charger les pèlerins à chaque changement de page ou de limite
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

      {/* Affichage des pèlerins */}
      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}
      {pelerins.length > 0 ? (
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
      ) : (
        !loading && <p>Aucun pèlerin trouvé.</p>
      )}

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
