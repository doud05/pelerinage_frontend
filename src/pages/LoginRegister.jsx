import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext); // Fonction de connexion
  const navigate = useNavigate(); // Hook pour naviguer après connexion

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      alert('Connexion réussie !');

      // Redirection en fonction du rôle utilisateur
      if (user.role === 'pelerin') navigate('/dashboard/pelerin');
      else if (user.role === 'gestionnaire') navigate('/dashboard/gestionnaire');
      else if (user.role === 'admin') navigate('/dashboard/admin');
      else throw new Error('Rôle utilisateur inconnu.');
    } catch (error) {
      alert('Erreur : ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>{isRegister ? 'Inscription' : 'Connexion'}</h2>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">{isRegister ? "S'inscrire" : 'Se connecter'}</button>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? 'Déjà un compte ? Connectez-vous'
            : "Pas de compte ? Inscrivez-vous"}
        </button>
      </form>
    </div>
  );
};

export default LoginRegister;
