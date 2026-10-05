import { useColorScheme } from 'nativewind';

import themeColors from './colors';

export type ColorToken = keyof typeof themeColors.light;

/**
 * Cores do tema atual em JavaScript, para o que não aceita `className`: ícones SVG,
 * `placeholderTextColor`, tema da navegação. Ex.: `const colors = useThemeColors(); colors.brand`.
 */
export function useThemeColors(): Record<ColorToken, string> {
  const { colorScheme } = useColorScheme();
  const palette = colorScheme === 'dark' ? themeColors.dark : themeColors.light;
  return Object.fromEntries(
    Object.entries(palette).map(([name, rgb]) => [name, `rgb(${rgb})`]),
  ) as Record<ColorToken, string>;
}
