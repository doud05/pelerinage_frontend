// src/pages/PelerinDetails.jsx
import React, { useState } from 'react';
import { updatePelerin, deletePelerin } from '../services/api';

const PelerinDetails = ({ pelerin, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(pelerin);
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
      onUpdate(); // Appelle la fonction de rafraîchissement
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err.message || err);
      setError('Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Voulez-vous vraiment supprimer ce pèlerin ?')) {
      try {
        await deletePelerin(pelerin.id);
        alert('Pèlerin supprimé avec succès.');
        onUpdate(); // Appelle la fonction de rafraîchissement
      } catch (err) {
        console.error('Erreur lors de la suppression :', err.message || err);
        alert('Erreur lors de la suppression.');
      }
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div style={{ backgroundColor: 'white', margin: '50px auto', padding: '20px', width: '80%', maxWidth: '600px' }}>
        <h2>Détails du pèlerin</h2>
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form>
          <div>
            <label>Nom :</label>
            <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
          </div>
          <div>
            <label>Prénom :</label>
            <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
          </div>
          <div>
            <label>Email :</label>
            <input type="email" name="mail" value={formData.mail} onChange={handleChange} />
          </div>
          {/* Ajoutez d'autres champs nécessaires ici */}
        </form>
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleUpdate} disabled={loading}>Mettre à jour</button>
          <button onClick={handleDelete} disabled={loading} style={{ marginLeft: '10px' }}>Supprimer</button>
          <button onClick={onClose} style={{ marginLeft: '10px' }}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default PelerinDetails;
