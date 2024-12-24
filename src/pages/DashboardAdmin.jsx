import React, { useEffect, useState } from 'react';
import api from '../services/api';

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingStatistics, setLoadingStatistics] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);
  const [errorStatistics, setErrorStatistics] = useState(null);

  // Fetch des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const { data } = await api.get('/utilisateurs');
        setUsers(data.data);
      } catch (err) {
        setErrorUsers('Erreur lors du chargement des utilisateurs.');
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch des statistiques
  useEffect(() => {
    const fetchStatistics = async () => {
      setLoadingStatistics(true);
      try {
        const { data } = await api.get('/dashboard/admin/statistics');
        setStatistics(data.data);
      } catch (err) {
        setErrorStatistics('Erreur lors du chargement des statistiques.');
      } finally {
        setLoadingStatistics(false);
      }
    };
    fetchStatistics();
  }, []);

  // Mise à jour du rôle utilisateur
  const updateRole = async (userId, newRole) => {
    try {
      await api.put(`/utilisateurs/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
      );
      alert('Rôle mis à jour avec succès.');
    } catch (err) {
      alert('Erreur lors de la mise à jour du rôle.');
    }
  };

  return (
    <div>
      <h1>Tableau de bord Administrateur</h1>

      {/* Section des statistiques */}
      <section>
        <h2>Statistiques globales</h2>
        {loadingStatistics && <p>Chargement des statistiques...</p>}
        {errorStatistics && <p>{errorStatistics}</p>}
        {statistics ? (
          statistics.totalUsers === 0 && statistics.paymentsTotal === 0 ? (
            <p>Aucune donnée disponible pour les statistiques.</p>
          ) : (
            <div>
              <p>Total des utilisateurs : {statistics.totalUsers}</p>
              <p>Total des paiements : {statistics.paymentsTotal}€</p>
              <h3>Réservations par statut :</h3>
              <ul>
                {statistics.reservationsByStatus.map((statut) => (
                  <li key={statut.statut}>
                    {statut.statut} : {statut.count}
                  </li>
                ))}
              </ul>
            </div>
          )
        ) : (
          !loadingStatistics && <p>Impossible de charger les données des statistiques.</p>
        )}
      </section>

      {/* Section de gestion des utilisateurs */}
      <section>
        <h2>Gestion des utilisateurs</h2>
        {loadingUsers && <p>Chargement des utilisateurs...</p>}
        {errorUsers && <p>{errorUsers}</p>}
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Nom</th>
              <th>Rôle</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.nom}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => updateRole(user.id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="gestionnaire">Gestionnaire</option>
                    <option value="pelerin">Pèlerin</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => updateRole(user.id, user.role)}>Mettre à jour</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default DashboardAdmin;
