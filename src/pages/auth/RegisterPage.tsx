import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import { AuthWrapper }  from '@/sections/auth/AuthWrapper';
import { AuthRegister } from '@/sections/auth/AuthRegister';


// ================================|| JWT - REGISTER ||================================ //

export function RegisterPage() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Stack 
            direction="row" 
            sx={{ 
              alignItems: 'baseline', 
              justifyContent: 'space-between', 
              mb: { xs: -0.5, sm: 0.5 } 
            }}
          >
            <Typography variant="h3">Registro</Typography>
            <Typography 
              component={Link} 
              to="/login" 
              variant="body1" 
              sx={{ textDecoration: 'none' }} 
              color="primary"
            >
              ¿Ya tienes una cuenta?
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <AuthRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}