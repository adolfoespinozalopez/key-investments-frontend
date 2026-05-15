import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// 1. Definimos la interfaz del estado del menú
export interface MenuMasterState {
  isDashboardDrawerOpened: boolean;
}

const initialState: MenuMasterState = {
  isDashboardDrawerOpened: false
};

const endpoints = {
  key: 'api/menu',
  master: 'master'
};

// Combinamos la llave en una constante única y limpia
const MENU_MASTER_KEY = `${endpoints.key}/${endpoints.master}`;

// 2. Custom Hook con tipado estricto
export const useGetMenuMaster = () => {
  const { data, isLoading } = useSWR<MenuMasterState>(
    MENU_MASTER_KEY, 
    () => initialState, 
    {
      fallbackData: initialState,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      // La comparación por stringify es excelente para evitar re-renders en objetos
      compare: (a, b) => JSON.stringify(a) === JSON.stringify(b) 
    }
  );
  
  // Named expression memoizada
  const memoizedValue = useMemo(
    () => ({
      menuMaster: data ?? initialState, // Doble protección anti-undefined
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
};

// 3. Mutador global con tipo booleano estricto
export const handlerDrawerOpen = (isDashboardDrawerOpened: boolean) => {
  mutate<MenuMasterState>(
    MENU_MASTER_KEY,
    (currentMenuMaster) => {
      // Manejo seguro por si el caché está completamente vacío en algún punto
      const baseState = currentMenuMaster ?? initialState;
      return { ...baseState, isDashboardDrawerOpened };
    },
    { revalidate: false } // 🚀 CORRECCIÓN: Ahora es un objeto de configuración
  );
};