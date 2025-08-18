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
import imagenes from '../../api/apiConfig'; // Ajusta ruta según tu estructura
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const BASE_URL_STORAGE = imagenes;

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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error', // puede ser error, warning, info, success
  });


  // Obtener usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    fetchData();
  }, []);
  const mostrarErrorCantidad = (mensaje) => {
    setSnackbar({
      open: true,
      message: mensaje,
      severity: 'error',
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [platosRes, bebidasRes, categoriasRes] = await Promise.all([
        axiosAuth.get('/platos'),
        axiosAuth.get('/bebidas'),
        axiosAuth.get('/categorias'),
      ]);
      setPlatos(platosRes.data.map(p => ({ ...p, cantidad: '', observacion: '', estado: Boolean(p.estado) })));
      setBebidas(bebidasRes.data.map(b => ({ ...b, cantidad: '' })));
      setCategorias(categoriasRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
    setCarrito(prev =>
      prev.filter(item => !(item.id === producto.id && item.tipo === producto.tipo))
    );

    if (producto.tipo === 'plato') {
      setPlatos(prev =>
        prev.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: '', observacion: '' }
            : p
        )
      );
    } else if (producto.tipo === 'bebida') {
      setBebidas(prev =>
        prev.map(b =>
          b.id === producto.id
            ? { ...b, cantidad: '' }
            : b
        )
      );
    }
  };

  const productosFiltrados = () => {
    const term = searchTerm.trim().toLowerCase();

    const platosMarcados = platos
      .filter(p =>
        p.nombre.toLowerCase().includes(term) &&
        (!categoriaSeleccionada || p.categoria_id === categoriaSeleccionada)
      )
      .map(p => ({ ...p, tipo: 'plato' }));

    const bebidasMarcadas = bebidas
      .filter(b => b.nombre.toLowerCase().includes(term))
      .map(b => ({ ...b, tipo: 'bebida' }));

    if (term !== '') {
      // Buscar muestra ambos tipos
      return [...platosMarcados, ...bebidasMarcadas];
    }

    // Sin búsqueda, respetar pestañas
    return tabValue === 0 ? platosMarcados : bebidasMarcadas;
  };


  const actualizarStockBebidas = (itemsVendidos) => {
    setBebidas(prevBebidas => {
      return prevBebidas.map(bebida => {
        const itemVendido = itemsVendidos.find(
          item => item.tipo === 'bebida' && item.id === bebida.id
        );
        if (itemVendido) {
          // Reducir stock según cantidad vendida
          return { ...bebida, stock: bebida.stock - itemVendido.cantidad };
        }
        return bebida;
      });
    });
  };


  const renderProducto = (producto, tipo) => {
  const deshabilitado = !Boolean(producto.estado);

  return (
    <Card
      key={`${tipo}-${producto.id}`}
      className="producto-card"
      sx={{
        opacity: deshabilitado ? 0.5 : 1,
        pointerEvents: deshabilitado ? 'none' : 'auto',
        transition: 'opacity 0.3s',
      }}
    >
      <Box className="producto-img-container">
        <img
          src={`${BASE_URL_STORAGE}${producto.imagen}`}
          alt={producto.nombre}
          className="producto-img"
          loading="lazy"
        />
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
          height: tipo === 'plato' ? 230 : 180,
          padding: '12px 16px',
        }}
        className="producto-content"
      >
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

          {tipo === 'bebida' ? (
            <Box className="bebida-info" title={`Stock disponible: ${producto.stock}`}>
              <Typography className="precio-bebida">
                Bs.{typeof producto.precio === 'number' || !isNaN(Number(producto.precio))
                  ? Number(producto.precio).toFixed(2)
                  : '0.00'}
              </Typography>

              <Box className={`stock-badge ${producto.stock <= 5 ? 'stock-bajo' : ''}`}>
                <Inventory2Icon
                  className="stock-icon"
                  sx={{ color: producto.stock <= 5 ? '#c62828' : '#2e7d32' }}
                />
                <Typography className="stock-text">
                  {producto.stock}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography className="precio-plato">
              Bs.{typeof producto.precio === 'number' || !isNaN(Number(producto.precio))
                ? Number(producto.precio).toFixed(2)
                : '0.00'}
            </Typography>
          )}
        </Box>

        {!deshabilitado ? (
          <>
            <TextField
              label="Cantidad"
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              value={producto.cantidad || ''}
              onChange={e => {
                const cant = e.target.value === '' ? '' : parseInt(e.target.value);

                if (tipo === 'bebida') {
                  if (cant > producto.stock) {
                    mostrarErrorCantidad(`Cantidad máxima disponible: ${producto.stock}`);
                    return;
                  }
                  setBebidas(prev => prev.map(b => b.id === producto.id ? { ...b, cantidad: cant } : b));
                  actualizarCarrito({ ...producto, tipo }, cant);

                } else {
                  setPlatos(prev => prev.map(p => p.id === producto.id ? { ...p, cantidad: cant } : p));
                  actualizarCarrito({ ...producto, tipo }, cant, producto.observacion || '');
                }
              }}
              inputProps={{ min: 0 }}
              className="cantidad-input"
            />

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
          </>
        ) : (
          <Typography sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}>
            Producto deshabilitado
          </Typography>
        )}

      </CardContent>
    </Card>
  );
};


  return (
    <>
      {loading ? (
        <Box className="loading-container">
          <Spinner />
        </Box>
      ) : (
        <>
          <Typography className="ventas-title">
            Sistema de Ventas
          </Typography>

          <Box className="tabs-sticky-container">
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              centered
              className="ventas-tabs"
            >
              <Tab label="🍽️ Platos" className="ventas-tab" />
              <Tab label="🥤 Bebidas" className="ventas-tab" />
            </Tabs>
          </Box>

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
              className="search-input resaltado-label"
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
                className="categoria-select resaltado-label"
              >
                <MenuItem value="">Todas las categorías</MenuItem>
                {categorias.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </MenuItem>
                ))}
              </TextField>
            )}

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
          </Box>



          {productosFiltrados().length === 0 ? (
            <Box className="empty-state">
              <Box className="empty-icon">🔍</Box>
              <Typography className="empty-title">
                No se encontraron productos
              </Typography>
              <Typography className="empty-subtitle">
                Intenta con otros términos de búsqueda o ajusta los filtros
              </Typography>
            </Box>
          ) : (
            <Box className={searchTerm.trim() ? "grid-mixta" : tabValue === 0 ? "grid-platos" : "grid-bebidas"
            }
            >
              {productosFiltrados().map((item) =>
                renderProducto(item, item.tipo)
              )}
            </Box>
          )}

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
            limpiarCarrito={() => {
              setCarrito([]);
              setPlatos(prev => prev.map(p => ({ ...p, cantidad: '', observacion: '' })));
              setBebidas(prev => prev.map(b => ({ ...b, cantidad: '' })));
            }}
            usuarioId={usuario?.id}
            actualizarStockBebidas={actualizarStockBebidas}
          />
        </>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          mt: 38, // margen superior para que no choque con el header o borde superior
          '& .MuiSnackbarContent-root': {
            minWidth: 300,
            maxWidth: '90vw',
            borderRadius: 2,
            boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
            fontSize: '1.1rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            textAlign: 'center',
          },
        }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            padding: '12px 16px',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
