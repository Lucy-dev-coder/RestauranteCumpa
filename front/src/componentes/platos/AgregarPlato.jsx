import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, InputLabel, Select, MenuItem, FormControl
} from '@mui/material';

import axiosAuth from '../../api/axiosConfig';

const AgregarPlato = ({ open, onClose, onGuardar }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null);
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);

  // Traer categorías para el select
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await axiosAuth.get('/categorias');
        setCategorias(res.data);
      } catch (error) {
        console.error('Error al obtener categorías', error);
      }
    };
    if (open) obtenerCategorias();
  }, [open]);

  const handleSubmit = () => {
    if (!nombre.trim()) {
      alert('El nombre es obligatorio.');
      return;
    }
    if (!precio || isNaN(precio) || Number(precio) <= 0) {
      alert('El precio debe ser un número positivo.');
      return;
    }
    if (!categoriaId) {
      alert('Debe seleccionar una categoría.');
      return;
    }

    // Preparar objeto FormData para enviar imagen junto a datos
    const formData = new FormData();
    formData.append('nombre', nombre.trim());
    formData.append('precio', precio);
    formData.append('categoria_id', categoriaId);
    if (imagen) formData.append('imagen', imagen);

    onGuardar(formData);

    // Limpiar campos
    setNombre('');
    setPrecio('');
    setCategoriaId('');
    setImagen(null);
  };

  const handleClose = () => {
    onClose();
    setNombre('');
    setPrecio('');
    setCategoriaId('');
    setImagen(null);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: 'orange', backgroundColor: '#1A2229' }}>
        Agregar Plato
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

        <FormControl fullWidth margin="dense" style={{ color: 'white' }}>
          <InputLabel style={{ color: 'white' }}>Categoría</InputLabel>
          <Select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            label="Categoría"
            style={{ color: 'white', border: '1px solid orange' }}
          >
            <MenuItem value="">
              <em>Seleccione una categoría</em>
            </MenuItem>
            {categorias.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>{cat.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>

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

export default AgregarPlato;
