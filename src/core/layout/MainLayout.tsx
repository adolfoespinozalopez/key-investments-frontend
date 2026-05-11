import { useEffect } from 'react';
import { Outlet } from "react-router-dom";

import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

//project imports
import { AppSidebar } from "@/core/layout/Sidebar";
import { Header } from "@/core/layout/Header/Header";
import { Breadcrumbs } from "@/components/@extended/Breadcrumbs";
import { Loader } from '@/components/Loader';
import { Footer } from "@/core/layout/Footer";

import { handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';


export const MainLayout = () => {
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));

  // set media wise responsive drawer
  useEffect(() => {
    handlerDrawerOpen(!downXL);
  }, [downXL]);

  if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <AppSidebar />
      
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