import React, { useState } from 'react';
import { Box, Tab, Card, Tabs, Grid, Button, Typography, Paper, Divider, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import MainCard from '../../../components/MainCard';

//fecha
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

//otros
import { useNavigate } from 'react-router-dom';
import { FormularioInstrumento } from './FormularioInstrumento';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
        </div>
    );
}


export const AccionFormPage: React.FC = () => {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [fondo, setFondo] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setFondo(event.target.value as string);
    };

    const [value, setValue] = useState<Dayjs | null>(dayjs('2026-04-28'));
    const [open, setOpen] = useState(false);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <MainCard title="Registro de Nueva Acción">
            <Grid container spacing={2}
                sx={{
                    ml: 1, mr: 1, mt: 0, mb: 1, p: 0.5, justifyContent: 'flex-end',
                    backgroundColor: '#fbfbfb', borderRadius: 2, border: '1px solid #e0e0e0'
                }}>
                {/* Botón Salir: Estilo secundario o Outline */}
                <Grid size="auto" >
                    <Button
                        variant="text"
                        color="inherit"
                        size="small"
                        className="xsmall-button"
                        startIcon={<KeyboardBackspaceIcon />}
                        onClick={() => navigate('..', { relative: 'path' })} // Regresa al listado
                        sx={{ fontWeight: 'bold' }}
                    >
                        Regresar
                    </Button>
                </Grid>

                {/* Botón Grabar: Estilo primario o Success */}
                <Grid size="auto">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                        className="xsmall-button"
                        startIcon={<SaveIcon />}
                        sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    >
                        Grabar Operación
                    </Button>
                </Grid>
            </Grid>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Grid container spacing={0.5}>

                    <Grid size={{ xs: 12, md: 6 }} sx={{ p: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" size="small" className="xsmall-input">Fondo</InputLabel>
                            <Select 
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fondo}
                                size="small"
                                onChange={handleChange}
                                className="xsmall-input"
                            >
                                <MenuItem value={1}>Fondo 1</MenuItem>
                                <MenuItem value={2}>Fondo 2</MenuItem>
                                <MenuItem value={3}>Fondo 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} sx={{ p:1, display: 'flex', justifyContent: 'flex-end' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                            <DatePicker
                                label="Fecha de Operación"
                                open={open}
                                onOpen={() => setOpen(true)}
                                onClose={() => setOpen(false)}
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        className: 'xsmall-input-picker',
                                        sx: {
                                            width: { xs: '100%', md: 'auto' },
                                            minWidth: { md: '240px' } 
                                        }
                                    }
                                 }}
                        />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Tabs value={tabValue} onChange={handleChangeTab} className="xsmall-tabs" aria-label="tabs registro" sx={{ p: 0 }}>
                    <Tab label="Ficha de Registro" sx={{ fontWeight: 600, p: 0 }} />
                    <Tab label="Regla de Límites Afectos" sx={{ fontWeight: 600 }} />
                </Tabs>
            </Box>

            {/* TAB 1: Ficha de Registro */}
            <CustomTabPanel value={tabValue} index={0}>
                <FormularioInstrumento />
            </CustomTabPanel>

            {/* TAB 2: Regla de Límites */}
            <CustomTabPanel value={tabValue} index={1}>
                <Typography variant="body1" color="text.secondary">
                    Aquí se configurarán las reglas de límites aplicables a esta operación.
                </Typography>
                {/* Puedes agregar aquí una tabla o más campos según necesites */}

            </CustomTabPanel>

        </MainCard>
    );
};