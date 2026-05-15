import { useNavigate } from 'react-router-dom';
// Si usas SWR, importamos el mutate global para limpiar la caché del menú
import { mutate } from 'swr'; 

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // 1. Remover los elementos específicos del LocalStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // 2. Limpiar estados globales o caché de SWR si fuera necesario
      // Esto evita que al cerrar sesión queden rastros del menú anterior en memoria
      mutate(() => true, undefined, { revalidate: false }); 

      // 3. Redireccionar al Login
      navigate('/login', { replace: true }); // 'replace: true' evita que el usuario regrese con el botón "Atrás" del navegador
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
    }
  };

  return { handleLogout };
};