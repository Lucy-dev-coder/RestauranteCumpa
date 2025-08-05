import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './componentes/login/Login';
import Usuario from './componentes/usuarios/Usuario';
import Sidebar from './componentes/sidebar/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar opcional */}
        <Sidebar />

        <div style={{ flex: 1, padding: '10px' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
