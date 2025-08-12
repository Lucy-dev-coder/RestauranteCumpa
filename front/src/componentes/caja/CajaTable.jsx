import React, { useState } from 'react';
import {
    Container, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TextField, TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LockClockIcon from '@mui/icons-material/LockClock';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';  // ingreso
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; // egreso
import VisibilityIcon from '@mui/icons-material/Visibility'; // ver detalles

const CajaTable = ({
    cajas = [],
    onAgregar,
    onEditar,
    onEliminar,
    onIngreso,
    onEgreso,
    onVerDetalles,
}) => {
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

            {/* <TextField
                fullWidth
                margin="normal"
                label="Buscar caja (id, estado, observaciones)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white', border: '1px solid orange' } }}
            /> */}

            <TableContainer component={Paper} style={{ width: '100%' }}>
                <Table className="table bgdark" style={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Apertura</TableCell>
                            <TableCell>Apertura/Cierre</TableCell> {/* Cambiado */}
                            <TableCell>Cierre</TableCell>
                            <TableCell>Monto Esperado</TableCell>
                            <TableCell>Observ.</TableCell>
                            <TableCell>Estado</TableCell>
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

                                return (
                                    <TableRow key={caja.id}>
                                        <TableCell>{caja.id}</TableCell>
                                        <TableCell>{caja.usuario.name}</TableCell>
                                        <TableCell>{caja.monto_apertura ?? '-'} Bs.</TableCell>
                                        <TableCell>
                                            <span style={{ color: 'white', borderRadius: '50%', backgroundColor: 'green' }}>A</span>: {formatDate(caja.fecha_apertura)}<br />
                                            <span style={{ color: 'white', borderRadius: '50%', backgroundColor: 'red' }}>C</span>: {formatDate(caja.fecha_cierre)}
                                        </TableCell>

                                        <TableCell>{caja.monto_cierre ?? '-'} Bs.</TableCell>
                                        <TableCell>{caja.monto_esperado ?? '-'} Bs.</TableCell>

                                        <TableCell>{caja.observaciones ?? '-'}</TableCell>
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
                                        <TableCell>
                                            {caja.estado === 'abierta' && (
                                                <>
                                                    <Button
                                                        onClick={() => onEditar(caja)}
                                                        color="primary"
                                                        variant="contained"
                                                        startIcon={<LockClockIcon />}
                                                        fullWidth
                                                        style={{ marginBottom: 8 }}
                                                    >
                                                        Cerrar Caja
                                                    </Button>
                                                </>
                                            )}

                                            <div>
                                                {caja.estado === 'abierta' && (
                                                    <>
                                                        <Button
                                                            onClick={() => onIngreso(caja)}
                                                            color="success"
                                                            variant="outlined"
                                                            title="Ingreso manual"
                                                            size="small"
                                                            style={{ minWidth: 0, marginRight: 8 }}
                                                        >
                                                            <AddCircleOutlineIcon />
                                                        </Button>
                                                        {/* <Button
          color="error"
          variant="contained"
          style={{ marginLeft: '10px' }}
          onClick={() => onEliminar(caja.id)}
          startIcon={<DeleteIcon />}
        >
          Eliminar
        </Button> */}
                                                        <Button
                                                            onClick={() => onEgreso(caja)}
                                                            color="error"
                                                            variant="outlined"
                                                            title="Agregar Gasto"
                                                            size="small"
                                                            style={{ minWidth: 0, marginRight: 8 }}
                                                        >
                                                            <RemoveCircleOutlineIcon />
                                                        </Button>
                                                    </>
                                                )}
                                                <Button
                                                    onClick={() => onVerDetalles(caja)}
                                                    color="info"
                                                    variant="outlined"
                                                    title="Ver detalles"
                                                    size="small"
                                                    style={{ minWidth: 0, marginRight: 8 }}
                                                >
                                                    <VisibilityIcon />
                                                </Button>
                                            </div>
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
