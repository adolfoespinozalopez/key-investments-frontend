import { useState, useEffect, useCallback } from 'react';

// ==============================|| LOCAL STORAGE HOOKS ||============================== //

// Usamos un genérico <T> para que el hook sea flexible con cualquier tipo de objeto
export function useLocalStorage<T>(key: string, defaultValue: T) {
  
  // Load initial state from localStorage or fallback to default
  const readValue = (): T => {
    if (typeof window === 'undefined') return defaultValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.warn(`Error reading localStorage key “${key}”:`, err);
      return defaultValue;
    }
  };

  const [state, setState] = useState<T>(readValue);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.warn(`Error setting localStorage key “${key}”:`, err);
    }
  }, [key, state]);

  // Update single field
  // Usamos keyof T para que TS sepa que solo puedes editar campos que existan en el objeto
  const setField = useCallback(<K extends keyof T>(fieldName: K, value: T[K]) => {
    setState((prev) => ({
      ...prev,
      [fieldName]: value
    }));
  }, []);

  // Reset to defaults
  const resetState = useCallback(() => {
    setState(defaultValue);
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }, [defaultValue, key]);

  return { state, setState, setField, resetState };
}