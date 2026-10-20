import { Stack } from 'expo-router';

// Passos do novo chamado. Hoje: câmera → detalhes. Na Etapa 7 entra o mapa antes da câmera.
export default function NewTicketLayout() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: 'Detalhes do chamado' }} />
    </Stack>
  );
}
