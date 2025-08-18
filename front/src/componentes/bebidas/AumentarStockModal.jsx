import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField
} from "@mui/material";
import Swal from "sweetalert2";
import axiosAuth from "../../api/axiosConfig";

export default function AumentarStockModal({ open, onClose, bebida, onStockUpdated }) {
  const [cantidad, setCantidad] = useState("");

  const handleGuardar = async () => {
    if (!cantidad || parseInt(cantidad) <= 0) {
      Swal.fire("Error", "Ingresa una cantidad válida", "error");
      return;
    }

    try {
      const res = await axiosAuth.patch(`/bebidas/${bebida.id}/aumentar-stock`, {
        cantidad: parseInt(cantidad)
      });

      Swal.fire({
        icon: "success",
        title: "¡Stock actualizado!",
        text: `El nuevo stock de ${bebida.nombre} es ${res.data.bebida.stock}`,
        timer: 2000,
        showConfirmButton: false
      });

      onStockUpdated(res.data.bebida);
      onClose();
      setCantidad("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el stock"
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Aumentar Stock</DialogTitle>
      <DialogContent>
        <TextField
          label="Cantidad a agregar"
          type="number"
          fullWidth
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleGuardar} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
