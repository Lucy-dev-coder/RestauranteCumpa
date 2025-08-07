import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

const roles = [
  { id: 'admin', rol: 'Administrador' },
  { id: 'cajero', rol: 'Cajero' }
];

const estados = [
  { id: 'habilitado', label: 'Habilitado' },
  { id: 'deshabilitado', label: 'Deshabilitado' }
];

const EditarUsuario = ({ open, onClose, usuario, onGuardar }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rol: 'cajero',
    estado: 'habilitado',
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        name: usuario.name || '',
        email: usuario.email || '',
        password: '',
        rol: usuario.rol || 'cajero',
        estado: usuario.estado || 'habilitado',
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }
    onGuardar(usuario.id, formData);
  };

  const handleClose = () => {
    onClose();
    setFormData({
      name: '',
      email: '',
      password: '',
      rol: 'cajero',
      estado: 'habilitado',
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: 'orange', backgroundColor: '#1A2229' }}>
        Editar Usuario
      </DialogTitle>
      <DialogContent style={{ backgroundColor: '#1A2229', color: 'white' }}>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
        />
        <TextField
          margin="dense"
          label="Nueva Contraseña (opcional)"
          type="password"
          fullWidth
          name="password"
          value={formData.password}
          onChange={handleChange}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel style={{ color: 'white' }}>Rol</InputLabel>
          <Select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            style={{ color: 'white', border: '1px solid orange' }}
          >
            {roles.map((r) => (
              <MenuItem
                key={r.id}
                value={r.id}
                style={{ color: 'orange', backgroundColor: '#1A2229' }}
              >
                {r.rol}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel style={{ color: 'white' }}>Estado</InputLabel>
          <Select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            style={{ color: 'white', border: '1px solid orange' }}
          >
            {estados.map((e) => (
              <MenuItem
                key={e.id}
                value={e.id}
                style={{ color: 'orange', backgroundColor: '#1A2229' }}
              >
                {e.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default EditarUsuario;
