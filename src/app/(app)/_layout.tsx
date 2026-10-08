import { Stack } from 'expo-router';

// Telas para quem já entrou: as abas e, por cima delas, as telas que abrem em pilha.
export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="scan" options={{ title: 'Escanear QR Code', presentation: 'modal' }} />
    </Stack>
  );
}
