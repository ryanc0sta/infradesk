import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Pressable, Text, View } from 'react-native';

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background px-6">
      <Stack.Screen options={{ title: 'InfraDesk' }} />
      <Text className="font-sans-bold text-2xl text-brand">InfraDesk</Text>
      <Text className="font-sans text-muted-foreground">Etapa 1 — fonte Inter e tema escuro</Text>

      {/* Provisório: facilita o teste do tema. A opção definitiva fica no Perfil. */}
      <Pressable
        onPress={toggleColorScheme}
        accessibilityRole="button"
        className="min-h-11 justify-center rounded-2xl bg-primary px-5"
      >
        <Text className="font-sans-semibold text-primary-foreground">
          Tema atual: {colorScheme === 'dark' ? 'escuro' : 'claro'} — alternar
        </Text>
      </Pressable>
    </View>
  );
}
