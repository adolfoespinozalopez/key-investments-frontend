// 1. Los imports SIEMPRE deben ir en la parte superior del archivo
import { presetPalettes } from '@ant-design/colors';

// project imports
import ThemeOption, { PresetColors } from './theme'; // Asegúrate de importar el tipo también
import { extendPaletteWithChannels } from '../utils/colorUtils';

const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];

// ==============================|| GREY COLORS BUILDER ||============================== //

function buildGrey(): string[] {
  const greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000'
  ];
  const greyConstant = ['#fafafb', '#e6ebf1'];

  return [...greyPrimary, ...greyAscent, ...greyConstant];
}

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

/**
 * Genera la paleta de colores para el tema.
 * @param presetColor - El nombre del color del tema (ej: 'blue', 'red', etc.)
 */
export function buildPalette(presetColor: string) {
  const grey = buildGrey();
  
  // Forzamos el tipo para que coincida con lo que espera ThemeOption
  const lightColors = { ...presetPalettes, grey } as unknown as PresetColors;
  
  // Ahora esta línea ya no debería marcar error
  const lightPaletteColor = ThemeOption(lightColors);

  const commonColor = { common: { black: '#000', white: '#fff' } };

  // Extendemos la paleta para soportar variables CSS (MUI v6)
  const extendedLight = extendPaletteWithChannels(lightPaletteColor);
  const extendedCommon = extendPaletteWithChannels(commonColor);

  return {
    light: {
      mode: 'light',
      ...extendedCommon,
      ...extendedLight,
      text: {
        primary: extendedLight.grey[700],
        secondary: extendedLight.grey[500],
        disabled: extendedLight.grey[400]
      },
      action: { 
        disabled: extendedLight.grey[300] 
      },
      divider: extendedLight.grey[200],
      background: {
        paper: extendedLight.grey[0],
        // Usamos una aserción de tipo para evitar errores con propiedades personalizadas como A50
        default: (extendedLight.grey as any).A50 || extendedLight.grey[50]
      }
    }
  };
}