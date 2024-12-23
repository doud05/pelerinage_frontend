import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister ? '/auth/register' : '/auth/login';

    try {
      const payload = isRegister
        ? { email, password, prenom, nom, date_naissance: dateNaissance }
        : { email, password };

      const { data } = await axios.post(`https://resa.pelerinagesdegap.fr/api${url}`, payload);

      localStorage.setItem('token', data.token);
      const role = data.user.role;
      navigate(`/dashboard/${role}`);
    } catch (error) {
      console.error('Erreur :', error.response?.data || error.message);
      alert('Une erreur est survenue.');
    }
  };

  return (
    <div>
      <h2>{isRegister ? 'Inscription' : 'Connexion'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Email :</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Mot de passe :</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {isRegister && (
          <>
            <label>Prénom :</label>
            <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
            <label>Nom :</label>
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
            <label>Date de Naissance :</label>
            <input type="date" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} required />
          </>
        )}
        <button type="submit">{isRegister ? "S'inscrire" : 'Se connecter'}</button>
        <button type="button" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Déjà un compte ? Connectez-vous' : "Pas de compte ? Inscrivez-vous"}
        </button>
      </form>
    </div>
  );
};

export default LoginRegister;
