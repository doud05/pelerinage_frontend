/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brick: '#A63D40',       // Rouge brique
        offwhite: '#F7F4F2',    // Blanc cassé
        beige: '#E5D5C0',       // Beige doux
        terracotta: '#D48A6A',  // Orange terre cuite
        brown: '#704C3B',       // Marron léger
        olive: '#A2B29F',       // Vert olive doux
        dark: '#2E2E2E',        // Noir profond
        lightgray: '#D9D9D9',   // Gris clair
      },
      fontFamily: {
        classic: ['Georgia', 'serif'], // Typographie classique
      },
      spacing: {
        '4.5': '1.125rem', // Exemple d'espacement personnalisé
      },
      borderRadius: {
        lg: '0.5rem', // Taille par défaut des coins arrondis
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)', // Ombres douces pour les cartes
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugin pour simplifier les styles des formulaires
  ],
};
