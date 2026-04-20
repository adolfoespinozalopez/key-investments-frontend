// material-ui
import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';

// ==============================|| DATA & TYPES ||============================== //

// Definimos los tipos de los datos para asegurar que siempre sean números y strings
const data: number[] = [80, 95, 70, 42, 65, 55, 78];
const xLabels: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function MonthlyBarChart() {
  const theme = useTheme();

  return (
    <BarChart
      hideLegend
      height={380}
      series={[{ 
        data, 
        label: 'Operaciones', // Un nombre más acorde a tu proyecto
        type: 'bar' 
      }]}
      xAxis={[{ 
        data: xLabels, 
        scaleType: 'band', 
        tickSize: 7, 
        disableLine: true, 
        categoryGapRatio: 0.4 
      }]}
      yAxis={[{ 
        disableLine: true,
        disableTicks: true
      }]}
      slotProps={{ 
        bar: { 
          rx: 5, 
          ry: 5 
        } 
      }}
      axisHighlight={{ x: 'none' }}
      margin={{ left: 20, right: 20, top: 20 }}
      // Usamos las variables CSS de MUI v6 que ya configuramos en tu tema
      colors={['var(--mui-palette-info-light)']}
      sx={{
        '& .MuiBarElement-root:hover': { 
          opacity: 0.6 
        },
        '& .MuiChartsAxis-root.MuiChartsAxis-directionX .MuiChartsAxis-tick': { 
          stroke: 'transparent' 
        },
        // Aseguramos que el texto use la fuente 'Public Sans' que instalamos
        '& .MuiChartsAxis-tickLabel': {
          fontFamily: theme.typography.fontFamily,
          fill: theme.palette.text.secondary
        }
      }}
    />
  );
}