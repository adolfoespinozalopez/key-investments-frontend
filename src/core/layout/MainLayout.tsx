import { useState } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { AppSidebar } from "./Sidebar";
import { Header } from "./Header";
import { DRAWER_WIDTH } from '../../config';
import { MINI_DRAWER_WIDTH } from '../../config';
import Breadcrumbs from "../../components/@extended/Breadcrumbs";
import Footer from "./Footer";


export const MainLayout = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false); // Estado para móviles
  const drawerWidth = isMobile ? MINI_DRAWER_WIDTH : collapsed ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

  // Función inteligente: decide si colapsar o abrir el drawer
  const toggle = () => {
    if (isMobile) {
      setToggled(!toggled);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>      
      
      <Header 
        toggle={toggle} 
        collapsed={isMobile ? !toggled : collapsed}/>

      <AppSidebar 
          collapsed={collapsed} 
          toggled={toggled} 
          setToggled={setToggled} 
        />

      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 1, sm: 2 } }}>
        <Toolbar sx={{ mt: 'inherit' }} />
        <Box
          sx={{
            ...{ px: { xs: 0, sm: 2 } },
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Breadcrumbs />
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};