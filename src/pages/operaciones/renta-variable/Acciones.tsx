import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, TextField, Typography, Stack, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

// project imports
import MainCard from '../../../components/MainCard';

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
  iconSetMaterial,
  themeQuartz,
} from 'ag-grid-community';

// data
import { getData } from '../../../api/acciones';
import { Accion } from '../../../api/Accion';

ModuleRegistry.registerModules([
  RowSelectionModule,
  TextFilterModule,
  NumberFilterModule,
  ValidationModule,
  PaginationModule,
  CellStyleModule,
  DateFilterModule,
  ClientSideRowModelModule,
]);

// Fecha de hoy para el filtro inicial
const today = new Date().toISOString().split('T')[0];

export const AccionesPage: React.FC = () => {
  const [gridApi, setGridApi] = useState<GridApi<Accion> | null>(null);
  const [rowData, setRowData] = useState<Accion[]>([]);

  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);

  // Definición de Columnas con Tipado ColDef
  const columnDefs = useMemo<ColDef<Accion>[]>(() => [
    { field: "fondo", headerName: "Fondo" },
    { field: "periodo", headerName: "Periodo", maxWidth: 100 },
    { field: "mes", headerName: "Mes", maxWidth: 100 },
    { field: "orden", headerName: "N° Orden" },
    {
      field: "fechaRegistro",
      headerName: "Fecha Registro",
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
    { field: "accion", headerName: "Acción / Valor" },
    {
      field: "tipo",
      headerName: "Operación",
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

      <Box sx={{ width: '100%' }}>
        <Stack
          // 'column' en móviles (xs), 'row' desde tablets (sm)
          direction={{ xs: 'column', sm: 'row' }}
          // En móvil se alinea al inicio, en escritorio se mantiene al final para nivelar con los inputs
          alignItems={{ xs: 'stretch', sm: 'flex-end' }}
          justifyContent="space-between"
          spacing={{ xs: 2, sm: 0 }} // Espacio entre bloques cuando se apilan
          sx={{ mb: 3 }}
        >
          {/* Lado Izquierdo: Filtros y Búsqueda */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', md: 'flex-end' }}
          >
            <Stack direction="row" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ mb: 0.5, display: 'block', fontWeight: 600 }}>
                  Desde
                </Typography>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ mb: 0.5, display: 'block', fontWeight: 600 }}>
                  Hasta
                </Typography>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Stack>

            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              sx={{ height: { xs: 40, md: 33 } }} // Un poco más alto en móvil para ser más fácil de tocar
            >
              Buscar
            </Button>
          </Stack>

          {/* Lado Derecho: Acción de Crear */}
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            size="large"
            disabled={true}
            sx={{
              mt: { xs: 1, sm: 0 }, // Margen superior solo en móviles
              height: { xs: 45, sm: 'auto' }
            }}
          >
            Crear
          </Button>
        </Stack>
      </Box>
      <div className="ag-theme-quartz" style={{ height: 460, width: '100%' }}>
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
    </MainCard>
  );
};