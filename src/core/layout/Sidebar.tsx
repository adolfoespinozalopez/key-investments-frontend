import { useState } from "react";
import { Menu, MenuItem, SubMenu, Sidebar, sidebarClasses } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { navigation } from "./navigation";
import { Box, Typography } from "@mui/material";
import { SimpleBarScroll } from "@/components/third-party/SimpleBarScroll";
import { handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';

const SidebarItem = ({ item }: { item: any }) => {
  const location = useLocation();

  if (!item || !item.label) return null;

  if (item.children && Array.isArray(item.children) && item.children.length > 0) {
    return (
      <SubMenu key={item.label} label={item.label} icon={item.icon}>
        {item.children.map((child: any, index: number) => (
          <SidebarItem key={`${child.label}-${index}`} item={child} />
        ))}
      </SubMenu>
    );
  }

  return (
    <MenuItem
      key={item.path || item.label}
      icon={item.icon}
      component={item.path ? <Link to={item.path} /> : undefined}
      active={location.pathname === item.path}
    >
      {item.label}
    </MenuItem>
  );
};

export const AppSidebar = () => {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened ?? false;
  
  return (
    <SimpleBarScroll sx={{ height: '100dvh', '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
      <Box component="nav" aria-label="mailbox folders">
        <Sidebar
          collapsed={!drawerOpen}
          toggled={drawerOpen}
          onBackdropClick={() => handlerDrawerOpen(false)}
          breakPoint="lg"
          backgroundColor="#fff"
          rootStyles={{
            color: '#607489',
            height: '100dvh'
          }}
        >
          {/* Renderizado condicional: 
            Si NOT collapsed (!collapsed), entonces muestra el div 
        */}
          {drawerOpen && (
            <div style={{ padding: '0 24px', margin: '8px 0px' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: '0.7', letterSpacing: '0.5px' }}
              >
                Mesa de Dinero
              </Typography>
            </div>
          )}
          <Menu
            menuItemStyles={{
              button: {
                height: '35px', // Altura reducida de cada fila
                transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#f0f4f8',
                  color: '#1976d2',
                },
                [`&.ps-active`]: {
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  fontWeight: '800',
                },
              },
              label: {
                fontSize: '12px', // Texto ligeramente más pequeño para ahorrar espacio
                fontWeight: 500,
              }
              
            }}
          >
            {navigation.map((item, index) => (
              <SidebarItem key={`${item.label}-${index}`} item={item} />
            ))}
          </Menu>
        </Sidebar>
      </Box>
    </SimpleBarScroll>
  );
};