import '../../global.css';

import { Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { interFonts } from '@/theme/fonts';
import { darkNavigationTheme, lightNavigationTheme } from '@/theme/navigation';

// Mantém a tela de abertura visível até as fontes carregarem.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(interFonts);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  // Na web, os tokens escuros (`.dark:root` em global.css) só valem com a classe `dark` no <html>.
  useEffect(() => {
    if (Platform.OS === 'web') document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ThemeProvider value={isDark ? darkNavigationTheme : lightNavigationTheme}>
      <Stack />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
