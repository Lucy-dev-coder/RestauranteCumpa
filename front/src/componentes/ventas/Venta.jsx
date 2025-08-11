import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import axiosAuth from '../../api/axiosConfig';
import CarritoModal from './CarritoModal';
import './Ventas.css';
import Spinner from '../../componentes/spinner/Spinner'; 

const BASE_URL_STORAGE = 'http://localhost:8000/storage/';

export default function Ventas() {
  const [tabValue, setTabValue] = useState(0);
  const [platos, setPlatos] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); // inicio carga
    try {
      const [platosRes, bebidasRes, categoriasRes] = await Promise.all([
        axiosAuth.get('/platos'),
        axiosAuth.get('/bebidas'),
        axiosAuth.get('/categorias'),
      ]);
      setPlatos(platosRes.data.map(p => ({ ...p, cantidad: '', observacion: '' })));
      setBebidas(bebidasRes.data.map(b => ({ ...b, cantidad: '' })));
      setCategorias(categoriasRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // fin carga
    }
  };

  const handleChangeTab = (event, newValue) => setTabValue(newValue);

  const actualizarCarrito = (producto, cantidad, observacion = '') => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id && item.tipo === producto.tipo);
      if (cantidad === '' || cantidad === null || cantidad <= 0) {
        return prev.filter(item => !(item.id === producto.id && item.tipo === producto.tipo));
      }
      if (existe) {
        return prev.map(item =>
          item.id === producto.id && item.tipo === producto.tipo
            ? { ...item, cantidad, observacion }
            : item
        );
      }
      return [...prev, { ...producto, cantidad, observacion }];
    });
  };

  const eliminarDelCarrito = (producto) => {
    setCarrito(prev => prev.filter(item => !(item.id === producto.id && item.tipo === producto.tipo)));

    if (producto.tipo === 'plato') {
      setPlatos(prev => prev.map(p => p.id === producto.id ? { ...p, cantidad: '', observacion: '' } : p));
    } else {
      setBebidas(prev => prev.map(b => b.id === producto.id ? { ...b, cantidad: '' } : b));
    }
  };

  // Filtrado combinado para buscador y categorías
  const productosFiltrados = () => {
    const platosFiltrados = platos.filter(p =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!categoriaSeleccionada || p.categoria_id === categoriaSeleccionada)
    );
    const bebidasFiltradas = bebidas.filter(b =>
      b.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (tabValue === 0) return platosFiltrados;
    if (tabValue === 1) return bebidasFiltradas;
    return [];
  };

  const renderProducto = (producto, tipo) => (
    <Card key={`${tipo}-${producto.id}`} className="producto-card">
      <Box className="producto-img-container">
        <img
          src={`${BASE_URL_STORAGE}${producto.imagen}`}
          alt={producto.nombre}
          className="producto-img"
          loading="lazy"
        />
        {/* Badge de cantidad mejorado */}
        {producto.cantidad > 0 && (
          <Box className="cantidad-badge">
            {producto.cantidad} unid.
          </Box>
        )}
      </Box>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: tipo === 'plato' ? 230 : 160,
          padding: '12px 16px',
        }}
        className="producto-content"
      >
        {/* Contenedor dinámico nombre + observación */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: producto.observacion ? 'auto' : 'visible',
            mb: producto.observacion ? 1 : 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              fontSize: '1rem',
              fontWeight: 600,
              lineHeight: 1.3,
            }}
            className="producto-nombre"
          >
            {producto.nombre}
          </Typography>
        </Box>

        <TextField
          label="Cantidad"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          value={producto.cantidad || ''}
          onChange={e => {
            const cant = e.target.value === '' ? '' : parseInt(e.target.value);
            if (tipo === 'plato') {
              setPlatos(prev => prev.map(p => p.id === producto.id ? { ...p, cantidad: cant } : p));
              actualizarCarrito({ ...producto, tipo }, cant, producto.observacion || '');
            } else {
              setBebidas(prev => prev.map(b => b.id === producto.id ? { ...b, cantidad: cant } : b));
              actualizarCarrito({ ...producto, tipo }, cant);
            }
          }}
          inputProps={{ min: 0 }}
          className="cantidad-input"
        />
        
        {/* Solo mostrar observación en platos */}
        {tipo === 'plato' && (
          <TextField
            label="Observación"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={2}
            value={producto.observacion || ''}
            onChange={e => {
              const obs = e.target.value;
              setPlatos(prev => prev.map(p => p.id === producto.id ? { ...p, observacion: obs } : p));
              actualizarCarrito({ ...producto, tipo }, producto.cantidad || '', obs);
            }}
            sx={{ mt: 1 }}
            className="observacion-input"
            placeholder="Agregar observaciones..."
          />
        )}
      </CardContent>
    </Card>
  );

  return (
  <>
    {loading ? (
      <Box className="loading-container">
        <Spinner />
      </Box>
    ) : (
      <>
        {/* Header mejorado */}
        <Typography className="ventas-title">
          Sistema de Ventas
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          centered
          className="ventas-tabs"
        >
          <Tab label="🍽️ Platos" className="ventas-tab" />
          <Tab label="🥤 Bebidas" className="ventas-tab" />
        </Tabs>

        {/* Controles de filtro mejorados */}
        
          <Box className="controles-flex">
            <TextField
              fullWidth
              label="Buscar productos"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon className="search-icon" />,
              }}
              className="search-input"
            />

            {tabValue === 0 && (
              <TextField
                select
                label="Categoría"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                InputProps={{
                  startAdornment: <FilterListIcon className="filter-icon" />,
                }}
                className="categoria-select"
              >
                <MenuItem value="">Todas las categorías</MenuItem>
                {categorias.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Box>

          {/* Estadísticas rápidas */}
          <Box className="estadisticas-container">
            <Box className="estadistica-card">
              <Typography className="estadistica-label">
                Total Productos
              </Typography>
              <Typography className="estadistica-valor">
                {productosFiltrados().length}
              </Typography>
            </Box>

            {carrito.length > 0 && (
              <Box className="estadistica-card estadistica-carrito">
                <Typography className="estadistica-label">
                  En Carrito
                </Typography>
                <Typography className="estadistica-valor">
                  {carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0)}
                </Typography>
              </Box>
            )}
          </Box>
        

        {/* Grid de productos */}
        <Box className={tabValue === 0 ? "grid-platos" : "grid-bebidas"}>
          {productosFiltrados().map((item) =>
            renderProducto(item, tabValue === 0 ? "plato" : "bebida")
          )}
        </Box>

        {/* Estado vacío mejorado */}
        {productosFiltrados().length === 0 && (
          <Box className="empty-state">
            <Box className="empty-icon">🔍</Box>
            <Typography className="empty-title">
              No se encontraron productos
            </Typography>
            <Typography className="empty-subtitle">
              Intenta con otros términos de búsqueda o ajusta los filtros
            </Typography>
          </Box>
        )}

        {/* Botón carrito flotante mejorado */}
        <IconButton
          color="primary"
          className="boton-carrito-flotante"
          onClick={() => setModalOpen(true)}
        >
          <ShoppingCartIcon />
          {carrito.length > 0 && (
            <Box component="span" className="badge-carrito">
              {carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0)}
            </Box>
          )}
        </IconButton>

        <CarritoModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  carrito={carrito}
  eliminarDelCarrito={eliminarDelCarrito}
  limpiarCarrito={() => setCarrito([])}  // nueva prop
/>

      </>
    )}
  </>
);
};