import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import { AuthWrapper } from '@/sections/auth/AuthWrapper';
import { AuthLogin } from '@/sections/auth/AuthLogin';

// ================================|| JWT - LOGIN ||================================ //

export function LoginPage() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        {/* 
          Si usas Grid v2 (MUI 5.15+), mantén 'size={12}'. 
          Si usas Grid v1 (MUI 5 estándar), cámbialo a 'item xs={12}'.
        */}
        <Grid size={{ xs: 12 }} >
          <Stack 
            direction="row" 
            sx={{ 
              alignItems: 'baseline', 
              justifyContent: 'space-between', 
              mb: { xs: -0.5, sm: 0.5 } 
            }}
          >
            <Typography variant="h3">Login</Typography>
            <Typography 
              component={Link} 
              to="/register" 
              variant="body1" 
              sx={{ textDecoration: 'none' }} 
              color="primary"
            >
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        
        <Grid size={{ xs: 12 }} >
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}