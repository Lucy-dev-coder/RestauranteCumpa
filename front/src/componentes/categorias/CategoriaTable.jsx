import React, { useState } from 'react';
import {
  Container, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const CategoriaTable = ({ categorias, onAgregar, onEditar, onEliminar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  // Filtrar categorías por nombre
  const filteredCategorias = categorias.filter((c) =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const paginatedCategorias = filteredCategorias.slice(
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
        Agregar Categoría
      </Button>

      <TextField
        fullWidth
        margin="normal"
        label="Buscar categoría"
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
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedCategorias.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No hay categorías
                </TableCell>
              </TableRow>
            ) : (
              paginatedCategorias.map((categoria) => (
                <TableRow key={categoria.id}>
                  <TableCell>{categoria.id}</TableCell>
                  <TableCell>{categoria.nombre}</TableCell>

                  <TableCell>
                    <Button
                      onClick={() => onEditar(categoria)}
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
                      onClick={() => onEliminar(categoria.id)}
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
        count={filteredCategorias.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: 'white' }}
      />
    </Container>
  );
};

export default CategoriaTable;
