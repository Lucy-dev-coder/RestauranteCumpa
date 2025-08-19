import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

const CambiarStockBebida = ({ open, bebida, onClose, onGuardar }) => {
  const [cantidad, setCantidad] = useState('');
  const [motivo, setMotivo] = useState('');

  useEffect(() => {
    if (bebida) {
      setCantidad('');
      setMotivo('');
    }
  }, [bebida]);

  const handleSubmit = () => {
    if (!cantidad || isNaN(cantidad) || !Number.isInteger(Number(cantidad))) {
      alert('La cantidad debe ser un número entero (positivo o negativo).');
      return;
    }
    // if (!motivo.trim()) {
    //   alert('El motivo es obligatorio.');
    //   return;
    // }

    // Construir datos a enviar
    const data = {
      stock: Number(cantidad),
      motivo: motivo.trim()
    };

    onGuardar(bebida.id, data);
  };

  const handleClose = () => {
    onClose();
    setCantidad('');
    setMotivo('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: 'orange', backgroundColor: '#1A2229' }}>
        Ajustar Stock de {bebida?.nombre}
      </DialogTitle>
      <DialogContent style={{ backgroundColor: '#1A2229', color: 'white' }}>
        <TextField
          autoFocus
          margin="dense"
          label="Cantidad (+/-)"
          type="number"
          fullWidth
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
          helperText="Ingrese un número positivo para entrada, negativo para salida"
        />
        <TextField
          margin="dense"
          label="Motivo(OPCIONAL)"
          type="text"
          fullWidth
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
          helperText="Describa el motivo del ajuste"
        />
      </DialogContent>
      <DialogActions style={{ backgroundColor: '#1A2229' }}>
        <Button onClick={handleClose} color="error" variant="contained">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CambiarStockBebida;
