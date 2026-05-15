import { useState, MouseEvent } from 'react';

// material-ui
import { 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Avatar, 
  IconButton, 
  Typography,
  Box,
  Grid,
  Stack,
  Tooltip
} from '@mui/material';

// assets
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import avatar4 from '@/assets/images/users/avatar-4.png';

// Importamos el hook de cierre de sesión
import { useLogout } from '@/hooks/useLogout';

export const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { handleLogout } = useLogout();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    handleClose();
    // Aquí ejecutas la lógica para limpiar tokens, caché de SWR, etc.
    console.log('Cerrando sesión...');
    handleLogout();
  };

  return (
    <>
      <Typography variant="h6">Administrador</Typography>
      <Tooltip title="Perfil" disableInteractive arrow>
        <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 0.5, padding: 0.5 }}
            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
        >
            {/* Puedes pasarle iniciales o una imagen real */}
            
            <Avatar alt="Perfil" src={avatar4} sx={{ '&:hover': { outline: '1px solid', outlineColor: 'primary.main' }}}>AD</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
              mt: 1.5,
              minWidth: 200,
              border: '1px solid',
              borderColor: 'divider',
              '&::before': { // Flecha estética hacia el Avatar
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                borderLeft: '1px solid',
                borderTop: '1px solid',
                borderColor: 'divider',
              },
            },
          },
        }}
      >
        {/* Encabezado del Menú: Identificación rápida del Trader / Usuario */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid>
                <Stack direction="row" sx={{ gap: 1.25, alignItems: 'center' }}>
                    <Avatar alt="Perfil" src={avatar4} sx={{ width: 32, height: 32 }} />
                    <Stack>
                        <Typography variant="h6">John Doe</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Administrador
                        </Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Grid>
                <Tooltip title="Logout">
                    <IconButton size="large" sx={{ color: 'text.primary' }} onClick={onLogoutClick}>
                    <LogoutOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
          </Grid>
        </Box>
        
        <Divider sx={{ my: 0.5 }} />

        {/* Opciones del Menú */}
        <MenuItem onClick={handleClose} sx={{ py: 1 }}>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon fontSize="small" color="action" />
          </ListItemIcon>
          <ListItemText primary="Ver Perfil" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ py: 1}}>
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" color="action" />
          </ListItemIcon>
          <ListItemText primary="Editar Perfil" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        {/* Opción de Salida en color de advertencia discreto */}
        <MenuItem onClick={onLogoutClick} sx={{ py: 1, color: 'primary.main' }}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </MenuItem>
      </Menu>
    </>
  );
};