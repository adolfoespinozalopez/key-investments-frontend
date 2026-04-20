
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  server: {
    host: false,
    port: 5173
  }
})
