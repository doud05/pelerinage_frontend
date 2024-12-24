import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Charge les variables d'environnement depuis le fichier .env
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Définit le port du serveur de développement
    open: true, // Ouvre automatiquement le navigateur
  },
  build: {
    sourcemap: true, // Active les cartes de source pour faciliter le débogage
  },
  define: {
    // Injecte explicitement les variables d'environnement
    'process.env': {
      VITE_API_URL: process.env.VITE_API_URL || 'http://localhost:5000', // URL API par défaut
    },
  },
});
