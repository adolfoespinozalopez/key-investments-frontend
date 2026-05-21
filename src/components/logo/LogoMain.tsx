import { useTheme } from '@mui/material/styles';
import { JSX } from 'react';

// Ajusta la ruta según dónde guardes tus SVGs
import LogoColorPath from '@/assets/logo/Logo_Full.svg'; 

const LogoMain = (): JSX.Element => {
  const theme = useTheme();

  return (
    <img 
      src={LogoColorPath} 
      alt="Key Solutions Logo" 
      style={{ 
        width: '89%', 
        // maxWidth: '180px', // Ajusta según necesites
        height: '39px',
        
      }} 
    />
  );
};

export default LogoMain;