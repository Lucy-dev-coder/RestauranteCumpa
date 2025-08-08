import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axiosAuth from '../../api/axiosConfig';
import Spinner from '../../componentes/spinner/Spinner';

import PlatoTable from './PlatoTable';
import AgregarPlato from './AgregarPlato';
import EditarPlato from './EditarPlato';

const Plato = () => {
  const [loading, setLoading] = useState(false);
  const [platos, setPlatos] = useState([]);
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [platoEditar, setPlatoEditar] = useState(null);

  // Obtener lista de platos
  const obtenerPlatos = async () => {
    setLoading(true);
    try {
      const res = await axiosAuth.get('/platos');
      setPlatos(res.data);
    } catch (err) {
      Swal.fire('Error', 'Error al obtener platos: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerPlatos();
  }, []);

  // Abrir y cerrar modales
  const handleOpenAgregar = () => setOpenAgregar(true);
  const handleCloseAgregar = () => setOpenAgregar(false);

  const handleOpenEditar = (plato) => {
    setPlatoEditar(plato);
    setOpenEditar(true);
  };
  const handleCloseEditar = () => {
    setPlatoEditar(null);
    setOpenEditar(false);
  };

  // Agregar plato
  const agregarPlato = async (nuevoPlato) => {
    try {
      await axiosAuth.post('/platos', nuevoPlato, {
        headers: { 'Content-Type': 'multipart/form-data' } // porque puede tener imagen
      });
      obtenerPlatos();
      handleCloseAgregar();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Plato agregado correctamente',
        showConfirmButton: false, // Oculta el botón OK
        timer: 900,               // Tiempo en ms para que desaparezca solo
        timerProgressBar: true,   // Opcional: barra de progreso de tiempo
      });

    } catch (err) {
      Swal.fire('Error', 'No se pudo agregar el plato: ' + err.message, 'error');
    }
  };

  // Editar plato
  const editarPlato = async (id, platoActualizado) => {
    try {
      await axiosAuth.post(`/platos/${id}?_method=PUT`, platoActualizado, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      obtenerPlatos();
      handleCloseEditar();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Plato actualizado correctamente',
        showConfirmButton: false,
        timer: 900,
        timerProgressBar: true,
      });

    } catch (err) {
      Swal.fire('Error', 'No se pudo actualizar el plato: ' + err.message, 'error');
    }
  };

  // Eliminar plato
  const eliminarPlato = async (id) => {
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
        await axiosAuth.delete(`/platos/${id}`);
        obtenerPlatos();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'El plato ha sido eliminado.',
          showConfirmButton: false,
          timer: 900,
          timerProgressBar: true,
        });

      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar el plato', 'error');
      }
    }
  };

  // Cambiar estado habilitado/deshabilitado
  const toggleEstadoPlato = async (plato) => {
    try {
      await axiosAuth.put(`/platos/${plato.id}`, {
        estado: !plato.estado
      });
      obtenerPlatos();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: `Plato ${!plato.estado ? 'habilitado' : 'deshabilitado'} correctamente`,
        showConfirmButton: false,
        timer: 900,
        timerProgressBar: true,
      });

    } catch (err) {
      Swal.fire('Error', 'No se pudo cambiar el estado del plato', 'error');
    }
  };
  return (
    <>
      <h1 className="titulos">Administración de Platos</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <PlatoTable
            platos={platos}
            onAgregar={handleOpenAgregar}
            onEditar={handleOpenEditar}
            onEliminar={eliminarPlato}
            onToggleEstado={toggleEstadoPlato} // 👈 aquí
          />

          <AgregarPlato
            open={openAgregar}
            onClose={handleCloseAgregar}
            onGuardar={agregarPlato}
          />

          <EditarPlato
            open={openEditar}
            plato={platoEditar}
            onClose={handleCloseEditar}
            onGuardar={editarPlato}
          />
        </>
      )}
    </>
  );
};

export default Plato;
