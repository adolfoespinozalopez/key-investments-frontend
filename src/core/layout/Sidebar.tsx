import { Menu, MenuItem, SubMenu, Sidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

// project imports
import { navigation } from "./navigation";
import { SimpleBarScroll } from "@/components/third-party/SimpleBarScroll";
import { handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';
import SidebarHeader from "@/core/layout/SidebarHeader";

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
    <Box component="nav" aria-label="mailbox folders" sx={{overflow: 'hidden',display: 'flex',flexDirection: 'column'}}>
      <Sidebar
        collapsed={!drawerOpen}
        toggled={drawerOpen}
        onBackdropClick={() => handlerDrawerOpen(false)}
        breakPoint="lg"
        backgroundColor="#fff"
        className="sidebar"
        rootStyles={{
          color: '#607489'
        }}
      >
        {/* Logo */}
        <SidebarHeader open={drawerOpen} />
        <SimpleBarScroll sx={{
          height: 'calc(100vh - 60px)',
          '& .simplebar-content': { display: 'flex', flexDirection: 'column' }
        }}>
          {/* Renderizado condicional: 
            Si NOT collapsed (!collapsed), entonces muestra el div 
          */}
          {drawerOpen && (
            <div style={{ padding: '0 24px', margin: '8px 0px' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: '0.7', letterSpacing: '0.5px' }}>
                MESA DE DINERO
              </Typography>
            </div>
          )}
          <Menu
            menuItemStyles={{
              button: {
                height: '35px', // Altura reducida de cada fila
                transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'var(--palette-primary-lighter)',
                  color: 'var(--palette-primary-main)',
                },
                [`&.ps-active`]: {
                  backgroundColor: 'var(--palette-primary-lighter)',
                  borderRight: drawerOpen ? '2px solid' : 'none',
                  borderColor: drawerOpen ? 'var(--palette-primary-main)' : 'transparent',
                  color: 'var(--palette-primary-main)'
                }
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
        </SimpleBarScroll>
      </Sidebar>
    </Box >
  );
};