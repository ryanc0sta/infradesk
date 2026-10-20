import { Stack } from 'expo-router';

// Telas para quem já entrou: as abas e, por cima delas, as telas que abrem em pilha.
export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="tickets/[id]" options={{ title: 'Chamado' }} />
      {/* O novo chamado sobe por cima das abas e ocupa a tela inteira (a câmera precisa dela).
          No Android, `fullScreenModal` vira um modal comum. */}
      <Stack.Screen
        name="tickets/new"
        options={{ headerShown: false, presentation: 'fullScreenModal' }}
      />
      <Stack.Screen name="scan" options={{ title: 'Escanear QR Code', presentation: 'modal' }} />
    </Stack>
  );
}
