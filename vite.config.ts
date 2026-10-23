import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// O site é publicado em https://winicius777.github.io/chacara-vista-da-serra/
// Se mudar para um domínio próprio, troque `base` para '/'.
export default defineConfig({
  base: '/chacara-vista-da-serra/',
  plugins: [react()],
})
