import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: [
      '440a-2001-448a-6020-aed2-1c49-29b4-2756-83ae.ngrok-free.app', // Host dari ngrok
    ],
  },
})
