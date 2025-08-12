import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField
} from '@mui/material';
import Swal from 'sweetalert2';
import axiosAuth from '../../api/axiosConfig';

const MovimientosCaja = ({ open, onClose, tipoMovimiento, cajaId, onGuardado }) => {
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setMonto('');
      setDescripcion('');
      setLoading(false);
    }
  }, [open]);

  const handleGuardar = async () => {
    if (!monto || Number(monto) <= 0) {
      Swal.fire('Error', 'Ingrese un monto válido', 'error');
      return;
    }
    if (!descripcion.trim()) {
      Swal.fire('Error', 'Ingrese una descripción', 'error');
      return;
    }

    setLoading(true);
    try {
      await axiosAuth.post('/movimientos-caja', {
        caja_id: cajaId,
        tipo: tipoMovimiento,
        monto: Number(monto),
        descripcion,
      });
      Swal.fire('Éxito', `Movimiento ${tipoMovimiento} registrado`, 'success');
      onGuardado();
      onClose();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Error al guardar movimiento', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ color: 'orange', backgroundColor: '#1A2229' }}>{tipoMovimiento === 'ingreso' ? 'Agregar Ingreso' : 'Agregar Gasto'}</DialogTitle>
      <DialogContent style={{ color: 'orange', backgroundColor: '#1A2229' }}>
        <TextField
          label="Monto"
          type="number"
          fullWidth
          margin="normal"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
          autoFocus
        />
        <TextField
          label="Descripción"
          fullWidth
          margin="normal"
          multiline
          minRows={2}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
        />
      </DialogContent>
      <DialogActions style={{ color: 'orange', backgroundColor: '#1A2229' }}>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button onClick={handleGuardar} variant="contained" color="primary" disabled={loading}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovimientosCaja;
