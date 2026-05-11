import { ReactNode } from 'react';

// material-ui
import { styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';

// project imports 
import { withAlpha } from '@/utils/colorUtils';

// third-party
import SimpleBar from 'simplebar-react';
import { BrowserView, MobileView } from 'react-device-detect';

// ==============================|| TYPES ||============================== //

interface SimpleBarScrollProps {
  children?: ReactNode;
  sx?: SxProps<Theme>;
  [key: string]: any; // Para soportar '...other'
}

// ==============================|| STYLED COMPONENTS ||============================== //

const RootStyle = styled(BrowserView)({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden'
});

const SimpleBarStyle = styled(SimpleBar)(({ theme }: { theme: Theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      // Nota: theme.vars es común en esquemas de MUI con CSS variables. 
      // Si usas el tema estándar, sería theme.palette.grey[500]
      background: withAlpha(theme.palette.grey[500], 0.48)
    },
    '&.simplebar-visible:before': {
      opacity: 1
    }
  },
  '& .simplebar-track': {
    '&.simplebar-vertical': {
      width: 10
    }
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6
  },
  '& .simplebar-mask': {
    zIndex: 'inherit'
  }
}));

// ==============================|| COMPONENT - NAMED EXPRESSION ||============================== //

export const SimpleBarScroll = ({ children, sx, ...other }: SimpleBarScrollProps) => {
  return (
    <>
      <RootStyle>
        <SimpleBarStyle 
          clickOnTrack={false} 
          sx={sx} 
          data-simplebar-direction="ltr"
          {...other}
        >
          {children}
        </SimpleBarStyle>
      </RootStyle>
      <MobileView>
        <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
          {children}
        </Box>
      </MobileView>
    </>
  );
};