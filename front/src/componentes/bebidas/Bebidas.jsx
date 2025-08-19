import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axiosAuth from '../../api/axiosConfig';
import Spinner from '../../componentes/spinner/Spinner';

import BebidaTable from './BebidaTable';
import AgregarBebida from './AgregarBebida';
import EditarBebida from './EditarBebida';
import CambiarStockBebida from './CambiarStockBebida';

const Bebidas = () => {
  const [loading, setLoading] = useState(false);
  const [bebidas, setBebidas] = useState([]);
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [bebidaEditar, setBebidaEditar] = useState(null);
  const [openStock, setOpenStock] = useState(false);
  const [bebidaStock, setBebidaStock] = useState(null);
  const obtenerBebidas = async () => {
    setLoading(true);
    try {
      const res = await axiosAuth.get('/bebidas');
      setBebidas(res.data);
    } catch (err) {
      Swal.fire('Error', 'Error al obtener bebidas: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerBebidas();
  }, []);

  const handleOpenAgregar = () => setOpenAgregar(true);
  const handleCloseAgregar = () => setOpenAgregar(false);

  const handleOpenEditar = (bebida) => {
    setBebidaEditar(bebida);
    setOpenEditar(true);
  };
  const handleCloseEditar = () => {
    setBebidaEditar(null);
    setOpenEditar(false);
  };
  const handleOpenStock = (bebida) => {
    setBebidaStock(bebida);
    setOpenStock(true);
  };
  const handleCloseStock = () => {
    setBebidaStock(null);
    setOpenStock(false);
  };
  const agregarBebida = async (nuevaBebida) => {
    try {
      await axiosAuth.post('/bebidas', nuevaBebida, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      obtenerBebidas();
      handleCloseAgregar();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Bebida agregada correctamente',
        showConfirmButton: false,
        timer: 900,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire('Error', 'No se pudo agregar la bebida: ' + err.message, 'error');
    }
  };

  const editarBebida = async (id, bebidaActualizada) => {
    try {
      await axiosAuth.post(`/bebidas/${id}?_method=PUT`, bebidaActualizada, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      obtenerBebidas();
      handleCloseEditar();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Bebida actualizada correctamente',
        showConfirmButton: false,
        timer: 900,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire('Error', 'No se pudo actualizar la bebida: ' + err.message, 'error');
    }
  };

  const eliminarBebida = async (id) => {
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
        await axiosAuth.delete(`/bebidas/${id}`);
        obtenerBebidas();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'La bebida ha sido eliminada.',
          showConfirmButton: false,
          timer: 900,
          timerProgressBar: true,
        });
      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar la bebida', 'error');
      }
    }
  };

  const toggleEstadoBebida = async (bebida) => {
    try {
      await axiosAuth.put(`/bebidas/${bebida.id}`, {
        estado: !bebida.estado
      });
      obtenerBebidas();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: `Bebida ${!bebida.estado ? 'habilitada' : 'deshabilitada'} correctamente`,
        showConfirmButton: false,
        timer: 900,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire('Error', 'No se pudo cambiar el estado de la bebida', 'error');
    }
  };

  return (
    <>
      <h1 className="titulos">Administración de Bebidas</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <BebidaTable
            bebidas={bebidas}
            onAgregar={handleOpenAgregar}
            onEditar={handleOpenEditar}
            onEliminar={eliminarBebida}
            onToggleEstado={toggleEstadoBebida}
            onCambiarStock={handleOpenStock}
          />
          <CambiarStockBebida
            open={openStock}
            bebida={bebidaStock}
            onClose={handleCloseStock}
            onGuardar={async (id, data) => {
              try {
                await axiosAuth.put(`/bebidas/${id}/stock`, data); // tu ruta de update
                obtenerBebidas();
                handleCloseStock();
                Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: 'Stock actualizado correctamente',
                  showConfirmButton: false,
                  timer: 800,           // Duración en milisegundos
                  timerProgressBar: true
                });
              } catch (err) {
                Swal.fire('Error', 'No se pudo actualizar el stock', 'error');
              }
            }}
          />
          <AgregarBebida
            open={openAgregar}
            onClose={handleCloseAgregar}
            onGuardar={agregarBebida}
          />

          <EditarBebida
            open={openEditar}
            bebida={bebidaEditar}
            onClose={handleCloseEditar}
            onGuardar={editarBebida}
          />
        </>
      )}
    </>
  );
};

export default Bebidas;
