import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-2 bg-white">
      <Stack.Screen options={{ title: 'InfraDesk' }} />
      <Text className="text-2xl font-bold text-orange-700">InfraDesk</Text>
      <Text className="text-zinc-600">Etapa 1 — NativeWind funcionando</Text>
    </View>
  );
}
