import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

const AgregarCategoria = ({ open, onClose, onGuardar }) => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = () => {
    if (!nombre.trim()) {
      alert('El nombre es obligatorio.');
      return;
    }
    onGuardar({ nombre: nombre.trim() });
    setNombre('');
  };

  const handleClose = () => {
    onClose();
    setNombre('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: 'orange', backgroundColor: '#1A2229' }}>
        Agregar Categoría
      </DialogTitle>
      <DialogContent style={{ backgroundColor: '#1A2229', color: 'white' }}>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
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

export default AgregarCategoria;
