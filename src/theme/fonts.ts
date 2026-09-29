// Importa cada peso pelo subcaminho: importar do pacote raiz embutiria todos os 18 arquivos da Inter.
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';

/**
 * Pesos da Inter carregados no app. Cada peso é uma família separada, porque no Android
 * `fontWeight` não escolhe o arquivo certo de uma fonte carregada por nome.
 * Use as classes `font-sans`, `font-sans-medium`, `font-sans-semibold` e `font-sans-bold`
 * (tailwind.config.js) em vez de `font-bold` & cia.
 */
export const interFonts = {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
};
