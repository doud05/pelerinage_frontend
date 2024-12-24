import React, { useEffect, useState } from 'react';
import api from '../services/api';

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/utilisateurs');
        setUsers(data.data);
      } catch (err) {
        setError('Erreur lors du chargement des utilisateurs.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

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
      <h1>Gestion des utilisateurs</h1>
      {loading && <p>Chargement des utilisateurs...</p>}
      {error && <p>{error}</p>}
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
    </div>
  );
};

export default DashboardAdmin;
