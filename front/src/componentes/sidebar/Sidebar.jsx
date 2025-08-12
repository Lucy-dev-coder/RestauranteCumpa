import React, { useState, useEffect, use } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import {
  FaTachometerAlt, FaUsers, FaTags, FaCloudDownloadAlt,
  FaBars, FaUser, FaSignOutAlt
} from 'react-icons/fa';
import { FaCashRegister } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GiChickenOven } from 'react-icons/gi';
import Swal from 'sweetalert2';
import axiosAuth from '../../api/axiosConfig'; // Ajusta la ruta según tu estructura

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  useEffect(() => {
    const checkIsMobile = () => {
      const mobileCheck = window.innerWidth < 768;
      setIsMobile(mobileCheck);
      setIsOpen(!mobileCheck); // Sidebar abierto en PC, cerrado en móvil
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);

    // Si quieres redirigir si no hay token:
    if (!t) {
      navigate('/'); // o ruta login
    }
  }, [navigate]);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axiosAuth.post('/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/'); // redirige sin recargar
    } catch (error) {
      Swal.fire('Error', 'No se pudo cerrar sesión', 'error');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <div className="top-navbar">
        <FaBars className="navbar-icon" onClick={toggleSidebar} />
        <div className="user-info">
          <FaUser className="navbar-icon" />
          <span className="user-text">Rol: Usuario</span>
        </div>
        <div
          className="logout-info"
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
          title="Cerrar sesión"
        >
          <FaSignOutAlt className="navbar-icon" />
          <span className="logout-text">Cerrar sesión</span>
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
            <li>
              <NavLink to="/dashboard" exact="true" activeclassname="active" onClick={handleLinkClick}>
                <FaTachometerAlt /> &nbsp;Dashboard
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
                <GiChickenOven /> &nbsp;Bebidas
              </NavLink>
            </li>
            <li>
              <NavLink to="/caja" activeclassname="active" onClick={handleLinkClick}>
                <FaCashRegister /> &nbsp;Caja
              </NavLink>
            </li>
            <li>
              <NavLink to="/ventas" activeclassname="active" onClick={handleLinkClick}>
                <FaCashRegister /> &nbsp; Ventas
              </NavLink>

            </li>
            <li>
              <NavLink to="/backup" activeclassname="active" onClick={handleLinkClick}>
                <FaCloudDownloadAlt /> &nbsp;Backup
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
