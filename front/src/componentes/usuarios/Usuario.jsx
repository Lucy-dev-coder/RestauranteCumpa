import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import UsuarioTable from './UsuarioTable';
import AgregarUsuario from './AgregarUsuario';
import EditarUsuario from './EditarUsuario';

const api = "http://localhost:8000/api/users";

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(api);
      setUsuarios(res.data);
    } catch (err) {
      Swal.fire('Error', 'Error al obtener usuarios: ' + err.message, 'error');
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
      await axios.post(api, nuevoUsuario);
      obtenerUsuarios();
      handleCloseAgregar();
      Swal.fire('Éxito', 'Usuario agregado correctamente', 'success');
    } catch (err) {
      Swal.fire('Error', 'No se pudo agregar el usuario: ' + err.message, 'error');
    }
  };

  const editarUsuario = async (id, usuarioActualizado) => {
    try {
      await axios.put(`${api}/${id}`, usuarioActualizado);
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
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${api}/${id}`);
        obtenerUsuarios();
        Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
      }
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Administración de Usuarios</h1>

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
  );
};

export default Usuario;
