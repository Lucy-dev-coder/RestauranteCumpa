import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axiosAuth from "../../api/axiosConfig";
import RegistroTable from "./RegistroTable";
import ModalRegistro from "./ModalRegistro";
import Spinner from "../spinner/Spinner";

// Función para obtener fecha en formato yyyy-mm-dd ajustada a La Paz (GMT-4)
const getFechaLaPaz = () => {
    const ahora = new Date();
    const offset = ahora.getTimezoneOffset(); // diferencia en minutos respecto a UTC
    const laPaz = new Date(ahora.getTime() - offset * 60000); 
    return laPaz.toISOString().slice(0, 10); 
};

const RegistroVenta = () => {
    const [loading, setLoading] = useState(false);
    const [ventas, setVentas] = useState([]);
    const [fechaFiltro, setFechaFiltro] = useState(getFechaLaPaz()); // ahora sí en hora local La Paz

    // Modal
    const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const obtenerVentas = async (fecha) => {
        setLoading(true);
        try {
            const res = await axiosAuth.get("/ventas", { params: { fecha } });
            setVentas(res.data);
        } catch (err) {
            Swal.fire("Error", "Error al obtener ventas: " + err.message, "error");
        } finally {
            setLoading(false);
        }
    };

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

    const handleFechaChange = (e) => {
        const nuevaFecha = e.target.value;
        setFechaFiltro(nuevaFecha);
        obtenerVentas(nuevaFecha);
    };

    useEffect(() => {
        obtenerVentas(fechaFiltro);
    }, []);

    return (
        <>
            <h1 className="titulos">Registros de Ventas</h1>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, gap: 10 }}>
                <label htmlFor="fechaFiltro" style={{ color: 'white', fontWeight: 'bold' }}>
                    Filtrar:
                </label>
                <input
                    id="fechaFiltro"
                    type="date"
                    value={fechaFiltro}
                    onChange={handleFechaChange}
                    style={{
                        padding: 5,
                        borderRadius: 4,
                        border: '1px solid orange',
                        backgroundColor: '#222',
                        color: 'white'
                    }}
                />
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <>
                    <RegistroTable
                        ventas={ventas}
                        setVentas={setVentas}
                        onVerDetalles={handleVerDetalles}
                    />

                    <ModalRegistro
                        modalOpen={modalOpen}
                        ventaSeleccionada={ventaSeleccionada}
                        onClose={handleCerrarModal}
                    />
                </>
            )}
        </>
    );
};

export default RegistroVenta;
