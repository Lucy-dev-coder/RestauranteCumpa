import React from 'react';
import Button from '@mui/material/Button';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const DetallesCaja = ({ cajaId }) => {

  const handleVerPDF = () => {
    // Ruta que genera el PDF (ajusta según tu backend)
    const url = `${process.env.REACT_APP_API_URL}/cajas/${cajaId}/pdf`;
    window.open(url, '_blank');
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<PictureAsPdfIcon />}
      onClick={handleVerPDF}
      title="Ver detalle en PDF"
      size="small"
      style={{ minWidth: 0, marginRight: 8 }}
    >
      PDF
    </Button>
  );
};

export default DetallesCaja;
