import '../../global.css';

import { Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { colorScheme as nativewindColorScheme, useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Platform, useColorScheme as useSystemColorScheme } from 'react-native';

import { interFonts } from '@/theme/fonts';
import { darkNavigationTheme, lightNavigationTheme } from '@/theme/navigation';

// Mantém a tela de abertura visível até as fontes carregarem.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(interFonts);
  const { colorScheme } = useColorScheme();
  const systemColorScheme = useSystemColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  // Na web, com darkMode 'class', o NativeWind começa fixo no tema claro e só aplica os tokens
  // escuros com a classe `dark` no <html>, que ele mesmo põe e tira ao receber 'dark'/'light'.
  // Aqui repassamos o tema do sistema. (No celular ele já segue o sistema sozinho.)
  useEffect(() => {
    if (Platform.OS === 'web')
      nativewindColorScheme.set(systemColorScheme === 'dark' ? 'dark' : 'light');
  }, [systemColorScheme]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ThemeProvider value={isDark ? darkNavigationTheme : lightNavigationTheme}>
      <Stack />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
