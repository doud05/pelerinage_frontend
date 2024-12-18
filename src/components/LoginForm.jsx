import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Mot de passe</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginForm;
