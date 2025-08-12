import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default {
  plugins: [react({
    // automáticamente usa el nuevo transform JSX
    jsxRuntime: 'automatic'
  })],
  base: './',
}