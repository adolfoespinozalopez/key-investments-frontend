import { useEffect, useState, ReactElement, ElementType } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { SxProps, Theme } from '@mui/material';

// project imports
import MainCard from '../MainCard';
import { navigation } from '../../core/layout/navigation';

// assets
import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import HomeFilled from '@mui/icons-material/HomeFilled';

// ==============================|| TYPES ||============================== //

interface NavItemType {
  label: string;
  path?: string;
  icon?: ReactElement;
  children?: NavItemType[];
  breadcrumbs?: boolean; // Añadido para control de visibilidad
}

interface BreadcrumbLink {
  title: string;
  to?: string;
  icon?: ReactElement;
}

interface BreadcrumbsProps {
  card?: boolean;
  custom?: boolean;
  divider?: boolean;
  heading?: string;
  icon?: boolean;
  icons?: boolean;
  links?: BreadcrumbLink[];
  maxItems?: number;
  rightAlign?: boolean;
  separator?: ElementType;
  title?: boolean;
  titleBottom?: boolean;
  sx?: SxProps<Theme>;
  [key: string]: any;
}

// ==============================|| BREADCRUMBS COMPONENT ||============================== //

export default function Breadcrumbs({
  card = false,
  custom = false,
  divider = false,
  heading,
  icon,
  icons,
  links,
  maxItems,
  rightAlign,
  separator,
  title = true,
  titleBottom = true,
  sx,
  ...others
}: BreadcrumbsProps) {
  const theme = useTheme();
  const location = useLocation();

  // Cambiamos el estado para manejar una lista de ancestros
  const [ancestors, setAncestors] = useState<NavItemType[]>([]);
  const [item, setItem] = useState<NavItemType>();

  const iconSX = {
    marginRight: theme.spacing(0.75),
    marginLeft: 0,
    width: '1rem',
    height: '1rem',
    color: (theme as any).vars?.palette?.secondary?.main || theme.palette.secondary.main
  };

  useEffect(() => {
    const findPath = (
      items: NavItemType[], 
      currentPath: string, 
      parents: NavItemType[] = []
    ): boolean => {
      for (const node of items) {
        if (node.path === currentPath && currentPath !== '/') {
          setAncestors(parents); // Guardamos toda la cadena de padres
          setItem(node);
          return true;
        }
        if (node.children) {
          if (findPath(node.children, currentPath, [...parents, node])) {
            return true;
          }
        }
      }
      return false;
    };

    if (!custom) {
      setAncestors([]); // Limpiar antes de buscar
      setItem(undefined);
      findPath(navigation, location.pathname);
    }
  }, [location.pathname, custom]);

  const SeparatorIcon = separator as React.ElementType;
  const separatorIcon = separator ? <SeparatorIcon style={{ fontSize: '0.75rem', marginTop: 2 }} /> : '/';

  let breadcrumbContent: ReactElement = <Typography />;

  if (item && item.label && (item.path || custom)) {
    
    let tempContent = (
      <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
        {/* ICONO DE INICIO */}
        <Typography 
          component={Link} 
          to="/" 
          color="text.secondary" 
          variant="h6" 
          sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <HomeOutlined style={{ ...iconSX, marginRight: 0 }} />
        </Typography>

        {/* RENDERIZADO DINÁMICO DE PADRES (NIVELES INTERMEDIOS) */}
        {ancestors.map((ancestor, index) => (
          <Typography
            key={index}
            component={Link}
            to={ancestor.path || '#'}
            variant="h6"
            sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            color="text.secondary"
          >
            {icons && ancestor.icon && <span style={iconSX}>{ancestor.icon}</span>}
            {ancestor.label}
          </Typography>
        ))}

        {/* PÁGINA ACTUAL */}
        <Typography variant="subtitle1" color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          {icons && item.icon && <span style={iconSX}>{item.icon}</span>}
          {item.label}
        </Typography>
      </MuiBreadcrumbs>
    );
    
    // Manejo de links personalizados (custom)
    if (custom && links && links.length > 0) {
      tempContent = (
        <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
          {links.map((link, index) => (
            <Typography
              key={index}
              {...(link.to && { component: Link, to: link.to })}
              variant={!link.to ? 'subtitle1' : 'h6'}
              sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
              color={!link.to ? 'text.primary' : 'text.secondary'}
            >
              {link.icon && <span style={iconSX}>{link.icon}</span>}
              {link.title}
            </Typography>
          ))}
        </MuiBreadcrumbs>
      );
    }

    if (item.breadcrumbs !== false || custom) {
      breadcrumbContent = (
        <MainCard
          border={card}
          sx={card === false ? { mb: 1.5, bgcolor: 'inherit', backgroundImage: 'none', ...sx } : { mb: 2, ...sx }}
          {...others}
          content={card}
          shadow="none"
        >
          <Grid container direction={rightAlign ? 'row' : 'column'} spacing={1} sx={{ justifyContent: rightAlign ? 'space-between' : 'flex-start', alignItems: rightAlign ? 'center' : 'flex-start' }}>
            {title && !titleBottom && (
              <Grid>
                <Typography variant="h2">{custom ? heading : item.label}</Typography>
              </Grid>
            )}
            <Grid>{tempContent}</Grid>
          </Grid>
          {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
}