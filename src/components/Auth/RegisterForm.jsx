import React, { useState } from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('utilisateur');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/utilisateurs/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Inscription réussie:', data);
      } else {
        console.error('Erreur:', data.message);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-offwhite shadow-card p-6 rounded-lg"
    >
      <h2 className="text-xl font-classic text-brick mb-4">Inscription</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-dark font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-lightgray rounded-lg p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-dark font-medium mb-1">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-lightgray rounded-lg p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="block text-dark font-medium mb-1">
          Rôle
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-lightgray rounded-lg p-2"
        >
          <option value="utilisateur">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-brick text-offwhite py-2 px-4 rounded-lg hover:bg-terracotta transition"
      >
        S'inscrire
      </button>
    </form>
  );
};

export default RegisterForm;
