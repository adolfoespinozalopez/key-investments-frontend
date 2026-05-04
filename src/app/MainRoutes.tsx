// third-party
import { RouteObject, Navigate } from "react-router-dom";

// Layout
import { MainLayout } from "../core/layout/MainLayout";

// Páginas actuales
import { DashboardPage } from "../pages/DashboardPage";
import { PortfolioPage } from "../pages/PortfolioPage";
import { MonedaForm } from "../pages/MonedaForm";
import { LinePage } from "../pages/LinePage";
import { EmpresaPage } from "../pages/definicion/EmpresaPage";
import { MercadoPage } from "../pages/definicion/MercadoPage";
import { PolizaPage } from "../pages/definicion/PolizaPage";
import { AccionesPage } from "../pages/operaciones/renta-variable/Acciones";
import { AccionFormPage } from "../pages/operaciones/renta-variable/AccionFormPage";
import { DepositosPage } from "../pages/operaciones/renta-fija/Depositos";
import { FondosMutuosPage } from "../pages/operaciones/renta-variable/FondosMutuos";
import { BonosPage } from "../pages/operaciones/renta-fija/Bonos";
import { DerivadosPage } from "../pages/operaciones/DerivadosPage";

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      index: true,
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