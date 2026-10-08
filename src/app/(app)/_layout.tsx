import { Stack } from 'expo-router';

// Telas para quem já entrou: as abas e, por cima delas, as telas que abrem em pilha.
export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="tickets/[id]" options={{ title: 'Chamado' }} />
      {/* `presentation: 'modal'` faz a tela subir por cima das abas, em vez de entrar de lado. */}
      <Stack.Screen name="tickets/new" options={{ title: 'Novo chamado', presentation: 'modal' }} />
      <Stack.Screen name="scan" options={{ title: 'Escanear QR Code', presentation: 'modal' }} />
    </Stack>
  );
}
