import { RouteObject, Navigate } from "react-router-dom";

// project imports
import { Loadable } from '@/components/Loadable';
import { lazyImport } from '@/app/lazyImport';

//validacion Login
import { AuthGuard } from "@/app/AuthGuard";

// Layout
import { MainLayout } from "@/core/layout/MainLayout";

// render- Páginas actuales
const DashboardPage = Loadable(lazyImport(() => import('@/pages/DashboardPage'), 'DashboardPage'));
const PortfolioPage = Loadable(lazyImport(() => import('@/pages/PortfolioPage'), 'PortfolioPage'));
const MonedaForm = Loadable(lazyImport(() => import('@/pages/MonedaForm'), 'MonedaForm'));
const LinePage = Loadable(lazyImport(() => import('@/pages/LinePage'), 'LinePage'));
const EmpresaPage = Loadable(lazyImport(() => import('@/pages/definicion/EmpresaPage'), 'EmpresaPage'));
const MercadoPage = Loadable(lazyImport(() => import('@/pages/definicion/MercadoPage'), 'MercadoPage'));
const PolizaPage = Loadable(lazyImport(() => import('@/pages/definicion/PolizaPage'), 'PolizaPage'));
//Acciones CRUD
import { AccionesPage } from "@/pages/operaciones/renta-variable/Acciones";
const AccionFormPage = Loadable(lazyImport(() => import('@/pages/operaciones/renta-variable/AccionFormPage'), 'AccionFormPage'));
const DepositosPage = Loadable(lazyImport(() => import('@/pages/operaciones/renta-fija/Depositos'), 'DepositosPage'));
const FondosMutuosPage = Loadable(lazyImport(() => import('@/pages/operaciones/renta-variable/FondosMutuos'), 'FondosMutuosPage'));
const BonosPage = Loadable(lazyImport(() => import('@/pages/operaciones/renta-fija/Bonos'), 'BonosPage'));
const DerivadosPage = Loadable(lazyImport(() => import('@/pages/operaciones/DerivadosPage'), 'DerivadosPage'));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ), 
  children: [
    {
      index: true,
      element: <DashboardPage /> 
    },
    {
      path: 'dashboard',
      element: <DashboardPage />
    },
    // --- SECCIÓN DEFINICIÓN ---
    { path: "empresa", element: <EmpresaPage /> },
    { path: "mercado", element: <MercadoPage /> },
    { path: "poliza", element: <PolizaPage /> },
    
    // --- SECCIÓN OPERACIONES ---
    {
      path: "operaciones",
      children: [
        {
          path: "renta-variable",
          children: [
            { path: "acciones", element: <AccionesPage /> },
            { path: "acciones/crear", element: <AccionFormPage /> },
            { path: "fondos-mutuos", element: <FondosMutuosPage /> }
          ]
        },
        {
          path: "renta-fija",
          children: [
            { path: "depositos", element: <DepositosPage /> },
            { path: "bonos", element: <BonosPage /> }
          ]
        },
        { path: "derivados", element: <DerivadosPage /> }
      ]
    },

    // --- SECCIÓN PROCESOS ---
    {
      path: "procesos",
      children: [
        { path: "moneda", element: <MonedaForm /> },
        { path: "line", element: <PortfolioPage /> }
      ]
    },

    // --- SECCIÓN REPORTES ---
    {
      path: "reportes",
      children: [
        { path: "limites-inversion", element: <LinePage /> }
      ]
    },

    // Redirección por defecto dentro del layout principal
    {
      path: "*",
      element: <Navigate to="/" replace />
    }
  ]
};

export default MainRoutes;