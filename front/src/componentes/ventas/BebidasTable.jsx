import React, { useState } from 'react';
import {
  Container, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, TablePagination
} from '@mui/material';

const BebidasTable = ({ bebidas }) => {
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

  return (
    <Container maxWidth={false} style={{ padding: '20px' }}>
      <TextField
        fullWidth
        margin="normal"
        label="Buscar bebida"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Imagen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBebidas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hay bebidas
                </TableCell>
              </TableRow>
            ) : (
              paginatedBebidas.map((bebida) => (
                <TableRow key={bebida.id}>
                  <TableCell>{bebida.id}</TableCell>
                  <TableCell>{bebida.nombre}</TableCell>
                  <TableCell>{bebida.precio}</TableCell>
                  <TableCell>{bebida.stock}</TableCell>
                  <TableCell>{bebida.estado}</TableCell>
                  <TableCell>
                    {bebida.imagen && (
                      <img
                        src={`http://localhost:8000/storage/${bebida.imagen}`}
                        alt={bebida.nombre}
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                      />
                    )}
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
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Container>
  );
};

export default BebidasTable;
