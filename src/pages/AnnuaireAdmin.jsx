import React, { useState, useEffect } from 'react';
import { getPelerins, searchPelerins, exportPelerins, importPelerins } from '../services/api';

const AnnuaireAdmin = () => {
  const [pelerins, setPelerins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Récupérer les pèlerins
  const fetchPelerins = async () => {
    setLoading(true);
    setError(null); // Réinitialiser les erreurs au début de chaque appel
    try {
      console.log(`Fetching pelerins: page=${page}, limit=${limit}`);
      const { data } = await getPelerins(page, limit);
      if (data && data.data) {
        setPelerins(data.data);
        console.log('Pèlerins récupérés :', data.data);
      } else {
        throw new Error('Données reçues invalides.');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des pèlerins :', err);
      setError('Impossible de charger les pèlerins. Veuillez réessayer plus tard.');
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
    setError(null);
    try {
      console.log(`Recherche de pelerins avec query="${searchQuery}"`);
      const { data } = await searchPelerins(searchQuery);
      if (data && data.data) {
        setPelerins(data.data);
        console.log('Résultats de recherche :', data.data);
      } else {
        throw new Error('Données reçues invalides.');
      }
    } catch (err) {
      console.error('Erreur lors de la recherche :', err);
      setError('Erreur lors de la recherche. Veuillez réessayer.');
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
      console.error('Erreur lors de l\'exportation :', err);
      alert('Erreur lors de l\'exportation. Veuillez réessayer.');
    }
  };

  // Importation de fichiers Excel
  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert('Veuillez sélectionner un fichier à importer.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Importation de fichier Excel...');
      await importPelerins(formData);
      alert('Importation réussie.');
      fetchPelerins(); // Recharger les données après importation
    } catch (err) {
      console.error('Erreur lors de l\'importation :', err);
      alert('Erreur lors de l\'importation. Veuillez vérifier votre fichier.');
    }
  };

  // Charger les pèlerins à chaque changement de page ou de limite
  useEffect(() => {
    try {
      fetchPelerins();
    } catch (err) {
      console.error('Erreur dans useEffect :', err);
    }
  }, [page, limit]);

  return (
    <div>
      <h1>Annuaire des Pèlerins</h1>

      {/* Actions Import/Export */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleExport}>Exporter</button>
        <label>
          <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Importer</span>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Recherche */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>

      {/* Affichage des pèlerins */}
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={loading}
          style={{ marginRight: '10px' }}
        >
          Précédent
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
          style={{ marginRight: '10px' }}
        >
          Suivant
        </button>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          style={{ padding: '5px' }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default AnnuaireAdmin;
