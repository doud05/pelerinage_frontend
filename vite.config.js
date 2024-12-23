import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Pour déboguer
  },
  define: {
   'import.meta.env': import.meta.env, // Inclut toutes les variables d'environnement
  },
});    
