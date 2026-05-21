import { createBrowserRouter } from 'react-router-dom';

//project imports
import MainRoutes from '@/app/MainRoutes';
import LoginRoutes from '@/app/LoginRoutes';

export const router = createBrowserRouter([MainRoutes, LoginRoutes], { 
  basename: "/" 
});