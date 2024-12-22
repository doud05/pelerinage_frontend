import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, registerUser } = useContext(AuthContext); // Accès aux fonctions du contexte
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        console.log('Tentative d’inscription avec :', { email, password });
        const response = await registerUser({ email, password });
        console.log('Réponse du register :', response);
        alert('Inscription réussie !');
        setIsRegister(false); // Passe en mode connexion après inscription
      } else {
        console.log('Tentative de connexion avec :', { email, password });
        const response = await loginUser({ email, password });
        console.log('Réponse du login :', response);

        // Validation avant redirection
        if (!response.user || !response.user.role) {
          throw new Error('Utilisateur ou rôle introuvable.');
        }

        console.log('Redirection vers :', `/dashboard/${response.user.role}`);
        navigate(`/dashboard/${response.user.role}`);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission :', error.message);
      alert(`Erreur : ${error.message}`);
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
        <button type="button" onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? 'Déjà un compte ? Connectez-vous'
            : "Pas de compte ? Inscrivez-vous"}
        </button>
      </form>
    </div>
  );
};

export default LoginRegister;
