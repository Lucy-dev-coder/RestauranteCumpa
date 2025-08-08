import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Login from './componentes/login/Login';
import Usuario from './componentes/usuarios/Usuario';
import Sidebar from './componentes/sidebar/Sidebar';
import './App.css';
import Categoria from './componentes/categorias/categoria'; // ajusta según tu estructura real

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
  const isLoginPage = location.pathname === "/";

  return (
    <div style={{ display: 'flex' }}>
      {!isLoginPage && <Sidebar />}

      <div style={{ flex: 1, padding: '10px' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/categoria" element={<Categoria />} /> {/* <-- aquí */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
