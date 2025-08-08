import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, InputLabel, Select, MenuItem, FormControl
} from '@mui/material';

import axiosAuth from '../../api/axiosConfig';

const AgregarBebida = ({ open, onClose, onGuardar }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState(null);



  const handleSubmit = () => {
    if (!nombre.trim()) {
      alert('El nombre es obligatorio.');
      return;
    }
    if (!precio || isNaN(precio) || Number(precio) < 0) {
      alert('El precio debe ser un número positivo o cero.');
      return;
    }
    if (stock && (isNaN(stock) || Number(stock) < 0 || !Number.isInteger(Number(stock)))) {
      alert('El stock debe ser un número entero positivo o cero.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre.trim());
    formData.append('precio', precio);
    formData.append('stock', stock ? Number(stock) : 0);
    formData.append('estado', '1');  // enviando como string '1'
    if (imagen) formData.append('imagen', imagen);

    onGuardar(formData);

    // Limpiar campos
    setNombre('');
    setPrecio('');
    setStock('');
    setImagen(null);
  };


  const handleClose = () => {
    onClose();
    setNombre('');
    setPrecio('');
    setStock('');
    setImagen(null);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: 'orange', backgroundColor: '#1A2229' }}>
        Agregar Bebida
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
        <TextField
          margin="dense"
          label="Precio"
          type="number"
          fullWidth
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
        />
        <TextField
          margin="dense"
          label="Stock"
          type="number"
          fullWidth
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
          helperText="Cantidad en inventario (opcional)"
        />

        

        <input
          accept="image/*"
          type="file"
          style={{ marginTop: 16, color: 'white' }}
          onChange={(e) => setImagen(e.target.files[0])}
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

export default AgregarBebida;
