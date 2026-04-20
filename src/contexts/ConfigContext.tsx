import { createContext, useMemo, ReactNode } from 'react';

// project imports
import config from '../config';
import { useLocalStorage } from '../hooks/useLocalStorage';

// 1. Interfaz para el estado - Agregamos flexibilidad
export interface ConfigProps {
  fontFamily: string;
  presetColor: string;
  container: boolean;
  mode: string;
  [key: string]: any; // Evita errores si config.ts tiene más campos
}

// 2. Interfaz para el contexto
interface ConfigContextType {
  state: ConfigProps;
  setState: (state: ConfigProps) => void;
  setField: (fieldName: string, value: any) => void;
  resetState: () => void;
}

// Inicializamos con un casting para evitar errores en el Provider
export const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType);

// 3. Componente Provider
interface ConfigProviderProps {
  children: ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  // Asegúrate de que useLocalStorage acepte el genérico <ConfigProps>
  const { state, setState, setField, resetState } = useLocalStorage<ConfigProps>(
    'key-frontend-pro-config', 
    config as ConfigProps // Forzamos el tipo del default para que coincida con el hook
  );

  const memoizedValue = useMemo<ConfigContextType>(
    () => ({ 
      state, 
      setState, 
      setField, 
      resetState 
    }),
    [state, setField, setState, resetState]
  );

  return (
    <ConfigContext.Provider value={memoizedValue}>
      {children}
    </ConfigContext.Provider>
  );
}