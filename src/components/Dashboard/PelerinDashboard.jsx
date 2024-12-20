import React, { useContext, useEffect, useState } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';

const PelerinDashboard = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:9100/api/reservations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setReservations(data.reservations);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Bienvenue, {user?.name || 'Pèlerin'} !</h1>

      {/* Informations utilisateur */}
      <section className="bg-lightgray p-4 rounded-lg shadow-card mb-6">
        <h2 className="text-lg font-bold">Vos informations</h2>
        <p>Email : {user?.email}</p>
        <p>Rôle : {user?.role}</p>
      </section>

      {/* Réservations */}
      <section>
        <h2 className="text-lg font-bold mb-4">Vos réservations</h2>
        {reservations.length > 0 ? (
          <ul className="space-y-4">
            {reservations.map((res) => (
              <li
                key={res.id}
                className="bg-beige p-4 rounded-lg shadow-card hover:bg-terracotta"
              >
                <p>Pèlerinage : {res.pelerinage}</p>
                <p>Statut : {res.status}</p>
                <p>Date : {new Date(res.date).toLocaleDateString()}</p>
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
