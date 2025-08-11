import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

const EditarCaja = ({ open, caja, onClose, onGuardar }) => {
  const [fechaCierre, setFechaCierre] = useState('');
  const [montoCierre, setMontoCierre] = useState('');
  const [estado, setEstado] = useState('abierta');
  const [observaciones, setObservaciones] = useState('');
  const [errorMonto, setErrorMonto] = useState('');

  useEffect(() => {
    if (caja) {
      setFechaCierre(caja.fecha_cierre || '');
      setMontoCierre(caja.monto_cierre ?? '');
      setEstado(caja.estado || 'abierta');
      setObservaciones(caja.observaciones || '');
    }
  }, [caja]);

  const handleSubmit = () => {
    if (!montoCierre || isNaN(montoCierre) || Number(montoCierre) <= 0) {
      setErrorMonto('El monto de cierre es obligatorio y debe ser un número positivo.');
      return;
    } else {
      setErrorMonto(''); // limpia el error si pasa validación
    }

    if (estado !== 'abierta' && estado !== 'cerrada') {
      alert('El estado debe ser "abierta" o "cerrada".');
      return;
    }

    onGuardar(caja.id, {
      fecha_cierre: fechaCierre || null,
      monto_cierre: Number(montoCierre),
      estado,
      observaciones: observaciones.trim() || null
    });
  };


  const handleClose = () => {
    onClose();
    setFechaCierre('');
    setMontoCierre('');
    setEstado('abierta');
    setObservaciones('');
    setErrorMonto('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: 'orange', backgroundColor: '#1A2229' }}>
        Editar Caja
      </DialogTitle>
      <DialogContent style={{ backgroundColor: '#1A2229', color: 'white' }}>

        <TextField
          margin="dense"
          label="Monto de Cierre"
          type="number"
          fullWidth
          value={montoCierre}
          onChange={(e) => {
            setMontoCierre(e.target.value);
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
          Confirmar Cierre
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarCaja;
