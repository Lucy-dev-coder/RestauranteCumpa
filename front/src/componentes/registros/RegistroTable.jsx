import React, { useState } from "react";
import {
  Container, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, TablePagination
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from "sweetalert2";
import axiosAuth from "../../api/axiosConfig";
import ModalRegistro from "./ModalRegistro";

const RegistroTable = ({ ventas, setVentas }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  // Modal
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filtrar por mesa, usuario o método de pago
  const filteredVentas = ventas.filter((v) =>
    (v.mesa?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (v.metodo_pago?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (v.usuario?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const paginatedVentas = filteredVentas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ---------------------- ELIMINAR ----------------------
  const handleEliminar = async (ventaId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await axiosAuth.delete(`/ventas/${ventaId}`);
        setVentas(ventas.filter(v => v.id !== ventaId));
        Swal.fire('Eliminado!', 'La venta ha sido eliminada.', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la venta: ' + error.message, 'error');
      }
    }
  };

  // ---------------------- VER DETALLES ----------------------
  const handleVerDetalles = async (ventaId) => {
    try {
      const res = await axiosAuth.get(`/ventas/${ventaId}`);
      setVentaSeleccionada(res.data);
      setModalOpen(true);
    } catch (error) {
      Swal.fire('Error', 'No se pudo obtener la venta: ' + error.message, 'error');
    }
  };

  const handleCerrarModal = () => {
    setVentaSeleccionada(null);
    setModalOpen(false);
  };

  return (
    <Container maxWidth={false} style={{ padding: '20px' }}>
      
      <TextField
        fullWidth
        margin="normal"
        label="Buscar por mesa, usuario o método de pago"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputLabelProps={{ style: { color: 'white' } }}
        InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
      />

      <TableContainer component={Paper} style={{ marginTop: 10 }}>
        <Table className="table bgdark">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Caja</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Mesa</TableCell>
              <TableCell>Método Pago</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedVentas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hay ventas
                </TableCell>
              </TableRow>
            ) : (
              paginatedVentas.map((venta) => (
                <TableRow key={venta.id}>
                  <TableCell>{venta.id}</TableCell>
                  <TableCell>{venta.caja_id}</TableCell>
                  <TableCell>{venta.usuario?.name || "Desconocido"}</TableCell>
                  <TableCell>Bs {venta.total}</TableCell>
                  <TableCell>{venta.mesa}</TableCell>
                  <TableCell>{venta.metodo_pago}</TableCell>
                  <TableCell>
                    {new Date(venta.created_at).toLocaleString('es-BO', {
                      day: '2-digit', month: '2-digit', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleVerDetalles(venta.id)}
                      style={{ marginRight: 10 }}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleEliminar(venta.id)}
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
        count={filteredVentas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: 'white' }}
      />

      {/* Modal de Detalles */}
      <ModalRegistro 
        modalOpen={modalOpen}
        ventaSeleccionada={ventaSeleccionada}
        onClose={handleCerrarModal}
      />

    </Container>
  );
};

export default RegistroTable;