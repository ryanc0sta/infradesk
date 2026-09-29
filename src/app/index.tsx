import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background">
      <Stack.Screen options={{ title: 'InfraDesk' }} />
      <Text className="text-2xl font-bold text-brand">InfraDesk</Text>
      <Text className="text-muted-foreground">Etapa 1 — NativeWind funcionando</Text>
    </View>
  );
}
