import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import {
  FaTachometerAlt, FaUsers, FaTags, FaCloudDownloadAlt,
  FaBars, FaUser, FaSignOutAlt, FaCashRegister,
  FaGlassCheers, FaShoppingCart, FaClipboardList
} from 'react-icons/fa';
import { GiChickenOven } from 'react-icons/gi';
import Swal from 'sweetalert2';
import axiosAuth from '../../api/axiosConfig';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768); // abierto en PC, cerrado móvil
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStorage = localStorage.getItem('usuario');
    if (!token || !userStorage) {
      navigate('/'); // redirigir si no está autenticado
      return;
    }
    setUsuario(JSON.parse(userStorage));
  }, [navigate]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLinkClick = () => { if (isMobile) setIsOpen(false); };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axiosAuth.post('/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      navigate('/login');
    } catch (error) {
      Swal.fire('Error', 'No se pudo cerrar sesión', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) return null; // O spinner mientras carga

  // Mostrar links según rol
  const isAdmin = usuario.rol === 'admin';
  const isCajero = usuario.rol === 'cajero';

  return (
    <div className="container">
      <div className="top-navbar">
        <FaBars className="navbar-icon" onClick={toggleSidebar} />
        <div className="user-info">
          <span className="user-text">User: {usuario.name}</span>&nbsp;
          <FaUser className="navbar-icon" />
          <span className="user-text">Rol: {usuario.rol}</span>
        </div>
        <div
          className="logout-info"
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
          title="Cerrar sesión"
        >
          <FaSignOutAlt className="navbar-icon" />
          <span className="logout-text">{loading ? 'Cerrando...' : 'Cerrar sesión'}</span>
        </div>
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <GiChickenOven style={{ fontSize: '56px', marginBottom: '5px' }} />
          <h2 style={{ margin: 0 }}>El Cumpa</h2>
        </div>
        <hr />
        <br />
        <nav className="nav-links">
          <ul>
            {isAdmin && (
              <>
                <li>
                  <NavLink to="/dashboard" exact="true" activeclassname="active" onClick={handleLinkClick}>
                    <FaTachometerAlt /> &nbsp;Reportes
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/usuario" activeclassname="active" onClick={handleLinkClick}>
                    <FaUsers /> &nbsp;Usuarios
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/categoria" activeclassname="active" onClick={handleLinkClick}>
                    <FaTags /> &nbsp;Categorias
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/plato" activeclassname="active" onClick={handleLinkClick}>
                    <GiChickenOven /> &nbsp;Platos
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/bebida" activeclassname="active" onClick={handleLinkClick}>
                    <FaGlassCheers /> &nbsp;Bebidas
                  </NavLink>
                </li>
              </>
            )}

            {(isAdmin || isCajero) && (
              <>
                <li>
                  <NavLink to="/caja" activeclassname="active" onClick={handleLinkClick}>
                    <FaCashRegister /> &nbsp;Caja
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ventas" activeclassname="active" onClick={handleLinkClick}>
                    <FaShoppingCart /> &nbsp;Ventas
                  </NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <li>
                <NavLink to="/registro" activeclassname="active" onClick={handleLinkClick}>
                  <FaClipboardList /> &nbsp;Registros
                </NavLink>
              </li>)}
            {/* {isAdmin && (
              <li>
                <NavLink to="/backup" activeclassname="active" onClick={handleLinkClick}>
                  <FaCloudDownloadAlt /> &nbsp;Backup
                </NavLink>
              </li>
            )} */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
