import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axiosAuth from '../../api/axiosConfig'; // Ajusta ruta según tu estructura
import './Login.css';
import { useNavigate } from 'react-router-dom';  // <-- cambia aquí

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // <-- inicializas el hook

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedUsername && savedRememberMe) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire('Error', 'Por favor completa todos los campos', 'warning');
      return;
    }

    setLoading(true);

    try {
      const res = await axiosAuth.post('/login', {
        email: username,
        password: password,
      });

      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('usuario', JSON.stringify(res.data.user));

      if (rememberMe) {
        localStorage.setItem('username', username);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('username');
        localStorage.setItem('rememberMe', 'false');
      }

      // Aquí la redirección según rol
      if (res.data.user.rol === 'cajero') {
        navigate('/caja');
      } else if (res.data.user.rol === 'admin') {
        navigate('/usuario'); // o dashboard, lo que uses para admin
      } else {
        // Para otros roles, si hay, o redirigir a login con mensaje
        navigate('/login');
        Swal.fire('Acceso Denegado', 'No tienes permisos para acceder', 'error');
      }
    } catch (error) {
      Swal.fire(
        'Error',
        error.response?.data?.message || 'Error al iniciar sesión',
        'error'
      );
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <label style={{ fontSize: '14px' }}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={loading}
          />{' '}
          Recuérdame
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};

export default Login;
