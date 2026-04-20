// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';

// project imports
import MonthlyBarChart from '../sections/dashboard/MonthlyBarChart';
import MainCard from '../components/MainCard';

export const LinePage = () => {
  return (
    // Box añade un padding global para que el contenido no pegue a los bordes
    <MainCard title="Límites de inversión">
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Monitoreo de rendimientos y volúmenes de mercado.
      </Typography>
      <Box sx={{ p: 0 }}>
        <Grid container spacing={3}>

          {/* GRÁFICO 1: Monthly Bar Chart */}
          <Grid item xs={12} md={6} lg={6}>
            <MainCard title="Actividad Mensual" content={false}>
              <Box sx={{ p: 2, pt: 0 }}>
                <MonthlyBarChart />
              </Box>
            </MainCard>
          </Grid>

          {/* GRÁFICO 2: Bar Chart Simple */}
          <Grid item xs={12} md={6} lg={6}>
            <MainCard title="Comparativa de Barras" content={false}>
              <Box sx={{ p: 2, pt: 0 }}>
                <BarChart
                  xAxis={[
                    {
                      id: 'barCategories',
                      data: ['bar A', 'bar B', 'bar C'],
                      scaleType: 'band',
                    },
                  ]}
                  series={[
                    {
                      data: [2, 5, 3],
                      label: 'Volumen',
                    },
                  ]}
                  height={380}
                  // Ajustes para que no se vea apretado dentro de la tarjeta
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                />
              </Box>
            </MainCard>
          </Grid>

        </Grid>
      </Box>
    </MainCard>
  );
};