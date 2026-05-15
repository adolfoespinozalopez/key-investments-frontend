import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'
import { AppProviders } from '@/app/providers'

//Hoja de estilo personalizada
import './assets/styles/sidebar-fix.css'

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

//Hoja de estilos globales 
import './main.css'

//project imports
import ScrollTop from '@/components/ScrollTop'

// Fuentes
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <ScrollTop>
        <RouterProvider router={router} future={{ v7_startTransition: true }}/>
      </ScrollTop>
    </AppProviders>
  </React.StrictMode>
)