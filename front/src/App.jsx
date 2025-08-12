import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Login from './componentes/login/Login';
import Usuario from './componentes/usuarios/Usuario';
import Sidebar from './componentes/sidebar/Sidebar';
import './App.css';
import Categoria from './componentes/categorias/categoria';
import Plato from './componentes/platos/Plato';
import Bebida from './componentes/bebidas/Bebidas';
import Caja from './componentes/caja/Caja';
import Ventas from './componentes/ventas/Venta';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div>
      {/* Mostrar sidebar solo si no es login */}
      {!isLoginPage && <Sidebar />}

      {/* Si no es login, aplicar main-content */}
      <div className={!isLoginPage ? "main-content" : ""}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/plato" element={<Plato />} />
          <Route path="/bebida" element={<Bebida />} />
          <Route path="/caja" element={<Caja />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
