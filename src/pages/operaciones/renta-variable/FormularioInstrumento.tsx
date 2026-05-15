import React, { useState, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';

// material-ui
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

//datePicker
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//assets
import SearchIcon from '@mui/icons-material/Search';

import { _getGrandTotalRow } from 'ag-grid-community';

//project imports
import AgenteAutocompleteSearch from './AgenteAutocompleteSearch';

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

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      tipo: '',
      nroOrden: "ORD-001234",
      mercado: '',
      agente: '',
      accion: '',
      moneda: "",
      isin: "",
      custodia: "",
      sbs: "",
      fechaLiquidacion:"",
      cantidad: '',
      precio: '',
      total: ''
    }
  });

  const cantidad = useWatch({ control, name: 'cantidad' });
  const precio = useWatch({ control, name: 'precio' });

  useEffect(() => {
    const nCantidad = parseFloat(cantidad) || 0;
    const nPrecio = parseFloat(precio) || 0;
    const nTotal = nCantidad * nPrecio;

    // Actualizamos el campo total con 2 decimales
    setValue('total', nTotal.toFixed(2));
  }, [cantidad, precio, setValue]);

  const onSubmit = (data: any) => {
    console.log("Datos validados:", data);
  };

  return (
    <Box sx={{ width: '100%', p: 0, mt: 0 }}>

      <form id="instrumento-form" onSubmit={handleSubmit(onSubmit)}
      >
        {/* En MUI 7, Grid container ya no necesita que sus hijos tengan la prop 'item' */}
        <Grid container spacing={0.5}>

          {/* PRIMERA FILA: Tipo y Nro Orden */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="tipo"
              control={control}
              rules={{ required: "El Tipo es obligatorio" }}
              render={({ field }) => (
                <TextField {...field} 
                  select 
                  label="Tipo" 
                  fullWidth
                  size="small" 
                  error={!!errors.tipo}
                  helperText={errors.tipo?.message}
                  className="xsmall-input">
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
                <TextField {...field} label="Número de Orden" fullWidth
                  size="small" className="xsmall-input"
                  variant="outlined" slotProps={{ input: { readOnly: true } }} />
              )}
            />
          </Grid>

          {/* SEGUNDA FILA: Mercado y Agente */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="mercado"
              control={control}
              rules={{ required: "El Mercado es obligatorio" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mercado"
                  fullWidth
                  size="small"
                  className="xsmall-input"
                  error={!!errors.mercado}
                  helperText={errors.mercado?.message}
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
          <Grid size={{ xs: 12, md: 6 }} sx={{mt:1.3}}>
            <AgenteAutocompleteSearch control={control} rules={{ required: "El Agente es obligatorio" }}/>
          </Grid>

          {/* TERCERA FILA: Acción */}
          <Grid size={12}>
            <Controller
              name="accion"
              control={control}
              rules={{ required: "La acción es obligatoria" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Acción"
                  fullWidth
                  size="small"
                  className="xsmall-input"
                  error={!!errors.accion}
                  helperText={errors.accion?.message}
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
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'primary.secondary', display: 'block', mb: 1 }}>
                DETALLE DE INSTRUMENTO
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Controller name="moneda" control={control} render={({ field }) => (
                    <TextField {...field} label="Moneda" fullWidth className="xsmall-input-read-only" size="small" variant="standard" slotProps={{ input: { readOnly: true } }} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Controller name="isin" control={control} render={({ field }) => (
                    <TextField {...field} label="Código ISIN" fullWidth className="xsmall-input-read-only" size="small" variant="standard" slotProps={{ input: { readOnly: true } }} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Controller name="custodia" control={control} render={({ field }) => (
                    <TextField {...field} label="Tipo Custodia" fullWidth className="xsmall-input-read-only" size="small" variant="standard" slotProps={{ input: { readOnly: true } }} />
                  )} />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Controller name="sbs" control={control} render={({ field }) => (
                    <TextField {...field} label="Código SBS" fullWidth className="xsmall-input-read-only" size="small" variant="standard" slotProps={{ input: { readOnly: true } }} />
                  )} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* QUINTA FILA: Datos de Instrumento */}
          <Grid size={12} >
            <Grid container spacing={1} columnSpacing={2}>
              {/* Primer campo: Izquierda */}
              <Grid size={{ xs: 12, md: 3 }} sx={{ mt: 1.1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                  <Controller
                    name="fechaLiquidacion"
                    control={control}
                    rules={{ required: "Ingrese Fecha" }}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        label="Fecha de Liquidacion"
                        format="DD/MM/YYYY"
                        value={value ? dayjs(value) : null}
                        className="xsmall-input-picker"
                        slotProps={{
                          textField: {
                              size: 'small',
                              fullWidth: true,
                              error: !!errors.fechaLiquidacion,
		                          helperText: errors.fechaLiquidacion?.message as string
                          }
                        }}
                        onChange={(newValue) => {
                          // Guardamos el valor en el formulario
                          onChange(newValue); 
                        }}
                      />
                     )}
                  />
                </LocalizationProvider>
              </Grid>

              {/* Segundo campo: Derecha */}
              <Grid size={{ xs: 12, md: 3 }} >
                <Controller
                  name="cantidad"
                  control={control}
                  rules={{ 
                    required: "Ingrese Cantidad",
                    min: { value: 1, message: "Debe ser mayor a 0" } 
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Cantidad"
                      type="number"
                      size="small"
                      fullWidth
                      variant="outlined"
                      className="xsmall-input"
                      error={!!errors.cantidad}
                      helperText={errors.cantidad?.message}
                      slotProps={{
                        htmlInput: {
                          style: { textAlign: 'right' }
                        }
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }} >
                <Controller
                  name="precio"
                  control={control}
                  rules={{ 
                    required: "Ingrese Precio",
                    min: { value: 1, message: "Debe ser mayor a 0" } 
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Precio"
                      type="number"
                      size="small"
                      fullWidth
                      variant="outlined"
                      className="xsmall-input"
                      error={!!errors.precio}
                      helperText={errors.precio?.message}
                      slotProps={{
                        htmlInput: {
                          style: { textAlign: 'right' }
                        }
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }} >
                <Controller
                  name="total"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Total"
                      size="small"
                      fullWidth
                      variant="filled"
                      className="xsmall-input"
                      slotProps={{
                        htmlInput: {
                          readOnly: true,
                          style: { textAlign: 'right', fontWeight: 'bold' }
                        }
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
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