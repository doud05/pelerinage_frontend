import React, { useState } from 'react';

/**
 * Formulaire d'inscription avec gestion des états locaux et envoi des données à l'API.
 */
const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('utilisateur');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9100/api/utilisateurs/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Inscription réussie:', data);
      } else {
        console.error('Erreur lors de l\'inscription:', data.message);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-brick">Créer un compte</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brick focus:ring-brick sm:text-sm"
          placeholder="Votre email"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brick focus:ring-brick sm:text-sm"
          placeholder="Votre mot de passe"
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Rôle
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brick focus:ring-brick sm:text-sm"
        >
          <option value="utilisateur">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-brick text-white py-2 px-4 rounded-lg hover:bg-terracotta focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brick"
      >
        S'inscrire
      </button>
    </form>
  );
};

export default RegisterForm;
