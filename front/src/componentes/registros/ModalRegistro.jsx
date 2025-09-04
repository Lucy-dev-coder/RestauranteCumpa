import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  List, ListItem, ListItemText, Typography, Button,
  Paper, Box, Divider, Chip, ListItemIcon
} from "@mui/material";
import {
  Receipt as ReceiptIcon,
  Restaurant as RestaurantIcon,
  LocalBar as LocalBarIcon
} from '@mui/icons-material';

const ModalRegistro = ({ modalOpen, ventaSeleccionada, onClose }) => {
  
  const calcularTotalPlatos = () => {
    if (!ventaSeleccionada?.detalle_ventas?.length) return 0;
    return ventaSeleccionada.detalle_ventas.reduce((total, item) => 
      total + (item.cantidad * item.precio_unitario), 0
    );
  };

  const calcularTotalBebidas = () => {
    if (!ventaSeleccionada?.detalle_ventas_bebida?.length) return 0;
    return ventaSeleccionada.detalle_ventas_bebida.reduce((total, item) => 
      total + (item.cantidad * item.precio_unitario), 0
    );
  };

  const calcularTotalGeneral = () => {
    return calcularTotalPlatos() + calcularTotalBebidas();
  };

  return (
    <Dialog 
      open={modalOpen} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#1e1e1e',
          color: 'white',
          backgroundImage: 'none'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          bgcolor: '#2d2d2d', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: '1px solid #404040',
          py: 2
        }}
      >
        <ReceiptIcon />
        Detalles de la Venta #{ventaSeleccionada?.id}
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 2, bgcolor: '#1e1e1e' }}>
        {/* Información de la Venta */}
        <Paper sx={{ p: 2, mb: 2, bgcolor: '#2d2d2d', border: '1px solid #404040' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#cccccc' }}>
              <strong style={{color: '#ff9800'}}>Mesa:</strong> {ventaSeleccionada?.mesa}
            </Typography>
            <Typography variant="body2" sx={{ color: '#cccccc' }}>
              <strong style={{color: '#ff9800'}}>Usuario:</strong> {ventaSeleccionada?.usuario?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#cccccc' }}>
              <strong style={{color: '#ff9800'}}>Método:</strong> {ventaSeleccionada?.metodo_pago}
            </Typography>
            <Typography variant="body2" sx={{ color: '#cccccc' }}>
              <strong style={{color: '#ff9800'}}>Fecha:</strong> {ventaSeleccionada?.created_at && 
                new Date(ventaSeleccionada.created_at).toLocaleString('es-BO', {
                  day: '2-digit', month: '2-digit', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })
              }
            </Typography>
          </Box>
        </Paper>

        {/* Sección de Platos */}
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              color: '#4caf50',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1.5,
              fontSize: '1.1rem'
            }}
          >
            <RestaurantIcon fontSize="small" />
            Platos
          </Typography>
          
          {ventaSeleccionada?.detalle_ventas?.length > 0 ? (
            <>
              <List sx={{ bgcolor: '#2d2d2d', borderRadius: 2, p: 0, border: '1px solid #404040' }}>
                {ventaSeleccionada.detalle_ventas.map((item, idx) => (
                  <ListItem 
                    key={idx}
                    sx={{
                      borderBottom: idx < ventaSeleccionada.detalle_ventas.length - 1 ? '1px solid #404040' : 'none',
                      py: 1.5,
                      px: 2
                    }}
                  >
                    <ListItemIcon>
                      <Chip 
                        label={item.cantidad} 
                        size="small" 
                        sx={{ 
                          bgcolor: '#4caf50',
                          color: 'white',
                          minWidth: 35,
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: 'white' }}>
                            {item.plato}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: '#4caf50' }}>
                            Bs {(item.cantidad * item.precio_unitario).toFixed(2)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" sx={{ color: '#999' }}>
                            Precio unitario: Bs {item.precio_unitario}
                          </Typography>
                          {item.obs && (
                            <Typography variant="caption" sx={{ color: '#ff9800', fontStyle: 'italic', mt: 0.5, display: 'block' }}>
                              Obs: {item.obs}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              
              {/* Total de Platos */}
              <Paper 
                elevation={2}
                sx={{ 
                  mt: 1, 
                  p: 1.5, 
                  bgcolor: '#4caf50',
                  color: 'white'
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600, textAlign: 'right' }}>
                  Total Platos: Bs {calcularTotalPlatos().toFixed(2)}
                </Typography>
              </Paper>
            </>
          ) : (
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#2d2d2d', border: '1px solid #404040' }}>
              <RestaurantIcon sx={{ fontSize: 32, color: '#666', mb: 1 }} />
              <Typography variant="body2" sx={{ color: '#999' }}>
                No hay platos en esta venta.
              </Typography>
            </Paper>
          )}
        </Box>

        {/* Sección de Bebidas */}
        <Box>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              color: '#2196f3',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1.5,
              fontSize: '1.1rem'
            }}
          >
            <LocalBarIcon fontSize="small" />
            Bebidas
          </Typography>
          
          {ventaSeleccionada?.detalle_ventas_bebida?.length > 0 ? (
            <>
              <List sx={{ bgcolor: '#2d2d2d', borderRadius: 2, p: 0, border: '1px solid #404040' }}>
                {ventaSeleccionada.detalle_ventas_bebida.map((item, idx) => (
                  <ListItem 
                    key={idx}
                    sx={{
                      borderBottom: idx < ventaSeleccionada.detalle_ventas_bebida.length - 1 ? '1px solid #404040' : 'none',
                      py: 1.5,
                      px: 2
                    }}
                  >
                    <ListItemIcon>
                      <Chip 
                        label={item.cantidad} 
                        size="small" 
                        sx={{ 
                          bgcolor: '#2196f3',
                          color: 'white',
                          minWidth: 35,
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: 'white' }}>
                            {item.bebida}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: '#2196f3' }}>
                            Bs {(item.cantidad * item.precio_unitario).toFixed(2)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" sx={{ color: '#999' }}>
                            Precio unitario: Bs {item.precio_unitario}
                          </Typography>
                          {item.obs && (
                            <Typography variant="caption" sx={{ color: '#ff9800', fontStyle: 'italic', mt: 0.5, display: 'block' }}>
                              Obs: {item.obs}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              
              {/* Total de Bebidas */}
              <Paper 
                elevation={2}
                sx={{ 
                  mt: 1, 
                  p: 1.5, 
                  bgcolor: '#2196f3',
                  color: 'white'
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600, textAlign: 'right' }}>
                  Total Bebidas: Bs {calcularTotalBebidas().toFixed(2)}
                </Typography>
              </Paper>
            </>
          ) : (
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#2d2d2d', border: '1px solid #404040' }}>
              <LocalBarIcon sx={{ fontSize: 32, color: '#666', mb: 1 }} />
              <Typography variant="body2" sx={{ color: '#999' }}>
                No hay bebidas en esta venta.
              </Typography>
            </Paper>
          )}
        </Box>

        {/* Total General */}
        <Divider sx={{ my: 2, bgcolor: '#404040' }} />
        <Paper 
          elevation={3}
          sx={{ 
            p: 2, 
            bgcolor: '#ff9800',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            TOTAL: Bs {calcularTotalGeneral().toFixed(2)}
          </Typography>
        </Paper>
      </DialogContent>
      
      <DialogActions sx={{ p: 2, bgcolor: '#2d2d2d', borderTop: '1px solid #404040' }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          size="medium"
          sx={{ 
            minWidth: 100,
            bgcolor: '#ff9800',
            '&:hover': { bgcolor: '#f57c00' }
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalRegistro;