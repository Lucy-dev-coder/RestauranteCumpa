import React, { useState } from 'react';
import {
    Container, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TextField, TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LockClockIcon from '@mui/icons-material/LockClock';

const CajaTable = ({ cajas = [], onAgregar, onEditar, onEliminar }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [modalOpen, setModalOpen] = useState(false);
const [cajaSeleccionada, setCajaSeleccionada] = useState(null);

    const filteredCajas = cajas.filter((c) =>
        (c.estado || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.observaciones && c.observaciones.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (c.id && c.id.toString().includes(searchTerm))
    );

    const paginatedCajas = filteredCajas.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formatDate = (date) => {
        if (!date) return '-';
        const d = new Date(date);
        return isNaN(d) ? '-' : d.toLocaleString();
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
                Agregar Caja
            </Button>

            <TextField
                fullWidth
                margin="normal"
                label="Buscar caja (id, estado, observaciones)"
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
                            <TableCell>Monto Apertura</TableCell>
                            <TableCell>Fecha Apertura</TableCell>
                            <TableCell>Monto Cierre</TableCell>
                            <TableCell>Fecha Cierre</TableCell>
                            <TableCell>Monto Final</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Observaciones</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedCajas.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    No hay cajas
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedCajas.map((caja) => {
                                const montoCierreExists = caja.monto_cierre !== null && caja.monto_cierre !== undefined;
                                const montoFinal = montoCierreExists
                                    ? (Number(caja.monto_cierre) - Number(caja.monto_apertura || 0)).toFixed(2)
                                    : '-';

                                return (
                                    <TableRow key={caja.id}>
                                        <TableCell>{caja.id}</TableCell>
                                        <TableCell>{caja.monto_apertura ?? '-'}</TableCell>
                                        <TableCell>{formatDate(caja.fecha_apertura)}</TableCell>
                                        <TableCell>{montoCierreExists ? caja.monto_cierre : '-'}</TableCell>
                                        <TableCell>{formatDate(caja.fecha_cierre)}</TableCell>
                                        <TableCell>{montoFinal}</TableCell>
                                        
                                        <TableCell
                                            style={{
                                                backgroundColor:
                                                    caja.estado === 'abierta' ? 'green' :
                                                    caja.estado === 'cerrada' ? 'crimson' :
                                                    'transparent',
                                                color: 'white',
                                            }}
                                        >
                                            {caja.estado ?? '-'}
                                        </TableCell>
                                        <TableCell>{caja.observaciones ?? '-'}</TableCell>
                                        <TableCell>
                                            {caja.estado === 'abierta' && (
                                                <Button
                                                    onClick={() => onEditar(caja)}
                                                    color="primary"
                                                    variant="contained"
                                                    startIcon={<LockClockIcon />}
                                                >
                                                    Cerrar Caja
                                                </Button>
                                            )}
                                             {/* <Button
                      color="error"
                      variant="contained"
                      style={{ marginLeft: '10px' }}
                      onClick={() => onEliminar(caja.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Eliminar
                    </Button> */}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[6, 10, 25]}
                component="div"
                count={filteredCajas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ color: 'white' }}
            />
        </Container>
    );
};

export default CajaTable;
