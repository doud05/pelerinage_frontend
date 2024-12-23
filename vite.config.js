import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  define: {
    'process.env': JSON.stringify(process.env), // Injecte les variables d'environnement
  },
});
