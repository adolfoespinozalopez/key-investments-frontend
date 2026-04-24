import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  Box, 
  TextField, 
  MenuItem, 
  Button, 
  Typography, 
  IconButton, 
  InputAdornment, 
  Paper,
  Modal,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

export const FormularioInstrumento: React.FC = () => {
  const [openMercado, setOpenMercado] = useState(false);
  const [openAccion, setOpenAccion] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      tipo: '',
      nroOrden: "ORD-001234",
      mercado: '',
      agente: '',
      accion: '',
      moneda: "Soles (PEN)",
      isin: "PEP123456789",
      custodia: "CAVALI",
      sbs: "SBS-9988"
    }
  });

  const onSubmit = (data: any) => console.log("Operación guardada:", data);

  return (
    <Box sx={{ width: '100%', p: 1, mt: 0 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1.5, borderBottom: '1px solid #ddd', pb: 0.5 }}>
        Datos de Operación
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* En MUI 7, Grid container ya no necesita que sus hijos tengan la prop 'item' */}
        <Grid container spacing={1.5}>
          
          {/* PRIMERA FILA: Tipo y Nro Orden */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="tipo"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Tipo" fullWidth size="small">
                  <MenuItem value="1">Compra</MenuItem>
                  <MenuItem value="2">Venta</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="nroOrden"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Número de Orden" fullWidth size="small" disabled variant="filled" />
              )}
            />
          </Grid>

          {/* SEGUNDA FILA: Mercado y Agente */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="mercado"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Mercado" 
                  fullWidth 
                  size="small"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setOpenMercado(true)}>
                            <SearchIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="agente"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Agente" fullWidth size="small">
                  <MenuItem value="agente1">Agente 1</MenuItem>
                  <MenuItem value="agente2">Agente 2</MenuItem>
                  <MenuItem value="agente3">Agente 3</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* TERCERA FILA: Acción */}
          <Grid size={12}>
            <Controller
              name="accion"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Acción" 
                  fullWidth 
                  size="small"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setOpenAccion(true)}>
                            <SearchIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  }}
                />
              )}
            />
          </Grid>

          {/* CUARTA FILA: Detalle de Instrumento */}
          <Grid size={12}>
            <Paper variant="outlined" sx={{ p: 1.5, mt: 1, bgcolor: '#fbfbfb' }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'primary.main', display: 'block', mb: 1.5 }}>
                DETALLE DE INSTRUMENTO
              </Typography>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller name="moneda" control={control} render={({ field }) => (
                    <TextField {...field} label="Moneda" fullWidth size="small" variant="standard" slotProps={{ input: { readOnly: true } }} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller name="isin" control={control} render={({ field }) => (
                    <TextField {...field} label="Código ISIN" fullWidth size="small" variant="standard" slotProps={{ input: { readOnly: true } }} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller name="custodia" control={control} render={({ field }) => (
                    <TextField {...field} label="Tipo Custodia" fullWidth size="small" variant="standard" slotProps={{ input: { readOnly: true } }} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller name="sbs" control={control} render={({ field }) => (
                    <TextField {...field} label="Código SBS" fullWidth size="small" variant="standard" slotProps={{ input: { readOnly: true } }} />
                  )} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button type="submit" variant="contained" size="small" startIcon={<SaveIcon />} sx={{ textTransform: 'none' }}>
              Guardar Operación
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Modales de Búsqueda */}
      <SearchModal open={openMercado} handleClose={() => setOpenMercado(false)} title="Búsqueda de Mercados" />
      <SearchModal open={openAccion} handleClose={() => setOpenAccion(false)} title="Búsqueda de Acciones" />
    </Box>
  );
};

const SearchModal = ({ open, handleClose, title }: any) => (
  <Modal open={open} onClose={handleClose}>
    <Box sx={modalStyle}>
      <Typography variant="h6">{title}</Typography>
      <Typography sx={{ mt: 2 }} variant="body2">Panel de búsqueda de instrumentos.</Typography>
      <Button onClick={handleClose} sx={{ mt: 3 }} fullWidth variant="outlined" size="small">Cerrar</Button>
    </Box>
  </Modal>
);