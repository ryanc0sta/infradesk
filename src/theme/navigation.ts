import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';

// A navegação (cabeçalho, fundo entre telas) recebe cores em JavaScript e não lê as variáveis
// CSS. Estes valores espelham os tokens de global.css; mantenha os dois em sincronia.
const fonts: Theme['fonts'] = {
  regular: { fontFamily: 'Inter_400Regular', fontWeight: '400' },
  medium: { fontFamily: 'Inter_500Medium', fontWeight: '500' },
  bold: { fontFamily: 'Inter_700Bold', fontWeight: '700' },
  heavy: { fontFamily: 'Inter_700Bold', fontWeight: '700' },
};

export const lightNavigationTheme: Theme = {
  ...DefaultTheme,
  fonts,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(194 65 12)', // brand
    background: 'rgb(250 250 250)', // background
    card: 'rgb(255 255 255)', // surface
    text: 'rgb(24 24 27)', // foreground
    border: 'rgb(228 228 231)', // border
  },
};

export const darkNavigationTheme: Theme = {
  ...DarkTheme,
  fonts,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(251 146 60)', // brand
    background: 'rgb(9 9 11)', // background
    card: 'rgb(24 24 27)', // surface
    text: 'rgb(250 250 250)', // foreground
    border: 'rgb(63 63 70)', // border
  },
};
