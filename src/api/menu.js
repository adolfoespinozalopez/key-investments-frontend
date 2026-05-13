import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

const initialState = {
  isDashboardDrawerOpened: false
};

const endpoints = {
  key: 'api/menu',
  master: 'master',
  dashboard: '/dashboard' // server URL
};

export function useGetMenuMaster() {
  const { data, isLoading } = useSWR(
    endpoints.key + endpoints.master, 
    () => initialState, // ✅ Restauramos la función que devuelve el estado inicial
    {
      fallbackData: initialState,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      compare: (a, b) => JSON.stringify(a) === JSON.stringify(b) // Opcional: evita re-renders innecesarios
    }
  );
  
  const memoizedValue = useMemo(
    () => ({
      menuMaster: data,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster) => {
      return { ...currentMenuMaster, isDashboardDrawerOpened };
    },
    false
  );
}
