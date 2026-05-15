import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 1. Importamos path para manejar rutas de carpetas

export default defineConfig({
  optimizeDeps: {
    include: [
      '@mui/material/styles',
      '@mui/material/utils',
      '@mui/material/Box',
      'react-pro-sidebar',
      '@emotion/react',
      '@emotion/styled'
    ],
  },
  plugins: [react()],
  base: '/key-investments-frontend/', // Configuración para GitHub Pages
  //base: '/',  // Configuración para desarrollo local/Azure Static Web Apps
  // 2. Añadimos la resolución de alias
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: false,
    port: 5173
  }
})
