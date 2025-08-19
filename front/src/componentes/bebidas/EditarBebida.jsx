import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

const EditarBebida = ({ open, bebida, onClose, onGuardar }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    if (bebida) {
      setNombre(bebida.nombre || '');
      setPrecio(bebida.precio ?? '');
      setStock(bebida.stock ?? '');
      setImagen(null);
    } else {
      setNombre('');
      setPrecio('');
      setStock('');
      setImagen(null);
    }
  }, [bebida]);

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
    formData.append('stock', stock || 0);
    if (imagen) formData.append('imagen', imagen);

    onGuardar(bebida.id, formData);
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
        Editar Bebida
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
        {/* <TextField
          margin="dense"
          label="Stock"
          type="number"
          fullWidth
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
          helperText="Cantidad en inventario (opcional)"
        /> */}


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
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarBebida;
