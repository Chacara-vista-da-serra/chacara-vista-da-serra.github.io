import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// O site é publicado na raiz de https://chacara-vista-da-serra.github.io/
export default defineConfig({
  base: '/',
  plugins: [react()],
})
