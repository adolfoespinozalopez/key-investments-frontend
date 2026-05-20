import { useTheme } from '@mui/material/styles';
import { JSX } from 'react';

// Ajusta la ruta según dónde guardes tus SVGs
import LogoColorPath from '@/assets/logo/Logo_Full.svg'; 

interface LogoMainProps {
  reverse?: boolean;
}

const LogoMain = ({ reverse }: LogoMainProps): JSX.Element => {
  const theme = useTheme();

  return (
    <img 
      src={LogoColorPath} 
      alt="Key Solutions Logo" 
      style={{ 
        width: '100%', 
        // maxWidth: '180px', // Ajusta según necesites
        height: '39px',
        // Si usas el prop reverse para fondos oscuros, podrías aplicar un filtro
        filter: reverse ? 'brightness(0) invert(1)' : 'none' 
      }} 
    />
  );
};

export default LogoMain;