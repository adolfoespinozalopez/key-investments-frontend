import { JSX } from 'react';

// material-ui
import { styled, Theme, useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

// project imports
import Logo from '@/components/logo/LogoSection';

// ==============================|| TYPES ||============================== //

interface SidebarHeaderProps {
    open: boolean;
}

/**
 * Extendemos BoxProps para que el componente estilizado 
 * reconozca la prop 'open'.
 */
interface StyledBoxProps extends BoxProps {
    open?: boolean;
}

// ==============================|| STYLED COMPONENTS ||============================== //

const SidebarHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open'})<StyledBoxProps>(({ theme }) => ({
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(0),
    position: 'sticky',
    top: 0,
    zIndex: 1200,
    backgroundColor: theme.palette.background.paper,
    // Nota: MUI v6 usa variants, para versiones anteriores se usa condicionales directos
    variants: [
        {
            props: ({ open }) => open,
            style: {
                justifyContent: 'flex-start',
                paddingLeft: theme.spacing(3)
            }
        }
    ]
}));

// ==============================|| MAIN COMPONENT ||============================== //

const SidebarHeader = ({ open }: SidebarHeaderProps): JSX.Element => {
    const theme = useTheme<Theme>();

    // --- NAMED EXPRESSIONS: Configuración de Estilos ---
    const headerSx = {
        minHeight: '60px',
        width: 'initial',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: open ? '24px' : 0
    };

    // --- NAMED EXPRESSIONS: Componentes hijos ---
    const LogoContent = (
        <Logo
            isIcon={!open}
            sx={{
                width: open ? 'auto' : 35,
                height: 35
            }}
        />
    );

    // --- RENDER ---
    return (
        <SidebarHeaderStyled open={open} sx={headerSx}>
            {LogoContent}
        </SidebarHeaderStyled>
    );
};

export default SidebarHeader;