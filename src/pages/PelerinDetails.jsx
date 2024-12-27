import React, { useState } from 'react';
import { updatePelerin } from '../services/api';

const PelerinDetailsPage = ({ pelerin, onUpdate }) => {
  const [formData, setFormData] = useState({ ...pelerin });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      await updatePelerin(pelerin.id, formData);
      alert('Mise à jour réussie !');
      onUpdate(); // Rafraîchit les données
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err.response?.data || err.message);
      setError('Erreur lors de la mise à jour. Vérifiez les champs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Détails du pèlerin</h1>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Bloc 1 : Informations générales */}
      <section>
        <h2>Informations générales</h2>
        <input type="text" name="photo" value={formData.photo || ''} onChange={handleChange} placeholder="Photo (URL)" />
        <input type="text" name="titre" value={formData.titre || ''} onChange={handleChange} placeholder="Titre" />
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
        <input type="date" name="date_naissance" value={formData.date_naissance || ''} onChange={handleChange} />
        <input type="text" value={formData.age || ''} disabled placeholder="Âge (calculé)" />
        <input type="text" name="lieu_naissance" value={formData.lieu_naissance || ''} onChange={handleChange} placeholder="Lieu de naissance" />
        <input type="text" name="metier" value={formData.metier || ''} onChange={handleChange} placeholder="Métier" />
        <input type="text" name="nationalite" value={formData.nationalite || ''} onChange={handleChange} placeholder="Nationalité" />
      </section>

      {/* Bloc 2 : Adresse */}
      <section>
        <h2>Adresse</h2>
        <input type="text" name="adresse_ligne1" value={formData.adresse_ligne1 || ''} onChange={handleChange} placeholder="Adresse ligne 1" />
        <input type="text" name="adresse_ligne2" value={formData.adresse_ligne2 || ''} onChange={handleChange} placeholder="Adresse ligne 2" />
        <input type="text" name="code_postal" value={formData.code_postal || ''} onChange={handleChange} placeholder="Code postal" />
        <input type="text" name="ville" value={formData.ville || ''} onChange={handleChange} placeholder="Ville" />
        <input type="text" name="pays" value={formData.pays || ''} onChange={handleChange} placeholder="Pays" />
      </section>

      {/* Bloc 3 : Contact */}
      <section>
        <h2>Contact</h2>
        <input type="email" name="mail" value={formData.mail || ''} onChange={handleChange} placeholder="Email" />
        <input type="text" name="telephone_fixe" value={formData.telephone_fixe || ''} onChange={handleChange} placeholder="Téléphone fixe" />
        <input type="text" name="telephone_portable" value={formData.telephone_portable || ''} onChange={handleChange} placeholder="Téléphone portable" />
      </section>

      {/* Ajoutez les autres blocs ici de manière similaire */}

      {/* Boutons d'action */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleUpdate} disabled={loading}>Mettre à jour</button>
      </div>
    </div>
  );
};

export default PelerinDetailsPage;
