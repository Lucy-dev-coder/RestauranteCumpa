import React, { useState, useEffect } from 'react';
import {
  Container, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, TablePagination, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import axiosAuth from '../../api/axiosConfig';

const PlatosTable = ({ platos }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  // Estado para cantidades y observaciones
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axiosAuth.get('/categorias');
        setCategorias(res.data);
      } catch (error) {
        console.error('Error cargando categorías', error);
      }
    };
    fetchCategorias();
  }, []);

  // Inicializar inputs cuando llegan los platos
  useEffect(() => {
    const initial = {};
    platos.forEach((p) => {
      initial[p.id] = { cantidad: '', observacion: '' };
    });
    setInputs(initial);
  }, [platos]);

  useEffect(() => {
  console.log("Platos recibidos:", platos);
}, [platos]);

  const handleInputChange = (id, field, value) => {
    setInputs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const filteredPlatos = platos.filter((p) => {
    const matchNombre = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategoria = categoriaFiltro ? p.categoria_id === categoriaFiltro : true;
    return matchNombre && matchCategoria;
  });

  const paginatedPlatos = filteredPlatos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth={false} style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <TextField
          fullWidth
          label="Buscar plato"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FormControl style={{ minWidth: 200 }}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <MenuItem value="">Todas</MenuItem>
            {categorias.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Observación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPlatos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hay platos
                </TableCell>
              </TableRow>
            ) : (
              paginatedPlatos.map((plato) => (
                <TableRow key={plato.id}>
                  <TableCell>{plato.id}</TableCell>
                  <TableCell>{plato.nombre}</TableCell>
                  <TableCell>{plato.precio}</TableCell>
                  <TableCell>{plato.categoria?.nombre || 'Sin categoría'}</TableCell>
                  <TableCell>{plato.estado}</TableCell>
                  <TableCell>
                    {plato.imagen && (
                      <img
                        src={`http://localhost:8000/storage/${plato.imagen}`}
                        alt={plato.nombre}
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={inputs[plato.id]?.cantidad || ''}
                      onChange={(e) => handleInputChange(plato.id, 'cantidad', e.target.value)}
                      inputProps={{ min: 0 }}
                      style={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={inputs[plato.id]?.observacion || ''}
                      onChange={(e) => handleInputChange(plato.id, 'observacion', e.target.value)}
                      placeholder="Opcional"
                    />
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
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Container>
  );
};

export default PlatosTable;
