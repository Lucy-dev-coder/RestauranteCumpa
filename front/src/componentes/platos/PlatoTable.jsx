import React, { useState } from 'react';
import {
  Container, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosAuth from '../../api/axiosConfig'; // Ajusta ruta según tu estructura
import imagenes from '../../api/apiConfig'; // Ajusta ruta según tu estructura
// Ajusta esta URL base según dónde estén alojadas las imágenes en tu backend
const URL_IMAGENES_BASE = imagenes;

const PlatoTable = ({ platos, onAgregar, onEditar, onEliminar, onToggleEstado }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const filteredPlatos = platos.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPlatos = filteredPlatos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const toggleEstado = async (plato) => {
    try {
      await axiosAuth.put(`/platos/${plato.id}`, {
        estado: !plato.estado // cambia el valor
      });
      fetchPlatos(); // vuelve a cargar los datos para ver el cambio
    } catch (error) {
      console.error("Error al cambiar estado", error);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Container maxWidth={false} style={{ padding: '20px' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={onAgregar}
        style={{ padding: 10, marginBottom: 10 }}
        startIcon={<AddIcon />}
      >
        Agregar Plato
      </Button>

      <TextField
        fullWidth
        margin="normal"
        label="Buscar plato"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputLabelProps={{ style: { color: 'white' } }}
        InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
      />

      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table className="table bgdark" style={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Imagen</TableCell> {/* Nueva columna */}
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedPlatos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No hay platos
                </TableCell>
              </TableRow>
            ) : (
              paginatedPlatos.map((plato) => (
                <TableRow key={plato.id}>
                  <TableCell>{plato.id}</TableCell>
                  <TableCell>
                    {plato.imagen ? (
                      <img
                        src={`${URL_IMAGENES_BASE}${plato.imagen}`}
                        alt={plato.nombre}
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                      />
                    ) : (
                      <span style={{ color: '#999' }}>Sin imagen</span>
                    )}
                  </TableCell>
                  <TableCell>{plato.nombre}</TableCell>
                  <TableCell>{Number(plato.precio).toFixed(2)}</TableCell>
                  <TableCell>{plato.categoria ? plato.categoria.nombre : '-'}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => onToggleEstado(plato)}
                      style={{
                        marginLeft: '8px',
                        backgroundColor: plato.estado ? 'green' : 'crimson',
                        color: 'white',
                        padding: '4px 10px',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      {plato.estado ? 'Habilitado' : 'Deshabilitado'}
                    </button>
                  </TableCell>


                  <TableCell>
                    <Button
                      onClick={() => onEditar(plato)}
                      color="primary"
                      variant="contained"
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      style={{ marginLeft: '10px' }}
                      onClick={() => onEliminar(plato.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Eliminar
                    </Button>

                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[6, 10, 25]}
        component="div"
        count={filteredPlatos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: 'white' }}
      />
    </Container>
  );
};

export default PlatoTable;
