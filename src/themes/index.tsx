import { ReactNode, useMemo } from 'react';

// material-ui
import { createTheme, StyledEngineProvider, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// project imports
import useConfig from '../hooks/useConfig';
import CustomShadows from './custom-shadows';
import { buildPalette } from './palette';
import Typography from './typography';

// ==============================|| TYPES ||============================== //

interface ThemeCustomizationProps {
  children: ReactNode;
}

// ==============================|| DEFAULT THEME - MAIN ||============================== //

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const { state } = useConfig();

  // 1. Tipamos los resultados de las funciones para evitar 'any'
  const themeTypography = useMemo(() => Typography(state.fontFamily), [state.fontFamily]);
  const palette = useMemo(() => buildPalette(state.presetColor), [state.presetColor]);

  // 2. Usamos el tipo ThemeOptions de MUI para validar la estructura del objeto
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440
        }
      },
      direction: 'ltr' as const, // Forzamos el literal 'ltr'
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      typography: themeTypography,
      colorSchemes: {
        light: {
          palette: palette.light,
          // Aquí inyectamos nuestras sombras personalizadas
          customShadows: CustomShadows(palette.light, 'light')
        }
      },
      cssVariables: {
        cssVarPrefix: '',
        colorSchemeSelector: 'data-color-scheme'
      }
    }),
    [themeTypography, palette]
  );

  // 3. Creamos el tema con las opciones validadas
  const themes = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      {/* Nota: En MUI v6, el ThemeProvider con colorSchemes 
          maneja automáticamente el modo light/dark 
      */}
      <ThemeProvider 
        theme={themes} 
        disableTransitionOnChange 
        defaultMode="light"
      >
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}