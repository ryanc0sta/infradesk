/** @type {import('tailwindcss').Config} */
module.exports = {
  // Arquivos onde o Tailwind procura classes usadas em `className`.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  // 'class' permite trocar o tema manualmente (opção no Perfil) além de seguir o sistema.
  // Com o padrão 'media', o NativeWind lança erro na web ao definir o esquema de cores.
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
