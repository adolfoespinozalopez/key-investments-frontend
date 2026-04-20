import { Menu, MenuItem, SubMenu, Sidebar, sidebarClasses } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { navigation } from "./navigation";
import { Typography } from "@mui/material";

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

export const AppSidebar = ({
  collapsed,
  toggled,
  setToggled
}: {
  collapsed: boolean;
  toggled: boolean;
  setToggled: (value: boolean) => void;
}) => {
  return (
    <Sidebar
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      breakPoint="md"
      backgroundColor="#fff"
      rootStyles={{
        color: '#607489',
        width: '280px', 
        minWidth: '280px',
        // Fix opcional: ocultar el punto en colapsado si no lo hiciste por CSS global
        [`.${sidebarClasses.collapsed} .ps-submenu-expand-icon`]: {
          display: 'none',
        },
      }}
    >
      {/* Renderizado condicional: 
          Si NOT collapsed (!collapsed), entonces muestra el div 
      */}
      {!collapsed && (
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
          },
          icon: {
            // Aplicamos el tamaño directamente al SVG interno
            '& svg': {
              fontSize: '18px', // Prueba con 18px o 16px
              width: '18px',
              height: '18px',
            },
            // También definimos el contenedor
            display: 'flex',
            justifyContent: 'center',
            color: '#022950',
            width: '20px',    // Define un ancho fijo para que todos se alineen igual
            height: '20px',   // Define una altura fija para mantener la proporción
            minWidth: '15px'
            
          }
        }}
      >
        {navigation.map((item, index) => (
          <SidebarItem key={`${item.label}-${index}`} item={item} />
        ))}
      </Menu>
    </Sidebar>
  );
};