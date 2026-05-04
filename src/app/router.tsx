import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import { createBrowserRouter } from 'react-router-dom';

// Ahora puedes combinarlos así:
export const router = createBrowserRouter([MainRoutes, LoginRoutes], { 
  basename: "/key-investments-frontend" 
});