import { RouteObject } from 'react-router-dom';

// project imports
import { Loadable } from '@/components/Loadable';
import { lazyImport } from './lazyImport';

// render- Páginas actuales
const LoginPage = Loadable(lazyImport(() => import('@/pages/auth/LoginPage'), 'LoginPage'));
const RegisterPage = Loadable(lazyImport(() => import('@/pages/auth/RegisterPage'), 'RegisterPage'));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes: RouteObject = {
    path: '/',
    children: [
        {
            path: 'login',
            element: <LoginPage />
        },
        {
            path: 'register',
            element: <RegisterPage />
        }
    ]
};

export default LoginRoutes;