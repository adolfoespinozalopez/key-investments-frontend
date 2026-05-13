// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import { Toolbar, Box, Avatar, Typography } from "@mui/material";

// project imports
import { AppBarStyled } from './AppBarStyled';
import IconButton from '@/components/@extended/IconButton';

import { handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '@/config';

// assets
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

export const Header = () => {
    const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    const { menuMaster } = useGetMenuMaster();
    const drawerOpen = menuMaster?.isDashboardDrawerOpened ?? false;

    // common header
    const mainHeader = (
        <Toolbar>
            <IconButton
                onClick={() => handlerDrawerOpen(!drawerOpen)}
                edge="start"
                color="secondary"
                variant="light"
                sx={(theme) => ({
                    color: 'text.primary',
                    bgcolor: drawerOpen ? 'transparent' : 'grey.100',
                    ml: { xs: 0, lg: -2 }
                })}
            >
                {!drawerOpen ? <MenuIcon /> : <MenuOpenIcon />}
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Key Portfolio Mangement
            </Typography>

            <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="body2">Admin</Typography>
                <Avatar />
            </Box>
        </Toolbar>
    );

    // app-bar params
    const appBar : AppBarProps = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
            borderBottom: '1px solid',
            borderBottomColor: 'divider',
            zIndex: 1200,
            width: { xs: '100%', lg: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : `calc(100% - ${MINI_DRAWER_WIDTH}px)` }
        }
    };

    const appBarMobile : AppBarProps = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
            borderBottom: '1px solid',
            borderBottomColor: 'divider',
            zIndex: 100,
            width: { xs: '100%', md: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : `calc(100% - ${MINI_DRAWER_WIDTH}px)` }
        }
    };

    return (
        <>
            {!downLG ? (
                <AppBarStyled open={drawerOpen} {...appBar}>
                    {mainHeader}
                </AppBarStyled>
            ) : (
                <AppBar {...appBarMobile}>{mainHeader}</AppBar>
            )}
        </>
    );
};