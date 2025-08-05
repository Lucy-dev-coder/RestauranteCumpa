import React, { useState } from 'react';
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, TablePagination, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';

import './Usuario.css'; // Archivo CSS para estilos visuales

function App() {
  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    estado: 'activo',
    rol_id: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const roles = [
    { id: 1, rol: 'Administrador' },
    { id: 2, rol: 'Usuario' }
  ];

  const usuarios = [
    { id: 1, username: 'juan', estado: 'activo', rol_id: 1 },
    { id: 2, username: 'maria', estado: 'inactivo', rol_id: 2 },
    { id: 3, username: 'pedro', estado: 'activo', rol_id: 2 }
  ];

  const handleOpen = (usuario = null) => {
    if (usuario) {
      setEditando(usuario.id);
      setFormData({ ...usuario, password: '' });
    } else {
      setEditando(null);
      setFormData({ username: '', password: '', estado: 'activo', rol_id: '1' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditando(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsuarios = filteredUsuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth={false}>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Administración de Usuarios</h1>

      <Button
        variant="contained"
        color="success"
        onClick={() => handleOpen()}
        style={{ padding: 10 }}
      >
        Agregar Usuario
      </Button>

      <TextField
        fullWidth
        margin="normal"
        label="Buscar usuario"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputLabelProps={{ style: { color: 'white' } }}
        InputProps={{ style: { color: 'white', border: '1px solid aqua' } }}
      />

      <TableContainer component={Paper}>
        <Table className="table bgdark">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.username}</TableCell>
                <TableCell>{usuario.estado}</TableCell>
                <TableCell>{roles.find(role => role.id === usuario.rol_id)?.rol}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(usuario)} color="primary" variant="contained">Editar</Button>
                  <Button color="error" variant="contained" style={{ marginLeft: '10px' }}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[6, 10, 25]}
        component="div"
        count={filteredUsuarios.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: 'white' }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className='bgdark' style={{ color: 'aqua' }}>
          {editando ? 'Editar Usuario' : 'Agregar Usuario'}
        </DialogTitle>
        <DialogContent className='bgdark'>
          <form>
            <TextField
              autoFocus
              margin="dense"
              label="Usuario"
              type="text"
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white', border: '1px solid aqua' } }}
            />

            <TextField
              margin="dense"
              label="Contraseña"
              type="password"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white', border: '1px solid aqua' } }}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel id="rol-select-label" style={{ color: 'white' }}>Rol</InputLabel>
              <Select
                labelId="rol-select-label"
                name="rol_id"
                value={formData.rol_id}
                onChange={handleChange}
                style={{ color: 'white', border: '1px solid aqua' }}
                fullWidth
              >
                {roles.map((rol) => (
                  <MenuItem key={rol.id} value={rol.id} style={{ color: 'aqua', backgroundColor: '#1A2229' }}>
                    {rol.rol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel id="estado-select-label" style={{ color: 'white' }}>Estado</InputLabel>
              <Select
                labelId="estado-select-label"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                style={{ color: 'white', border: '1px solid aqua' }}
                fullWidth
              >
                <MenuItem value="activo" style={{ color: 'aqua', backgroundColor: '#1A2229' }}>Activo</MenuItem>
                <MenuItem value="inactivo" style={{ color: 'aqua', backgroundColor: '#1A2229' }}>Inactivo</MenuItem>
              </Select>
            </FormControl>

            <DialogActions>
              <Button onClick={handleClose} color="error" variant="contained">
                Cancelar
              </Button>
              <Button type="button" color="primary" variant="contained">
                {editando ? 'Actualizar' : 'Agregar'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default App;
