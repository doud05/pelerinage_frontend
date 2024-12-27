import React, { useState } from 'react';
import { updatePelerin } from '../services/api';

const PelerinDetails = ({ pelerin, onClose, onUpdate }) => {
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
      onClose(); // Ferme la modale
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err.response?.data || err.message);
      setError('Erreur lors de la mise à jour. Vérifiez les champs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div style={{ backgroundColor: 'white', margin: '50px auto', padding: '20px', width: '90%', maxWidth: '800px' }}>
        <h2>Détails du pèlerin</h2>
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form>
          <div>
            <label>Photo :</label>
            <input type="text" name="photo" value={formData.photo || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Titre :</label>
            <input type="text" name="titre" value={formData.titre || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Nom :</label>
            <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
          </div>
          <div>
            <label>Prénom :</label>
            <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
          </div>
          <div>
            <label>Date de Naissance :</label>
            <input type="date" name="date_naissance" value={formData.date_naissance || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Lieu de Naissance :</label>
            <input type="text" name="lieu_naissance" value={formData.lieu_naissance || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Métier :</label>
            <input type="text" name="metier" value={formData.metier || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Nationalité :</label>
            <input type="text" name="nationalite" value={formData.nationalite || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Email :</label>
            <input type="email" name="mail" value={formData.mail || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Téléphone Fixe :</label>
            <input type="text" name="telephone_fixe" value={formData.telephone_fixe || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Téléphone Portable :</label>
            <input type="text" name="telephone_portable" value={formData.telephone_portable || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Adresse Ligne 1 :</label>
            <input type="text" name="adresse_ligne1" value={formData.adresse_ligne1 || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Adresse Ligne 2 :</label>
            <input type="text" name="adresse_ligne2" value={formData.adresse_ligne2 || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Code Postal :</label>
            <input type="text" name="code_postal" value={formData.code_postal || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Ville :</label>
            <input type="text" name="ville" value={formData.ville || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Pays :</label>
            <input type="text" name="pays" value={formData.pays || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Catégorie :</label>
            <input type="text" name="categorie" value={formData.categorie || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Commentaire :</label>
            <textarea name="commentaire" value={formData.commentaire || ''} onChange={handleChange}></textarea>
          </div>
        </form>

        <div style={{ marginTop: '20px' }}>
          <button onClick={handleUpdate} disabled={loading}>Mettre à jour</button>
          <button onClick={onClose} style={{ marginLeft: '10px' }}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default PelerinDetails;
