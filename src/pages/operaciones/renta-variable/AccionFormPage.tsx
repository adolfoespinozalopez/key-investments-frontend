import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Box, Tab, Card, Tabs, Grid, Button, Typography, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, TextField } from '@mui/material';
import MainCard from '@/components/MainCard';

//datePicker
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//assets
import SaveIcon from '@mui/icons-material/Save';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

//project imports
import { FormularioInstrumento } from './FormularioInstrumento';
import { PipelineValidationModal } from './PipelineValidationModal';

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
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    // NUEVOS ESTADOS: Control del Pipeline Automatizado
    const [openPipeline, setOpenPipeline] = useState(false);
    const [formDataCache, setFormDataCache] = useState<any>(null);

    // Bandera de control: Cambia a true si estás editando para saltar el pipeline
    const isEdit = false;

    const handleChange = (event: SelectChangeEvent) => {
        setFondo(event.target.value as string);
    };

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Esta función recibe el disparo exitoso de React Hook Form desde el hijo
    const handleFormSubmitReady = (data: any) => {
        const payloadCompleto = { ...data, fondo, fechaOperacion: value?.format('YYYY-MM-DD') };
        
        if (isEdit) {
            // SI ES EDICIÓN: Guarda directo sin mostrar pipeline
            console.log("Guardando directo por edición:", payloadCompleto);
            // Aquí pones tu mutación/Fetch a la base de datos
            //navigate('..', { relative: 'path' });
        } else {
            // SI ES NUEVO: Cacheamos la data y abrimos el pipeline automatizado
            setFormDataCache(payloadCompleto);
            setOpenPipeline(true);
        }
    };

    // Se ejecuta SOLAMENTE cuando el pipeline automático termina con éxito de revisar todos los pasos
    const handlePipelineComplete = () => {
        setOpenPipeline(false);
        console.log("Escribiendo definitivo en BD:", formDataCache);
        
        // Aquí ejecutas el axios.post / swr mutate definitivo
        // Al terminar, redireccionas al listado
        //navigate('..', { relative: 'path' });
    };

    return (
        <MainCard title={isEdit ? "Editar Acción" : "Registro de Nueva Acción"}>
            <Grid container spacing={2}
                sx={{
                    ml: 1, mr: 1, mt: 0, mb: 1, p: 0.5, justifyContent: 'flex-end',
                    backgroundColor: '#fbfbfb', borderRadius: 2, border: '1px solid #e0e0e0'
                }}>
                {/* Botón Salir: Estilo secundario o Outline */}
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

                {/* Botón Grabar: Estilo primario o Success */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    className="xsmall-button"
                    startIcon={<SaveIcon />}
                    sx={{ fontWeight: 'bold' }}
                    form="instrumento-form"
                >
                    Grabar Operación
                </Button>
            </Grid>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Grid container spacing={0.5}>

                    <Grid size={{ xs: 12, md: 5 }} sx={{ p: 1 }}>
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
                    <Grid size={{ xs: 6, md: 4 }} sx={{ p:1 }}>
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
                    <Grid size={{ xs: 6, md: 3 }} sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="h5" color="secondary" sx={{ mr: 2 }}>
                            Estado:
                        </Typography>
                        <Typography variant="h5" color="primary.700">
                            PENDIENTE
                        </Typography>
                    </Grid>
                </Grid>

                <Tabs value={tabValue} onChange={handleChangeTab} className="xsmall-tabs" aria-label="tabs registro" sx={{ p: 0 }}>
                    <Tab label="Ficha de Registro" sx={{ fontWeight: 600, p: 0 }} />
                    <Tab label="Regla de Límites Afectos" sx={{ fontWeight: 600 }} />
                </Tabs>
            </Box>

            {/* TAB 1: Ficha de Registro */}
            <CustomTabPanel value={tabValue} index={0}>
                <FormularioInstrumento onValidSubmit={handleFormSubmitReady} />
            </CustomTabPanel>

            {/* TAB 2: Regla de Límites */}
            <CustomTabPanel value={tabValue} index={1}>
                <Typography variant="body1" color="text.secondary">
                    Aquí se configurarán las reglas de límites aplicables a esta operación.
                </Typography>
                {/* Puedes agregar aquí una tabla o más campos según necesites */}

            </CustomTabPanel>

            {/* PIPELINE MODAL AUTOMÁTICO */}
            <PipelineValidationModal 
                open={openPipeline} 
                onComplete={handlePipelineComplete} 
            />
        </MainCard>
    );
};