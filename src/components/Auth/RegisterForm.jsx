import React, { useState } from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('utilisateur');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:9100/api/utilisateurs/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('Inscription réussie:', data);
    } else {
      console.error(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="utilisateur">Utilisateur</option>
        <option value="admin">Administrateur</option>
      </select>
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default RegisterForm;
