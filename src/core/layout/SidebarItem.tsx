import React from 'react'
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ item }: { item: any }) => {
  const location = useLocation();

  // Verificación de seguridad
  if (!item || !item.label) return null;

  const hasChildren = item.children && Array.isArray(item.children) && item.children.length > 0;

  if (hasChildren) {
    return (
      <SubMenu
        key={item.label}
        label={item.label}
        // Si quieres que el icono del SubMenu también tenga el ajuste de tamaño
        icon={item.icon ? React.cloneElement(item.icon, { sx: { fontSize: '18px' } }) : undefined}
      >
        {item.children.map((child: any, index: number) => (
          // Combinamos label y index para una key única y segura
          <SidebarItem key={`${child.label}-${index}`} item={child} />
        ))}
      </SubMenu>
    );
  }

  return (
    <MenuItem
      icon={item.icon ? React.cloneElement(item.icon, { sx: { fontSize: '18px' } }) : undefined}
      // Usamos el componente Link solo si hay un path definido
      component={item.path ? <Link to={item.path} /> : undefined}
      active={location.pathname === item.path}
    >
      {item.label}
    </MenuItem>
  );
};

export default SidebarItem;