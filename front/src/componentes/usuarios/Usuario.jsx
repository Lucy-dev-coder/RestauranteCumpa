import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import UsuarioTable from './UsuarioTable';
import AgregarUsuario from './AgregarUsuario';
import EditarUsuario from './EditarUsuario';
import axiosAuth from '../../api/axiosConfig';
import Spinner from '../../componentes/spinner/Spinner';

const Usuario = () => {
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const obtenerUsuarios = async () => {
     setLoading(true);
    try {
      // No necesitas obtener el token ni pasar headers aquí
      const res = await axiosAuth.get('/users'); // Usa ruta relativa porque en axiosConfig pusiste baseURL
      setUsuarios(res.data);
    } catch (err) {
      Swal.fire('Error', 'Error al obtener usuarios: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const handleOpenAgregar = () => {
    setOpenAgregar(true);
  };

  const handleCloseAgregar = () => {
    setOpenAgregar(false);
  };

  const handleOpenEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setOpenEditar(true);
  };

  const handleCloseEditar = () => {
    setUsuarioEditar(null);
    setOpenEditar(false);
  };

  const agregarUsuario = async (nuevoUsuario) => {
  try {
    await axiosAuth.post('/users', nuevoUsuario);
    obtenerUsuarios();
    handleCloseAgregar();
    Swal.fire('Éxito', 'Usuario agregado correctamente', 'success');
  } catch (err) {
    Swal.fire('Error', 'No se pudo agregar el usuario: ' + err.message, 'error');
  }
};

const editarUsuario = async (id, usuarioActualizado) => {
  try {
    await axiosAuth.put(`/users/${id}`, usuarioActualizado);
    obtenerUsuarios();
    handleCloseEditar();
    Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
  } catch (err) {
    Swal.fire('Error', 'No se pudo actualizar el usuario: ' + err.message, 'error');
  }
};

const eliminarUsuario = async (id) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡Esta acción no se puede deshacer!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
    try {
      await axiosAuth.delete(`/users/${id}`);
      obtenerUsuarios();
      Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
    } catch (err) {
      Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
    }
  }
};


  return (
  <>
    <h1 className="titulos">Administración de Usuarios</h1>

    {loading ? (
      <Spinner />
    ) : (
      <>
        <UsuarioTable
          usuarios={usuarios}
          onAgregar={handleOpenAgregar}
          onEditar={handleOpenEditar}
          onEliminar={eliminarUsuario}
        />

        <AgregarUsuario
          open={openAgregar}
          onClose={handleCloseAgregar}
          onGuardar={agregarUsuario}
        />

        <EditarUsuario
          open={openEditar}
          usuario={usuarioEditar}
          onClose={handleCloseEditar}
          onGuardar={editarUsuario}
        />
      </>
    )}
  </>
);

};

export default Usuario;
