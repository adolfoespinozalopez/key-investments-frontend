
// Layout
import { MainLayout } from "../core/layout/MainLayout";

import { createBrowserRouter, Navigate } from "react-router-dom";

// Páginas actuales
import { DashboardPage } from "../pages/DashboardPage";
import { PortfolioPage } from "../pages/PortfolioPage";
import { MonedaForm } from "../pages/MonedaForm";
import { LinePage } from "../pages/LinePage";
import { EmpresaPage } from "../pages/definicion/EmpresaPage";
import { MercadoPage } from "../pages/definicion/MercadoPage";
import { PolizaPage } from "../pages/definicion/PolizaPage";
import { AccionesPage } from "../pages/operaciones/renta-variable/Acciones";
import { DepositosPage } from "../pages/operaciones/renta-fija/Depositos";
import { FondosMutuosPage } from "../pages/operaciones/renta-variable/FondosMutuos";
import { BonosPage } from "../pages/operaciones/renta-fija/Bonos";
import { DerivadosPage } from "../pages/operaciones/DerivadosPage";

export const router = createBrowserRouter(
[
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },

      // --- SECCIÓN DEFINICIÓN ---
      {
        path: "empresa", // Empresas
        element: <EmpresaPage />
      },
      {
        path: "mercado", // Mercados
        element: <MercadoPage />
      },
      {
        path: "poliza", // Poliza
        element: <PolizaPage />
      },
      
      // --- SECCIÓN OPERACIONES ---
      {
        path: "operaciones",
        children: [
          {
            path: "renta-variable",
            children: [
              { path: "acciones", element: <AccionesPage /> }, // Reemplazar por componente real
              { path: "fondos-mutuos", element: <FondosMutuosPage /> } // Reemplazar por componente real
            ]
          },
          {
            path: "renta-fija",
            children: [
              { path: "depositos", element: <DepositosPage /> }, // Reemplazar por componente real
              { path: "bonos", element: <BonosPage /> } // Reemplazar por componente real
            ]
          },
          {
            path: "derivados", element: <DerivadosPage /> // Negociación derivados financieros
          }
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

      // Redirección por defecto si la ruta no existe
      {
        path: "*",
        element: <Navigate to="/" replace />
      }
    ]
  }
],{
    basename: "/key-investments-frontend" 
  }
);