import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  // 1. Verificamos si existe el token en el localStorage
  const token = localStorage.getItem('token');
  const location = useLocation();

  // 2. Si no hay token, redirigimos al login
  if (!token) {
    // Guardamos la ubicación actual para redirigir al usuario después de que haga login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Si hay token, renderizamos los componentes hijos (MainLayout y rutas internas)
  return <>{children}</>;
}