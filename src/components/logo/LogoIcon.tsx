import { useTheme } from '@mui/material/styles';
import { JSX } from 'react';

// Ajusta la ruta según dónde guardes tus SVGs
import LogoCompactPath from '@/assets/logo/Logo_Icon.svg'; 

const LogoIcon = (): JSX.Element => {
  const theme = useTheme();

  return (
    <img 
      src={LogoCompactPath} 
      alt="Key Logo Icon" 
      style={{ 
        width: '100%', 
        height: '39px' 
      }} 
    />
  );
};

export default LogoIcon;