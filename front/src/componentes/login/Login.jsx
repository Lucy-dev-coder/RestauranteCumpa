import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Solo para actualizar el estado, sin ninguna acción
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-container">
      <FaUser size={80} />
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
