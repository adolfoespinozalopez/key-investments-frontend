import React, { useState } from 'react';
import { Box, Tab, Tabs, TextField, Grid, Button, Typography, Paper, Divider } from '@mui/material';
import MainCard from '../../../components/MainCard';

//otros
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const AccionFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <MainCard title="Registro de Nueva Acción">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleChangeTab} aria-label="tabs registro">
            <Tab label="Ficha de Registro" sx={{ fontWeight: 600 }} />
            <Tab label="Regla de Límites Afectos" sx={{ fontWeight: 600 }} />
          </Tabs>
        </Box>

        {/* TAB 1: Ficha de Registro */}
        <CustomTabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Fondo" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Periodo" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Mes" variant="outlined" size="small" />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="N° Orden" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Fecha Registro" 
                type="date" 
                InputLabelProps={{ shrink: true }} 
                size="small" 
              />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Acción / Valor" variant="outlined" size="small" />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Operación (Compra/Venta)" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField 
                fullWidth 
                label="Precio" 
                type="number" 
                variant="outlined" 
                size="small" 
                InputProps={{ startAdornment: <Box sx={{ mr: 1 }}>S/</Box> }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Estado" variant="outlined" size="small" />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" 
                        color="secondary"
                        onClick={() => navigate('..', { relative: 'path' })} // Regresa al listado
                >
                  Cancelar
                </Button>
                <Button variant="contained" color="primary">Guardar Registro</Button>
              </Box>
            </Grid>
          </Grid>
        </CustomTabPanel>

        {/* TAB 2: Regla de Límites */}
        <CustomTabPanel value={tabValue} index={1}>
          <Typography variant="body1" color="text.secondary">
            Aquí se configurarán las reglas de límites aplicables a esta operación.
          </Typography>
          {/* Puedes agregar aquí una tabla o más campos según necesites */}
        </CustomTabPanel>
      </Box>
    </MainCard>
  );
};