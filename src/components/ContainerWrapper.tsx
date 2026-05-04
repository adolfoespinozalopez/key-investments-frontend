import { ReactNode } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container, { ContainerProps } from '@mui/material/Container';
import Box from '@mui/material/Box';

// ==============================|| CONTAINER WRAPPER ||============================== //

interface ContainerWrapperProps extends ContainerProps {
  children: ReactNode;
}

export function ContainerWrapper({ children, ...rest }: ContainerWrapperProps) {
  // Tipamos explícitamente el callback del theme para evitar errores de 'any'
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg" disableGutters={downMD} {...rest}>
      <Box sx={{ px: { xs: 1.5, sm: 2, md: 0 } }}>
        {children}
      </Box>
    </Container>
  );
}