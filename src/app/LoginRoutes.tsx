import { lazy } from 'react';

// third-party
import { RouteObject } from 'react-router-dom';

// project imports
import Loadable from '@/components/Loadable';

// jwt auth - Ajustamos las rutas con tus alias
const LoginPage = Loadable(lazy(() =>
    import('@/pages/auth/LoginPage').then(module => ({ default: module.LoginPage }))
));
const RegisterPage = Loadable(lazy(() =>
    import('@/pages/auth/RegisterPage').then(module => ({ default: module.RegisterPage }))
));

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