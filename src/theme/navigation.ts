import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';

import themeColors from './colors';

// A navegação (cabeçalho, fundo entre telas) recebe cores em JavaScript e não lê as variáveis
// CSS. Os valores vêm de src/theme/colors.js, a mesma fonte dos tokens do Tailwind.
const fonts: Theme['fonts'] = {
  regular: { fontFamily: 'Inter_400Regular', fontWeight: '400' },
  medium: { fontFamily: 'Inter_500Medium', fontWeight: '500' },
  bold: { fontFamily: 'Inter_700Bold', fontWeight: '700' },
  heavy: { fontFamily: 'Inter_700Bold', fontWeight: '700' },
};

function navigationColors(palette: typeof themeColors.light) {
  const rgb = (value: string) => `rgb(${value})`;
  return {
    primary: rgb(palette.brand),
    background: rgb(palette.background),
    card: rgb(palette.surface),
    text: rgb(palette.foreground),
    border: rgb(palette.border),
  };
}

export const lightNavigationTheme: Theme = {
  ...DefaultTheme,
  fonts,
  colors: { ...DefaultTheme.colors, ...navigationColors(themeColors.light) },
};

export const darkNavigationTheme: Theme = {
  ...DarkTheme,
  fonts,
  colors: { ...DarkTheme.colors, ...navigationColors(themeColors.dark) },
};
