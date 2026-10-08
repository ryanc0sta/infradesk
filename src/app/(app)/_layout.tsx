import { Stack } from 'expo-router';

// Telas para quem já entrou. As abas por papel chegam na issue #19.
export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'InfraDesk' }} />
    </Stack>
  );
}
