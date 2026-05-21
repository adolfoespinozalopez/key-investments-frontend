import { Link } from 'react-router-dom';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';
import { SxProps, Theme } from '@mui/material/styles';

// project imports
import Logo from '@/components/logo/LogoMain';
import LogoIcon from '@/components/logo/LogoIcon';
import { APP_DEFAULT_PATH } from '@/config';
import { JSX } from 'react';

// ==============================|| TYPES ||============================== //

interface LogoSectionProps {
  isIcon?: boolean;
  sx?: SxProps<Theme>;
  to?: string;
}

// ==============================|| MAIN LOGO - TSX ||============================== //

const LogoSection = ({ isIcon, sx, to }: LogoSectionProps): JSX.Element => {
  
  // --- NAMED EXPRESSIONS: Selección del Logo ---
  // Decidimos qué logo mostrar fuera del return para mejorar la claridad.
  const LogoToRender = isIcon ? <LogoIcon /> : <Logo />;

  // --- RENDER ---
  return (
    <ButtonBase 
      disableRipple 
      component={Link} 
      to={to || APP_DEFAULT_PATH} 
      sx={sx} 
      aria-label="logo"
    >
      {LogoToRender}
    </ButtonBase>
  );
};

export default LogoSection;