import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Al montar el componente, revisa si hay datos guardados
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedUsername && savedRememberMe) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Guarda o borra el usuario según la opción "Recuérdame"
    if (rememberMe) {
      localStorage.setItem('username', username);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('username');
      localStorage.setItem('rememberMe', 'false');
    }

    // Aquí iría la lógica de autenticación real
    console.log('Iniciando sesión...');
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
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label style={{ fontSize: '14px' }}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          /> Recuérdame
        </label>

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
