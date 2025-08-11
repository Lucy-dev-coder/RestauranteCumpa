import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Button,
  List,
  ListItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import axios from 'axios';
import './CarritoModal.css';
import axiosAuth from '../../api/axiosConfig';
export default function CarritoModal({
  open,
  onClose,
  carrito,
  eliminarDelCarrito,
  limpiarCarrito,
  cajaId = 1, // puedes pasar este prop desde el padre si tienes
  usuarioId = null, // opcional si tienes usuario logueado
}) {
  const [mesa, setMesa] = useState('');
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [loadingEnvio, setLoadingEnvio] = useState(false);
  const [error, setError] = useState(null);

  const total = carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 0)), 0);
  const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);

  const handleConfirmarPedido = async () => {
    if (!mesa) {
      setError('Por favor, ingresa el número de mesa.');
      return;
    }
    setLoadingEnvio(true);
    setError(null);

    try {
      const payload = {
        caja_id: cajaId,
        usuario_id: usuarioId,
        total: total,
        mesa: mesa,
        metodo_pago: metodoPago,
        items: carrito.map(item => ({
          tipo: item.tipo,
          id: item.id || null,
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio,
          observacion: item.observacion || null,
        })),
      };

     
const response = await axiosAuth.post('/ventas', payload);
      console.log('Venta registrada:', response.data);

      // Limpiar carrito y cerrar modal
      limpiarCarrito();
      setMesa('');
      setMetodoPago('efectivo');
      onClose();

    } catch (e) {
      console.error('Error enviando pedido:', e);
      setError('Error al enviar el pedido. Intenta de nuevo.');
    } finally {
      setLoadingEnvio(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="carrito-modal-overlay">
      <Box className="carrito-modal-container">

        {/* HEADER */}
        <Box className="carrito-header">
          <Box className="carrito-header-left">
            <ShoppingCartIcon className="carrito-header-icon" />
            <Box>
              <Typography className="carrito-title">Carrito de Compras</Typography>
              <Typography className="carrito-subtitle">
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'} seleccionados
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} className="carrito-close-btn">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* BODY */}
        <Box className="carrito-body">
          {carrito.length === 0 ? (
            <Box className="carrito-empty">
              <span className="carrito-empty-icon">🛒</span>
              <Typography className="carrito-empty-title">Tu carrito está vacío</Typography>
              <Typography className="carrito-empty-subtitle">Agrega algunos productos para continuar</Typography>
            </Box>
          ) : (
            <>
              {/* LISTA DE PRODUCTOS */}
              <Box className="carrito-productos-header">
                <RestaurantMenuIcon className="productos-icon" />
                <Typography className="productos-title">Productos seleccionados</Typography>
              </Box>

              <List className="carrito-productos-list">
                {carrito.map(item => (
                  <ListItem
                    key={`${item.id}-${item.nombre}`}
                    className="carrito-producto-item"
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => eliminarDelCarrito(item)}
                        className="delete-btn"
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    }
                  >
                    <Box sx={{ flexGrow: 1, ml: 2 }}>
                      {/* Primera fila: nombre, cantidad y precio */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        <Typography className="producto-nombre" sx={{ flex: 1 }}>
                          {item.nombre}
                        </Typography>

                        <Typography className="producto-cantidad" sx={{ width: '90px', textAlign: 'center' }}>
                          x{item.cantidad}
                        </Typography>

                        <Typography className="producto-precio" sx={{ width: '100px', textAlign: 'right' }}>
                          Bs. {(item.precio * item.cantidad).toFixed(2)}
                        </Typography>
                      </Box>

                      {/* Segunda fila: observación, si existe */}
                      {item.observacion && (
                        <Typography
                          className="producto-observacion"
                          variant="caption"
                          sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ffa008' }}
                        >
                          📝 {item.observacion}
                        </Typography>
                      )}
                    </Box>
                  </ListItem>
                ))}
              </List>

              {/* TOTAL */}
              <Box className="total-row">
                <Typography className="total-label" sx={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>
                  Total:
                </Typography>
                <Typography
                  className="total-value"
                  sx={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}
                >
                  Bs. {total.toFixed(2)}
                </Typography>
              </Box>

              {/* FORMULARIO */}
              <Box className="carrito-form">
                <TextField
                  label="Número de Mesa"
                  variant="outlined"
                  fullWidth
                  value={mesa}
                  onChange={(e) => setMesa(e.target.value)}
                  className="mesa-input"
                />
                <TextField
                  select
                  label="Método de Pago"
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                  fullWidth
                  className="pago-select"
                >
                  <MenuItem value="efectivo">Efectivo</MenuItem>
                  <MenuItem value="qr">QR</MenuItem>
                </TextField>
              </Box>

              {/* BOTÓN */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="confirmar-btn"
                onClick={handleConfirmarPedido}
                disabled={loadingEnvio || carrito.length === 0 || !mesa}
              >
                {loadingEnvio ? 'Enviando...' : 'Confirmar Pedido'}
              </Button>

              {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
