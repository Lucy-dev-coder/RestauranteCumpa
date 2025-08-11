import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axiosAuth from '../../api/axiosConfig'; // Asumo que tienes axios configurado con baseURL y headers

import CajaTable from './CajaTable';
import AgregarCaja from './AgregarCaja';
import EditarCaja from './EditarCaja';
import Spinner from '../../componentes/spinner/Spinner';

const Caja = () => {
    const [loading, setLoading] = useState(false);
    const [cajas, setCajas] = useState([]);
    const [openAgregar, setOpenAgregar] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [cajaEditar, setCajaEditar] = useState(null);

    const obtenerCajas = async () => {
        setLoading(true);
        try {
            const res = await axiosAuth.get('/cajas');
            setCajas(res.data);
        } catch (err) {
            Swal.fire('Error', 'Error al obtener cajas: ' + err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerCajas();
    }, []);

    const handleOpenAgregar = () => setOpenAgregar(true);
    const handleCloseAgregar = () => setOpenAgregar(false);

    const handleOpenEditar = (caja) => {
        setCajaEditar(caja);
        setOpenEditar(true);
    };
    const handleCloseEditar = () => {
        setCajaEditar(null);
        setOpenEditar(false);
    };

    const agregarCaja = async (nuevaCaja) => {
        try {
            await axiosAuth.post('/cajas', nuevaCaja);
            obtenerCajas();
            handleCloseAgregar();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Caja agregada correctamente',
                timer: 900,
                showConfirmButton: false,
                timerProgressBar: true,
            });
        } catch (err) {
            Swal.fire('Error', 'No se pudo agregar la caja: ' + err.response?.data?.message || err.message, 'error');
        }
    };

    const editarCaja = async (id, cajaActualizada) => {
        try {
            await axiosAuth.put(`/cajas/${id}`, cajaActualizada);
            obtenerCajas();
            handleCloseEditar();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Caja cerrada correctamente',
                timer: 900,
                showConfirmButton: false,
                timerProgressBar: true,
            });

        } catch (err) {
            Swal.fire('Error', 'No se pudo actualizar la caja: ' + err.message, 'error');
        }
    };

    const eliminarCaja = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await axiosAuth.delete(`/cajas/${id}`);
                obtenerCajas();
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'Caja eliminada correctamente',
                    timer: 900,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });


            } catch (err) {
                Swal.fire('Error', 'No se pudo eliminar la caja', 'error');
            }
        }
    };

    return (
        <>
            <h1 className="titulos">Administración de Cajas</h1>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <CajaTable
                        cajas={cajas}
                        onAgregar={handleOpenAgregar}
                        onEditar={handleOpenEditar}
                        onEliminar={eliminarCaja}
                    />

                    <AgregarCaja
                        open={openAgregar}
                        onClose={handleCloseAgregar}
                        onGuardar={agregarCaja}
                    />

                    <EditarCaja
                        open={openEditar}
                        caja={cajaEditar}
                        onClose={handleCloseEditar}
                        onGuardar={editarCaja}
                    />
                </>
            )}
        </>
    );
};

export default Caja;
