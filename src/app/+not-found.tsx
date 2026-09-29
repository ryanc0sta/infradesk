import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-3 bg-background">
      <Stack.Screen options={{ title: 'Página não encontrada' }} />
      <Text className="text-foreground">Esta tela não existe.</Text>
      <Link href="/" className="text-base text-brand underline">
        Voltar para o início
      </Link>
    </View>
  );
}
