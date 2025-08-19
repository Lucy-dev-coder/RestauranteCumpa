import React, { useState } from 'react';
import {
    Grid, Card, CardContent, Typography,
    Box, Button, TextField, Table, TableHead, TableBody, TableCell, TableRow
} from '@mui/material';
import axiosAuth from '../../api/axiosConfig';
import Spinner from '../spinner/Spinner';

const Dashboard = () => {
    const [fecha, setFecha] = useState('');
    const [resumen, setResumen] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchResumen = async () => {
        if (!fecha) {
            alert('Por favor seleccione una fecha');
            return;
        }
        setLoading(true);
        try {
            const response = await axiosAuth.get('/dashboard/resumen-por-fecha', {
                params: { fecha }
            });
            setResumen(response.data.resumen);
        } catch (error) {
            console.error('Error al cargar el resumen:', error);
        } finally {
            setLoading(false);
        }
    };
    const totalGeneral = resumen.reduce(
        (acc, item) => acc + Number(item.total_precio),
        0
    );

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Ventas de Platos y Bebidas por Fecha
            </Typography>

            {/* Selector de fecha y botón */}
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, alignItems: 'center' }}>
                <TextField
                    type="date"
                    label="Seleccione la fecha"
                    InputLabelProps={{
                        shrink: true,
                        sx: { color: 'white' } // color del label
                    }}
                    sx={{
                        input: { color: 'white' },        // color del texto
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'lightblue' },       // borde normal
                            '&:hover fieldset': { borderColor: 'cyan' },      // borde hover
                            '&.Mui-focused fieldset': { borderColor: 'deepskyblue' }, // borde enfocado
                        },
                        width: 200,
                    }}
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'deepskyblue',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'dodgerblue',
                        },
                        height: 40
                    }}
                    onClick={fetchResumen}
                >
                    Ver
                </Button>
            </Box>


            {loading ? (
                <Spinner />
            ) : (
                <>
                    {/* Tabla de resumen */}
                    {resumen.length > 0 && (
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Ventas del {fecha}
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Producto</strong></TableCell>
                                            <TableCell><strong>Cantidad vendida</strong></TableCell>
                                            <TableCell><strong>Total vendido (Bs.)</strong></TableCell>
                                            <TableCell><strong>Tipo</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {resumen.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.producto}</TableCell>
                                                <TableCell>{item.total_vendidos}</TableCell>
                                                <TableCell>{Number(item.total_precio).toFixed(2)}</TableCell>
                                                <TableCell>{item.tipo}</TableCell>
                                            </TableRow>
                                        ))}

                                        {/* Fila del total general */}
                                        <TableRow>
                                            <TableCell colSpan={2} align="right"><strong>Total general:</strong></TableCell>
                                            <TableCell><strong>{totalGeneral.toFixed(2)}</strong></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>


                                </Table>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
        </Box>
    );
};

export default Dashboard;
