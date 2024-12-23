import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

// Charge les variables d'environnement
dotenv.config();

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Pour déboguer
  },
  define: {
    // Injecte explicitement les variables d'environnement
    'process.env': {
      VITE_API_URL: process.env.VITE_API_URL,
    },
  },
});
