import { ReactNode } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// project imports
import { AuthFooter } from '@/sections/auth/AuthFooter';
import Logo from '@/components/logo/LogoSection';
import { AuthCard } from '@/sections/auth/AuthCard';
import { AuthBackground } from '@/sections/auth/AuthBackground';

// Definimos la interfaz para las props
interface AuthWrapperProps {
  children: ReactNode;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AuthBackground />
      <Stack sx={{ minHeight: '100vh', justifyContent: 'flex-end' }}>
        <Box sx={{ px: 3, mt: 3 }}>
          <Logo />
        </Box>
        
        <Box>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ 
              minHeight: { 
                xs: 'calc(100vh - 210px)', 
                sm: 'calc(100vh - 134px)', 
                md: 'calc(100vh - 132px)' 
              } 
            }}
          >
            <Grid>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Box>
        
        <AuthFooter />
      </Stack>
    </Box>
  );
}