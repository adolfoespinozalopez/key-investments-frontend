import { useEffect } from 'react';
import { Outlet } from "react-router-dom";

import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

//project imports
import { AppSidebar } from "@/core/layout/Sidebar";
import { Header } from "@/core/layout/Header/Header";
import { Footer } from "@/core/layout/Footer";
import { Loader } from '@/components/Loader';
import { Breadcrumbs } from "@/components/@extended/Breadcrumbs";

import { handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';
import { SimpleBarScroll } from '@/components/third-party/SimpleBarScroll';

// ==============================|| MAIN LAYOUT ||============================== //

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

      <Box component="main"
        sx={{
          width: 'calc(100% - 260px)',
          flexGrow: 1,
          p: 1,
          overflow: 'hidden'
        }}>
        <SimpleBarScroll sx={{
          height: 'calc(100vh - 30px)',
          '& .simplebar-content': { display: 'flex', flexDirection: 'column' }
        }}>
          <Toolbar sx={{ mt: 'inherit' }} />
          <Box
            sx={{
              p: 1,
              position: 'relative',
              minHeight: 'calc(100vh - 110px)',
              overflow: 'hidden'
            }}
          >

            <Breadcrumbs />
            <Outlet />
            <Footer />

          </Box>
        </SimpleBarScroll>
      </Box>
    </Box>
  );
};