import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Pour déboguer
  },
  define: {
    'process.env': process.env, // Inclut toutes les variables d'environnement
  },
});    
