import React, { useState } from 'react';
import {
  Container, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, TablePagination
} from '@mui/material';
import './Usuario.css'; // Asegúrate de mantener tus estilos
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const UsuarioTable = ({ usuarios, onAgregar, onEditar, onEliminar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const filteredUsuarios = usuarios.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsuarios = filteredUsuarios.slice(
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
        Agregar Usuario
      </Button>


      <TextField
        fullWidth
        margin="normal"
        label="Buscar usuario"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputLabelProps={{ style: { color: 'white' } }}
        InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
      />

      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table className="table bgdark" style={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsuarios.map((usuario) => {
              console.log('Estado usuario:', usuario.estado);
              return (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.name}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.rol}</TableCell>
                  <TableCell>
                    {(() => {
                      const estadoTexto = usuario.estado === 'habilitado' ? 'Habilitado' : 'Deshabilitado';
                      const bgColor = usuario.estado === 'habilitado' ? 'green' : 'crimson';
                      return (
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            color: 'white',
                            backgroundColor: bgColor,
                            textTransform: 'capitalize'
                          }}
                        >
                          {estadoTexto}
                        </span>
                      );
                    })()}
                  </TableCell>



                  <TableCell>
                    <Button
                      onClick={() => onEditar(usuario)}
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
                      onClick={() => onEliminar(usuario.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Eliminar
                    </Button>

                  </TableCell>
                </TableRow>
              )
            })}
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
    </Container>
  );
};

export default UsuarioTable;
