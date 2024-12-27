import React, { useState, useEffect } from 'react';
import { getPelerins, searchPelerins, exportPelerins, importPelerins } from '../services/api';
import PelerinDetails from './PelerinDetails'; // Nouveau composant pour afficher les détails

const AnnuaireAdmin = () => {
  const [pelerins, setPelerins] = useState([]);
  const [selectedPelerin, setSelectedPelerin] = useState(null); // Pèlerin sélectionné
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1); 
  const [limit, setLimit] = useState(25);

  // Fonction pour récupérer les pèlerins
  const fetchPelerins = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPelerins(page, limit);
      if (response.success && Array.isArray(response.data)) {
        setPelerins(response.data);
      } else {
        setError('Format inattendu des données reçues.');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des pèlerins :', err.message || err);
      setError('Erreur lors du chargement des pèlerins.');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer la recherche
  const handleSearch = async () => {
    if (!searchQuery) {
      fetchPelerins();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await searchPelerins(searchQuery);
      if (response.success && Array.isArray(response.data)) {
        setPelerins(response.data);
      } else {
        setError('Format inattendu des données reçues lors de la recherche.');
      }
    } catch (err) {
      console.error('Erreur lors de la recherche :', err.message || err);
      setError('Erreur lors de la recherche.');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour exporter les pèlerins
  const handleExport = async () => {
    try {
      await exportPelerins(); // API déclenche le téléchargement
      alert('Exportation réussie !');
    } catch (err) {
      console.error('Erreur lors de l\'exportation :', err.message || err);
      alert('Erreur lors de l\'exportation.');
    }
  };

  // Fonction pour importer les pèlerins
  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await importPelerins(formData);
      if (response.success) {
        alert('Importation réussie !');
        fetchPelerins();
      } else {
        alert('Erreur lors de l\'importation.');
      }
    } catch (err) {
      console.error('Erreur lors de l\'importation :', err.message || err);
      alert('Une erreur s\'est produite.');
    }
  };

  // Charger les données lors du montage et du changement de page/limite
  useEffect(() => {
    fetchPelerins();
  }, [page, limit]);

  return (
    <div style={{ backgroundColor: 'lightblue', padding: '20px' }}>
      <h1>Annuaire des Pèlerins</h1>

      {/* Actions Import/Export */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleExport} style={{ marginRight: '10px' }}>Exporter</button>
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

      {/* Barre de recherche */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>

      {/* Tableau des pèlerins */}
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && pelerins.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left', marginBottom: '20px', cursor: 'pointer' }}>
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
              <tr key={pelerin.id} onClick={() => setSelectedPelerin(pelerin)}>
                <td>{pelerin.nom}</td>
                <td>{pelerin.prenom}</td>
                <td>{pelerin.mail}</td>
                <td>{pelerin.telephone_portable || 'N/A'}</td>
                <td>{pelerin.ville || 'N/A'}</td>
                <td>{pelerin.commandes?.[0]?.statut || 'Aucune'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && !error && <p>Aucun pèlerin trouvé.</p>
      )}

      {/* Pagination */}
      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Précédent
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
        >
          Suivant
        </button>
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

      {/* Détails du pèlerin */}
      {selectedPelerin && (
        <PelerinDetails
          pelerin={selectedPelerin}
          onClose={() => setSelectedPelerin(null)}
          onUpdate={() => {
            fetchPelerins();
            setSelectedPelerin(null);
          }}
        />
      )}
    </div>
  );
};

export default AnnuaireAdmin;
