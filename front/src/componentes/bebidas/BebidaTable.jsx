import React, { useState } from 'react';
import {
  Container, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
import imagenes from '../../api/apiConfig'; // Ajusta ruta según tu estructura
// Ajusta esta URL base según dónde estén alojadas las imágenes en tu backend
const URL_IMAGENES_BASE = imagenes;
const BebidaTable = ({ bebidas, onAgregar, onEditar, onEliminar, onToggleEstado, onCambiarStock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const filteredBebidas = bebidas.filter((b) =>
    b.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedBebidas = filteredBebidas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
        Agregar Bebida
      </Button>

      <TextField
        fullWidth
        margin="normal"
        label="Buscar bebida"
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
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedBebidas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hay bebidas
                </TableCell>
              </TableRow>
            ) : (
              paginatedBebidas.map((bebida) => (
                <TableRow key={bebida.id}>
                  <TableCell>{bebida.id}</TableCell>
                  <TableCell>
                    {bebida.imagen ? (
                      <img
                        src={`${URL_IMAGENES_BASE}${bebida.imagen}`}
                        alt={bebida.nombre}
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                      />
                    ) : (
                      <span style={{ color: '#999' }}>Sin imagen</span>
                    )}
                  </TableCell>
                  <TableCell>{bebida.nombre}</TableCell>
                  <TableCell>{Number(bebida.precio).toFixed(2)}</TableCell>
                  <TableCell>{bebida.stock ?? '-'}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => onToggleEstado(bebida)}
                      title='Cambiar estado'
                      style={{
                        marginLeft: '8px',
                        backgroundColor: bebida.estado ? 'green' : 'crimson',
                        color: 'white',
                        padding: '4px 10px',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      {bebida.estado ? 'Habilitado' : 'Deshabilitado'}
                    </button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onCambiarStock(bebida)}
                      title='Cambiar stock'
                      style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                      <ArrowCircleUp style={{ color: "green", marginRight: 4 }} />
                      <ArrowCircleDown style={{ color: "red" }} />
                    </Button>


                    <Button
                      onClick={() => onEditar(bebida)}
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
                      onClick={() => onEliminar(bebida.id)}
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
        count={filteredBebidas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: 'white' }}
      />
    </Container>
  );
};

export default BebidaTable;
