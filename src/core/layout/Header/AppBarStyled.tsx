// material-ui
import { styled, Theme } from '@mui/material/styles';
import AppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

// project imports
import { DRAWER_WIDTH } from '@/config';

// ==============================|| TYPES ||============================== //

interface AppBarStyledProps extends MuiAppBarProps {
  open?: boolean;
}

// ==============================|| STYLED COMPONENT ||============================== //

export const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarStyledProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  variants: [
    {
      // Caso: Drawer cerrado
      props: ({ open }) => !open,
      style: {
        width: `calc(100% - ${theme.spacing(7.5)})`
      }
    },
    {
      // Caso: Drawer abierto
      props: ({ open }) => open,
      style: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    }
  ]
}));