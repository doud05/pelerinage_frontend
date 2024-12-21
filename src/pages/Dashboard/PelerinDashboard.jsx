import React, { useContext, useEffect, useState } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';

const PelerinDashboard = () => {
  const { user } = useContext(AuthContext);   
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://resa.pelerinagesdegap.fr/api/reservations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        setReservations(data.reservations || []); // Assurez-vous que `data.reservations` existe
      } catch (err) {
        console.error('Erreur lors de la récupération des réservations :', err);
        setError('Impossible de récupérer les réservations. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">
        Bienvenue, {user?.name || user?.email || 'Pèlerin'} !
      </h1>

      {/* Informations utilisateur */}
      <section className="bg-lightgray p-4 rounded-lg shadow-card mb-6">
        <h2 className="text-lg font-bold">Vos informations</h2>
        <p>Email : {user?.email || 'Non disponible'}</p>
        <p>Rôle : {user?.role || 'Non disponible'}</p>
      </section>

      {/* Réservations */}
      <section>
        <h2 className="text-lg font-bold mb-4">Vos réservations</h2>
        {loading ? (
          <p>Chargement des réservations...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : reservations.length > 0 ? (
          <ul className="space-y-4">
            {reservations.map((res) => (
              <li
                key={res.id}
                className="bg-beige p-4 rounded-lg shadow-card hover:bg-terracotta"
              >
                <p>Pèlerinage : {res.pelerinage || 'Non spécifié'}</p>
                <p>Statut : {res.status || 'Non spécifié'}</p>
                <p>Date : {res.date ? new Date(res.date).toLocaleDateString() : 'Non spécifiée'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune réservation trouvée.</p>
        )}
      </section>
    </DashboardLayout>
  );
};

export default PelerinDashboard;
