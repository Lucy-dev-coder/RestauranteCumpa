import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import CategoriaTable from './CategoriaTable';
import AgregarCategoria from './AgregarCategoria';
import EditarCategoria from './EditarCategoria';
import axiosAuth from '../../api/axiosConfig';
import Spinner from '../../componentes/spinner/Spinner';

const Categoria = () => {
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [categoriaEditar, setCategoriaEditar] = useState(null);

  const obtenerCategorias = async () => {
    setLoading(true);
    try {
     const res = await axiosAuth.get('/categorias'); // Usa ruta relativa porque en axiosConfig pusiste baseURL
      setCategorias(res.data);
    } catch (err) {
      Swal.fire('Error', 'Error al obtener categorías: ' + err.message, 'error');
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleOpenAgregar = () => {
    setOpenAgregar(true);
  };

  const handleCloseAgregar = () => {
    setOpenAgregar(false);
  };

  const handleOpenEditar = (categoria) => {
    setCategoriaEditar(categoria);
    setOpenEditar(true);
  };

  const handleCloseEditar = () => {
    setCategoriaEditar(null);
    setOpenEditar(false);
  };

  const agregarCategoria = async (nuevaCategoria) => {
    try {
       await axiosAuth.post('/categorias', nuevaCategoria);
      obtenerCategorias();
      handleCloseAgregar();
      Swal.fire('Éxito', 'Categoría agregada correctamente', 'success');
    } catch (err) {
      Swal.fire('Error', 'No se pudo agregar la categoría: ' + err.message, 'error');
    }
  };
  const editarCategoria = async (id, categoriaActualizada) => {
    try {
      await axiosAuth.put(`/categorias/${id}`, categoriaActualizada);
      obtenerCategorias();
      handleCloseEditar();
      Swal.fire('Éxito', 'Categoría actualizada correctamente', 'success');
    } catch (err) {
      Swal.fire('Error', 'No se pudo actualizar la categoría: ' + err.message, 'error');
    }
  };

  const eliminarCategoria = async (id) => {
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
         await axiosAuth.delete(`/categorias/${id}`);
        obtenerCategorias();
        Swal.fire('Eliminado', 'La categoría ha sido eliminada.', 'success');
      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar la categoría', 'error');
      }
    }
  };

  return (
    <>
      <h1 className="titulos">Administración de Categorías</h1>
{loading ? (
      <Spinner />
    ) : (
      <>
      <CategoriaTable
        categorias={categorias}
        onAgregar={handleOpenAgregar}
        onEditar={handleOpenEditar}
        onEliminar={eliminarCategoria}
      />

      <AgregarCategoria
        open={openAgregar}
        onClose={handleCloseAgregar}
        onGuardar={agregarCategoria}
      />

      <EditarCategoria
        open={openEditar}
        categoria={categoriaEditar}
        onClose={handleCloseEditar}
        onGuardar={editarCategoria}
      />
      </>
    )}
  </>
);
};

export default Categoria;
