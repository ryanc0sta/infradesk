import { Stack } from 'expo-router';

// Telas para quem ainda não entrou. A primeira da lista é a tela inicial do grupo.
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Entrar' }} />
      <Stack.Screen name="register" options={{ title: 'Criar conta' }} />
      <Stack.Screen name="forgot-password" options={{ title: 'Recuperar senha' }} />
    </Stack>
  );
}
