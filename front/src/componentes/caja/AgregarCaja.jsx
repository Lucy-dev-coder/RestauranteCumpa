import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

const AgregarCaja = ({ open, onClose, onGuardar }) => {
  const [montoApertura, setMontoApertura] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [errorMonto, setErrorMonto] = useState(''); // estado para error

  const handleSubmit = () => {
    if (!montoApertura || isNaN(montoApertura) || Number(montoApertura) <= 0) {
      setErrorMonto('El monto de apertura es obligatorio y debe ser un número positivo.');
      return;
    } else {
      setErrorMonto('');
    }

    onGuardar({
      monto_apertura: Number(montoApertura),
      observaciones: observaciones.trim() || null
    });

    setMontoApertura('');
    setObservaciones('');
  };

  const handleClose = () => {
    onClose();
    setMontoApertura('');
    setObservaciones('');
    setErrorMonto('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: 'orange', backgroundColor: '#1A2229' }}>
        Agregar Caja
      </DialogTitle>
      <DialogContent style={{ backgroundColor: '#1A2229', color: 'white' }}>
        <TextField
          autoFocus
          margin="dense"
          label="Monto de Apertura"
          type="number"
          fullWidth
          value={montoApertura}
          onChange={(e) => {
            setMontoApertura(e.target.value);
            if (errorMonto) setErrorMonto('');
          }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
          error={!!errorMonto}
          helperText={errorMonto}
        />
        <TextField
          margin="dense"
          label="Observaciones"
          type="text"
          fullWidth
          multiline
          rows={3}
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
        />
      </DialogContent>
      <DialogActions style={{ backgroundColor: '#1A2229' }}>
        <Button onClick={handleClose} color="error" variant="contained">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarCaja;
