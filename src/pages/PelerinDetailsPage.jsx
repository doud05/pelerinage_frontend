import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPelerinById, updatePelerin } from '../services/api';

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
          setFormData(response.data);
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
      await updatePelerin(id, formData);
      alert('Mise à jour réussie !');
      navigate('/annuaire');
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err.message || err);
      setError('Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
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
        <h3>Carte d’identité</h3>
        <input type="text" name="carte_identite_numero" value={formData.carte_identite_numero || ''} onChange={handleChange} placeholder="Numéro" />
        <input type="text" name="carte_identite_autorite_delivrance" value={formData.carte_identite_autorite_delivrance || ''} onChange={handleChange} placeholder="Autorité de délivrance" />
        <input type="date" name="carte_identite_date_delivrance" value={formData.carte_identite_date_delivrance || ''} onChange={handleChange} />
        <input type="date" name="carte_identite_date_validite" value={formData.carte_identite_date_validite || ''} onChange={handleChange} />

        <h3>Passeport</h3>
        <input type="text" name="passeport_numero" value={formData.passeport_numero || ''} onChange={handleChange} placeholder="Numéro" />
        <input type="text" name="passeport_autorite_delivrance" value={formData.passeport_autorite_delivrance || ''} onChange={handleChange} placeholder="Autorité de délivrance" />
        <input type="date" name="passeport_date_delivrance" value={formData.passeport_date_delivrance || ''} onChange={handleChange} />
        <input type="date" name="passeport_date_validite" value={formData.passeport_date_validite || ''} onChange={handleChange} />

        <h3>Titre de séjour</h3>
        <input type="text" name="titre_sejour_numero" value={formData.titre_sejour_numero || ''} onChange={handleChange} placeholder="Numéro" />
        <input type="text" name="titre_sejour_autorite_delivrance" value={formData.titre_sejour_autorite_delivrance || ''} onChange={handleChange} placeholder="Autorité de délivrance" />
        <input type="date" name="titre_sejour_date_delivrance" value={formData.titre_sejour_date_delivrance || ''} onChange={handleChange} />
        <input type="date" name="titre_sejour_date_validite" value={formData.titre_sejour_date_validite || ''} onChange={handleChange} />
      </section>

      {/* Bloc 7 : Autres informations */}
      <section>
        <h2>Autres informations</h2>
        <input type="text" name="categorie" value={formData.categorie || ''} onChange={handleChange} placeholder="Catégorie" />
        <textarea name="commentaire" value={formData.commentaire || ''} onChange={handleChange} placeholder="Commentaire"></textarea>
      </section>

       {/* Boutons d'action */}
      <div style={{ marginTop: '20px' }}>
        <button type="button" onClick={handleUpdate} disabled={loading}>
          {loading ? 'Mise à jour...' : 'Mettre à jour'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/annuaire')}
          style={{ marginLeft: '10px' }}
        >
          Retour
        </button>
      </div>
    </div>
  );
};


export default PelerinDetailsPage;
