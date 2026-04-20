import { useContext } from 'react'; // Cambiamos 'use' por 'useContext'
import { ConfigContext } from '../contexts/ConfigContext';

// ==============================|| CONFIG - HOOKS ||============================== //

export default function useConfig() {
  const context = useContext(ConfigContext);

  // Esta validación es excelente y debes mantenerla
  if (!context) {
    throw new Error('useConfig must be used inside ConfigProvider');
  }

  return context;
}