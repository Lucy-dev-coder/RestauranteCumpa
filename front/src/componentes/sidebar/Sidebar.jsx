import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { 
  FaTachometerAlt, FaUsers, FaDollarSign, FaBox, FaClipboardList, FaFileInvoice, 
  FaShoppingCart, FaTools, FaCog, FaLaptop, FaBars, FaUser, FaSignOutAlt, FaTags, FaCloudDownloadAlt 
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
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
        <div className="logout-info">
          <FaSignOutAlt className="navbar-icon" />
          <span className="logout-text">Cerrar sesión</span>
        </div>
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <FaLaptop style={{ fontSize: '56px', marginBottom: '5px' }} />
          <h1 style={{ margin: 0 }}>DROID-PC</h1>
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
              <NavLink to="/producto" activeclassname="active" onClick={handleLinkClick}>
                <FaBox /> &nbsp;Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/cotizador" activeclassname="active" onClick={handleLinkClick}>
                <FaClipboardList /> &nbsp;Cotizaciones/Ventas
              </NavLink>
            </li>
            <li>
              <NavLink to="/registroCotizacion" activeclassname="active" onClick={handleLinkClick}>
                <FaFileInvoice /> &nbsp;Registro de cotizaciones
              </NavLink>
            </li>
            <li>
              <NavLink to="/registroVenta" activeclassname="active" onClick={handleLinkClick}>
                <FaShoppingCart /> &nbsp;Registro de ventas
              </NavLink>
            </li>
            <li>
              <NavLink to="/metodosPago" activeclassname="active" onClick={handleLinkClick}>
                <FaDollarSign /> &nbsp;Metodos de pago
              </NavLink>
            </li>
            <li>
              <NavLink to="/soporteTecnico" activeclassname="active" onClick={handleLinkClick}>
                <FaTools /> &nbsp;Soporte Técnico
              </NavLink>
            </li>
            <li>
              <NavLink to="/ajusteweb" activeclassname="active" onClick={handleLinkClick}>
                <FaCog /> &nbsp;Ajustes de página
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
