import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Box, TextField, Typography, Stack, Button, InputAdornment, Grid } from '@mui/material';
import { IconButton, Popover, FormGroup, FormControlLabel, Checkbox, Tooltip } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import SearchIcon from '@mui/icons-material/Search';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import AddIcon from '@mui/icons-material/Add';

// project imports
import MainCard from '@/components/MainCard';
import { Accion } from '@/types/Accion';

// AG Grid Imports
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ValueFormatterParams,
  ClientSideRowModelModule,
  ModuleRegistry,
  NumberFilterModule,
  RowSelectionModule,
  TextFilterModule,
  ValidationModule,
  PaginationModule,
  CellStyleModule,
  DateFilterModule,
  ColumnApiModule,
  iconSetMaterial,
  themeQuartz,
} from 'ag-grid-community';

// data
import { getData } from '@/api/accionesData';

ModuleRegistry.registerModules([
  RowSelectionModule,
  TextFilterModule,
  NumberFilterModule,
  ValidationModule,
  PaginationModule,
  CellStyleModule,
  DateFilterModule,
  ColumnApiModule,
  ClientSideRowModelModule,
]);

// Fecha de hoy para el filtro inicial
const today = new Date().toISOString().split('T')[0];

export const AccionesPage: React.FC = () => {
  const [gridApi, setGridApi] = useState<GridApi<Accion> | null>(null);
  const [rowData, setRowData] = useState<Accion[]>([]);

  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'column-popover' : undefined;
  const [searchTerm, setSearchTerm] = useState('');

  // Un objeto donde la llave es el field y el valor es un booleano (true = visible)
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({});

  const navigate = useNavigate();

  // Definición de Columnas con Tipado ColDef
  const columnDefs = useMemo<ColDef<Accion>[]>(() => [
    { field: "fondo", headerName: "Fondo", maxWidth: 80 },
    { field: "periodo", headerName: "Periodo", maxWidth: 90 },
    { field: "mes", headerName: "Mes", maxWidth: 100 },
    { field: "orden", headerName: "N° Orden", minWidth: 100 },
    {
      field: "fechaRegistro",
      headerName: "Fecha Registro",
      minWidth: 150,
      filter: 'agDateColumnFilter', // INDISPENSABLE para que setColumnFilterModel funcione
      filterParams: {
        comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
          if (cellValue == null) return -1;
          const [day, month, year] = cellValue.split('/').map(Number);
          const cellDate = new Date(year, month - 1, day);
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) return 0;
          return cellDate < filterLocalDateAtMidnight ? -1 : 1;
        }
      }
    },
    { field: "accion", headerName: "Acción / Valor", minWidth: 150 },
    {
      field: "tipo",
      headerName: "Operación",
      minWidth: 100,
      cellStyle: (params) =>
        params.value === 'Compra' ?
          { color: '#2e7d32', } :
          { fontWeight: 'bold' }
    },
    {
      field: "precio",
      headerName: "Precio",
      type: 'numericColumn',
      valueFormatter: (params: ValueFormatterParams<Accion, number>) =>
        params.value ? `S/ ${params.value.toFixed(2)}` : ''
    },
    {
      field: "subTotal",
      headerName: "Sub Total",
      type: 'numericColumn',
      valueFormatter: (params: ValueFormatterParams<Accion, number>) =>
        params.value ? `S/ ${params.value.toLocaleString()}` : ''
    },
    {
      field: "estado",
      headerName: "Estado",
      cellStyle: (params) => {
        if (params.value === 'Confirmado') return { color: '#2e7d32' };
        if (params.value === 'Pendiente') return { color: '#ed6c02' };
        if (params.value === 'Anulado') return { color: '#9e9e9e', textDecoration: 'line-through' };
        return null;
      }
    }
  ], []);

  const applyDateFilter = useCallback((api: GridApi<Accion>, start: string, end: string) => {
    if (!api) return;

    api.setColumnFilterModel('fechaRegistro', {
      filterType: 'date',
      type: 'inRange',
      dateFrom: start, // Formato "YYYY-MM-DD"
      dateTo: end,     // Formato "YYYY-MM-DD"
    }).then(() => {
      api.onFilterChanged();
    });
  }, []);

  useEffect(() => {
    // Tipamos la respuesta de la promesa
    getData().then((data: unknown) => {
      const typedData = data as Accion[];
      setRowData(typedData);
    });
  }, [gridApi, startDate, endDate, applyDateFilter]);

  const onGridReady = (params: GridReadyEvent<Accion>) => {
    setGridApi(params.api);
    // 1. Columnas a ocultar por defecto
    const columnsToHide = ['periodo', 'mes'];
    params.api.setColumnsVisible(columnsToHide, false);

    // 2. Inicializar el estado de visibilidad
    const allColumns = params.api.getColumns();
    const visibilityState: Record<string, boolean> = {};

    allColumns?.forEach(col => {
      const colId = col.getColId();
      visibilityState[colId] = col.isVisible();
    });

    setVisibleColumns(visibilityState);
  };

  // Función de búsqueda manual
  const handleSearch = useCallback(() => {
    if (gridApi) {
      gridApi.setColumnFilterModel('fechaRegistro', {
        filterType: 'date',
        type: 'inRange',
        dateFrom: startDate,
        dateTo: endDate,
      }).then(() => {
        gridApi.onFilterChanged();
      });
    }
  }, [gridApi, startDate, endDate]);

  const handleReset = useCallback(() => {
    setStartDate(today);
    setEndDate(today);
    if (gridApi) {
      gridApi.setColumnFilterModel('fechaRegistro', null).then(() => {
        gridApi.onFilterChanged();
      });
    }
  }, [gridApi]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSearchTerm('');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isColumnVisible = (field: string) => {
    if (!gridApi) return true; // Por defecto visibles si el grid no carga
    const column = gridApi.getColumn(field);
    return column ? column.isVisible() : true;
  };

  // Función para cambiar visibilidad
  const toggleColumn = (field: string) => {
    if (gridApi) {
      const column = gridApi.getColumn(field);
      if (column) {
        const newVisibility = !column.isVisible();

        // 1. Actualizar AG Grid
        gridApi.setColumnsVisible([field], newVisibility);

        // 2. Actualizar el estado de React para forzar el re-render del Popover
        setVisibleColumns(prev => ({
          ...prev,
          [field]: newVisibility
        }));
      }
    }
  };

  const myTheme = themeQuartz
    .withParams({
      backgroundColor: "#ffffff",
      foregroundColor: "#1a1a1a",
      headerBackgroundColor: "#faf8f5",
      spacing: 6,
      fontSize: 12,
      headerFontSize: 14,
    })
    .withPart(iconSetMaterial);

  return (
    <MainCard title="Listado de Compra y Venta de Acciones">

      <Box sx={{ width: '100%', mb: 2 }}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 'auto'}}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Fecha de Operación</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <TextField
                label="Desde"
                type="date"
                size="small"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '6.5px 14px',
                  }
                }}
              />
              <TextField
                label="Hasta"
                type="date"
                size="small"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '7px 14px',
                  }
                }}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 'auto' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ height: 33, mt: {xs: 0, sm: 3.5}}}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<SearchIcon />}
                onClick={handleSearch}>
                Buscar
              </Button>
              <Button
                variant="text"
                color="secondary"
                size="small"
                startIcon={<CleaningServicesIcon />}
                onClick={handleReset}>
                Limpiar
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 'grow' }} 
                sx={{ display: { xs: 'block', sm: 'flex' }, justifyContent: { sm: 'flex-end' } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: { xs: 0, sm: 3.5 } }}>
              <Tooltip title="Columnas">
                <IconButton
                  onClick={handleClick}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider', 
                    borderRadius: 1,
                    height: 33,
                    width: 33,
                    bgcolor: 'white'
                  }} >
                  <ViewColumnIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              {/* Lado Derecho: Acción de Crear */}
              <Button
                variant="contained"
                color="success"
                size="medium"
                sx={{ height: 35, fontWeight: 'bold' }}
                startIcon={<AddIcon />}
                onClick={() => navigate('crear')} // Ruta hacia la nueva página
              >
                Crear
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <div className="ag-theme-quartz" style={{ height: 440, width: '100%' }}>
        <AgGridReact<Accion>
          theme={myTheme}
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 30]}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            sortable: true, // Permite ordenar por cualquier columna
            filter: true,   // Activa filtros en todas las columnas
            resizable: true // Permite ajustar el ancho si el nombre de la acción es largo

          }}
        />
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          className: 'ag-header',
          sx: {
            mt: 1,
            width: 200, // Un poco más ancho para que el buscador respire
            borderRadius: '10px', // Bordes más redondeados para un look moderno
            boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
            border: '1px solid #f0f0f0'
          }
        }}
      >
        <Box sx={{ p: 1.5 }}>
          {/* Buscador Superior */}
          <TextField
            fullWidth
            size="small"
            placeholder="Buscar ..."
            variant="standard"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              mb: 1,
              '& .MuiInputBase-root': {
                fontSize: '0.85rem',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              },
              '& .MuiInputBase-input': {
                padding: '6px 14px 6px 4px',
              }
            }}
            InputProps={{
              disableUnderline: false,
              startAdornment: (
                <InputAdornment position="start" sx={{ pl: 0.5, mr: 0 }} >
                  <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ maxHeight: 280, overflowY: 'auto', pr: 0.5 }}>
            <FormGroup>
              {columnDefs
                .filter(col => col.headerName?.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((col) => {
                  const fieldKey = col.field as string;
                  if (!fieldKey) return null;
                  return (
                    <FormControlLabel
                      key={fieldKey}
                      sx={{
                        m: 0,
                        width: '100%',
                        borderRadius: '4px',
                        '&:hover': { backgroundColor: '#f0f4f8' },
                        '& .MuiFormControlLabel-label': {
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: '#444',
                          fontFamily: '"Inter", sans-serif', // 🖋️ Tipografía profesional
                        }
                      }}
                      control={
                        <Checkbox
                          size="small"
                          checked={!!visibleColumns[fieldKey]}
                          onChange={() => toggleColumn(fieldKey)}
                          sx={{
                            p: 0.5,
                            color: '#ccc',
                            '&.Mui-checked': { color: '#1976d2' },
                            '& .MuiSvgIcon-root': { fontSize: 18 }
                          }}
                        />
                      }
                      label={col.headerName}
                    />
                  );
                })
              }
            </FormGroup>
          </Box>
        </Box>
      </Popover>
    </MainCard>
  );
};