import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPelerinById, updatePelerin, deletePelerin } from '../services/api';

const PelerinDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPelerin = async () => {
      try {
        const response = await getPelerinById(id);
        if (response.success) {
          const data = response.data;
          setFormData({
            ...data,
            date_naissance: data.date_naissance || '',
          });
        } else {
          setError('Impossible de charger les détails du pèlerin.');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération du pèlerin :', err.message || err);
        setError('Erreur lors de la récupération des données.');
      } finally {
        setLoading(false);
      }
    };
    fetchPelerin();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Données envoyées au backend :', formData);
      await updatePelerin(id, formData);
      alert('Mise à jour réussie !');
      navigate('/annuaire');
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err.message || err);
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce pèlerin ?')) return;
    setLoading(true);
    setError(null);
    try {
      await deletePelerin(id);
      alert('Pèlerin supprimé avec succès !');
      navigate('/annuaire');
    } catch (err) {
      console.error('Erreur lors de la suppression :', err.message || err);
      setError('Erreur lors de la suppression.');
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (date) => {
    return date ? date.split('/').reverse().join('-') : '';
  };

  const formatDateForBackend = (date) => {
    return date ? date.split('-').reverse().join('/') : '';
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

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
        <input type="text" name="nom" value={formData.nom || ''} onChange={handleChange} placeholder="Nom" required />
        <input type="text" name="prenom" value={formData.prenom || ''} onChange={handleChange} placeholder="Prénom" required />
        <input
          type="date"
          name="date_naissance"
          value={formatDateForInput(formData.date_naissance)}
          onChange={(e) => {
            handleChange({ target: { name: 'date_naissance', value: formatDateForBackend(e.target.value) } });
          }}
        />
        <input type="text" value={formData.age || ''} disabled placeholder="Âge (calculé automatiquement)" />
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

      {/* Bloc 4 : Contact d’urgence */}
      <section>
        <h2>Contact d’urgence</h2>
        <input type="text" name="contact_urgence_nom" value={formData.contact_urgence_nom || ''} onChange={handleChange} placeholder="Nom" />
        <input type="text" name="contact_urgence_prenom" value={formData.contact_urgence_prenom || ''} onChange={handleChange} placeholder="Prénom" />
        <input type="text" name="contact_urgence_telephone" value={formData.contact_urgence_telephone || ''} onChange={handleChange} placeholder="Téléphone" />
      </section>

      {/* Bloc 5 : Contact des parents */}
      <section>
        <h2>Contact des parents</h2>
        <input type="text" name="pere_nom" value={formData.pere_nom || ''} onChange={handleChange} placeholder="Nom du père" />
        <input type="text" name="pere_prenom" value={formData.pere_prenom || ''} onChange={handleChange} placeholder="Prénom du père" />
        <input type="text" name="pere_telephone" value={formData.pere_telephone || ''} onChange={handleChange} placeholder="Téléphone du père" />
        <input type="email" name="mail_pere" value={formData.mail_pere || ''} onChange={handleChange} placeholder="Email du père" />
        <input type="text" name="mere_nom" value={formData.mere_nom || ''} onChange={handleChange} placeholder="Nom de la mère" />
        <input type="text" name="mere_prenom" value={formData.mere_prenom || ''} onChange={handleChange} placeholder="Prénom de la mère" />
        <input type="text" name="mere_telephone" value={formData.mere_telephone || ''} onChange={handleChange} placeholder="Téléphone de la mère" />
        <input type="email" name="mail_mere" value={formData.mail_mere || ''} onChange={handleChange} placeholder="Email de la mère" />
      </section>

      {/* Bloc 6 : Documents d’identité */}
      <section>
        <h2>Documents d’identité</h2>
        <input type="text" name="carte_identite_numero" value={formData.carte_identite_numero || ''} onChange={handleChange} placeholder="Numéro" />
        <input type="text" name="carte_identite_autorite_delivrance" value={formData.carte_identite_autorite_delivrance || ''} onChange={handleChange} placeholder="Autorité de délivrance" />
        <input
          type="date"
          name="carte_identite_date_delivrance"
          value={formatDateForInput(formData.carte_identite_date_delivrance)}
          onChange={(e) => {
            handleChange({ target: { name: 'carte_identite_date_delivrance', value: formatDateForBackend(e.target.value) } });
          }}
        />
        <input
          type="date"
          name="carte_identite_date_validite"
          value={formatDateForInput(formData.carte_identite_date_validite)}
          onChange={(e) => {
            handleChange({ target: { name: 'carte_identite_date_validite', value: formatDateForBackend(e.target.value) } });
          }}
        />

        {/* Ajoutez ici d'autres blocs pour Passeport et Titre de séjour de manière similaire */}
      </section>

      {/* Boutons d'action */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleUpdate} disabled={loading}>
          {loading ? 'Mise à jour...' : 'Mettre à jour'}
        </button>
        <button
          onClick={() => navigate('/annuaire')}
          style={{ marginLeft: '10px' }}
        >
          Retour
        </button>
        <button
          onClick={handleDelete}
          style={{ marginLeft: '10px', color: 'red' }}
          disabled={loading}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default PelerinDetailsPage;
