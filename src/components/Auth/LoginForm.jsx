import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext); // Accéder au contexte d'authentification

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-offwhite shadow-card p-6 rounded-lg"
    >
      <h2 className="text-xl font-classic text-brick mb-4">Connexion</h2>
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
      <button
        type="submit"
        className="bg-brick text-offwhite py-2 px-4 rounded-lg hover:bg-terracotta transition"
      >
        Se connecter
      </button>
    </form>
  );
};

export default LoginForm;
