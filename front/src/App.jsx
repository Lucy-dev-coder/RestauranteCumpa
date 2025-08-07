import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Login from './componentes/login/Login';
import Usuario from './componentes/usuarios/Usuario';
import Sidebar from './componentes/sidebar/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// Componente que maneja la lógica de mostrar u ocultar el sidebar
function MainLayout() {
  const location = useLocation();
  
  // Si estás en login (ruta "/"), ocultamos el sidebar
  const isLoginPage = location.pathname === "/";

  return (
    <div style={{ display: 'flex' }}>
      {!isLoginPage && <Sidebar />}

      <div style={{ flex: 1, padding: '10px' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
