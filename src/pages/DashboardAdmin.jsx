import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.VITE_API_URL}/utilisateurs`);
        setUsers(response.data.data); // Assurez-vous que la clé correspond à votre API
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des utilisateurs.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fonction pour mettre à jour le rôle
  const updateRole = async (userId, newRole) => {
    try {
      await axios.put(`${process.env.VITE_API_URL}/utilisateurs/${userId}`, { role: newRole });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
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
                <button onClick={() => updateRole(user.id, user.role)}>
                  Mettre à jour
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardAdmin;
