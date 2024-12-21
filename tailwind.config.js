/** @type {import('tailwindcss').Config} */
module.exports = {
  // Définir les fichiers dans lesquels Tailwind doit rechercher les classes utilisées
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Palette de couleurs personnalisée pour correspondre à la charte graphique
      colors: {
        brick: '#A63D40',       // Rouge brique (accent principal)
        offwhite: '#F7F4F2',    // Blanc cassé (fond principal)
        beige: '#E5D5C0',       // Beige doux (fond secondaire ou neutre)
        terracotta: '#D48A6A',  // Orange terre cuite (pour les boutons ou alertes)
        brown: '#704C3B',       // Marron léger (textes ou bordures)
        olive: '#A2B29F',       // Vert olive doux (éléments d'accentuation)
        dark: '#2E2E2E',        // Noir profond (texte principal ou titres)
        lightgray: '#D9D9D9',   // Gris clair (arrière-plans ou séparateurs)
      },
      // Typographies personnalisées pour uniformiser les styles de texte
      fontFamily: {
        classic: ['Georgia', 'serif'], // Typographie classique pour un rendu élégant
      },
      // Espacements personnalisés pour un design plus flexible
      spacing: {
        '4.5': '1.125rem', // Exemple de taille intermédiaire entre 4 et 5
      },
      // Rayons de bordure personnalisés pour un design moderne et doux
      borderRadius: {
        lg: '0.5rem', // Coins arrondis par défaut
      },
      // Ombres personnalisées pour améliorer la hiérarchie visuelle des éléments
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)', // Ombre douce pour les cartes et modales
      },
    },
  },
  // Plugins supplémentaires pour étendre les fonctionnalités de Tailwind
  plugins: [
    require('@tailwindcss/forms'), // Simplifie le style des formulaires natifs
  ],
};
