import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const { loginUser, registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        const payload = { email, password, prenom, nom, date_naissance: dateNaissance };
        await registerUser(payload);
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        setIsRegister(false);
      } else {
        const data = await loginUser({ email, password });
        navigate(`/dashboard/${data.user.role}`);
      }
    } catch (error) {
      console.error('Erreur :', error.message);
      alert(`Une erreur est survenue : ${error.message}`);
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
            <label>Date de Naissance (JJ/MM/AAAA) :</label>
            <input
              type="text"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              placeholder="JJ/MM/AAAA"
              required
            />
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
