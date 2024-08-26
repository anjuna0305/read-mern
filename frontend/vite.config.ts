import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access to the dev server from outside the container
    port: 5173,
    watch: {
      usePolling: true, // Necessary for some Docker environments
    },
  },
})
