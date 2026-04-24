import React, { useState } from 'react';
import { Box, Tab, Card, Tabs, Grid, Button, Typography, Paper, Divider, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import MainCard from '../../../components/MainCard';

//fecha
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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

    const [value, setValue] = useState<Dayjs | null>(dayjs('2023-04-17'));
    const [open, setOpen] = useState(false);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <MainCard title="Registro de Nueva Acción">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" size='small'>Fondo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={fondo}
                                    label="Age"
                                    size="small"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>Fondo 1</MenuItem>
                                    <MenuItem value={2}>Fondo 2</MenuItem>
                                    <MenuItem value={3}>Fondo 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-end">

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                
                                <DatePicker
                                    label="Fecha de Operación"
                                    slotProps={{ textField: { size: 'small' } }}
                                    open={open}
                                    onOpen={() => setOpen(true)}
                                    onClose={() => setOpen(false)}
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    // Formato solicitado: Apr 17, 2023
                                    format="MMM DD, YYYY"
                                    
                                    
                                />
                                
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid >
                        <Divider sx={{ mb: 1 }} />
                    </Grid>
                    <Tabs value={tabValue} onChange={handleChangeTab} aria-label="tabs registro">
                        <Tab label="Ficha de Registro" sx={{ fontWeight: 600 }} />
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
            </Box>
        </MainCard>
    );
};