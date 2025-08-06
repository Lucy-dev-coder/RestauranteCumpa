import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rol: "cajero",
    activo: true,
  });

  const api = "http://localhost:8000/api/users"; // Asegúrate de que Laravel esté corriendo

  const obtenerUsuarios = async () => {
    const res = await axios.get(api);
    setUsuarios(res.data);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const abrirModal = (usuario = null) => {
    setModoEdicion(!!usuario);
    setUsuarioSeleccionado(usuario);
    setFormData(
      usuario || {
        name: "",
        email: "",
        password: "",
        rol: "cajero",
        activo: true,
      }
    );
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const guardarUsuario = async () => {
    try {
      if (modoEdicion) {
        await axios.put(`${api}/${usuarioSeleccionado.id}`, formData);
      } else {
        await axios.post(api, formData);
      }
      obtenerUsuarios();
      cerrarModal();
    } catch (err) {
      alert("Error al guardar: " + err.message);
    }
  };

  const eliminarUsuario = async (id) => {
    if (confirm("¿Estás segura de eliminar este usuario?")) {
      await axios.delete(`${api}/${id}`);
      obtenerUsuarios();
    }
  };

  return (
    <div className="container mt-5">
      <h2>Usuarios</h2>
      <Button onClick={() => abrirModal()}>➕ Nuevo</Button>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>{u.activo ? "Sí" : "No"}</td>
              <td>
                <Button size="sm" onClick={() => abrirModal(u)}>✏️</Button>{" "}
                <Button size="sm" variant="danger" onClick={() => eliminarUsuario(u.id)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Editar" : "Nuevo"} Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" value={formData.password} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="cajero">Cajero</option>
              </Form.Select>
            </Form.Group>
            <Form.Check
              type="checkbox"
              label="Activo"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarUsuario}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Usuario;
