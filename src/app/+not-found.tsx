import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-3 bg-white">
      <Stack.Screen options={{ title: 'Página não encontrada' }} />
      <Text className="text-zinc-700">Esta tela não existe.</Text>
      <Link href="/" className="text-base text-orange-700 underline">
        Voltar para o início
      </Link>
    </View>
  );
}
