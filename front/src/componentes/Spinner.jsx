import React from 'react';
import './Spinner.css'; // Aquí va el estilo que quieras para spinner y overlay

const Spinner = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
