import { router } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Text } from '@/components/ui';

// Marcador simples. O visual do protótipo (foto, três destaques, paginação) chega na Etapa 3.
export default function OnboardingScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-end gap-8 p-6">
        <View className="gap-3">
          <Text variant="overline" tone="brand">
            InfraDesk
          </Text>
          <Text variant="display">Viu um problema? Fotografe e avise.</Text>
          <Text tone="muted">
            Registre problemas de infraestrutura com uma foto e acompanhe até a solução.
          </Text>
        </View>
        <View className="gap-2">
          <Button title="Começar agora" size="lg" onPress={() => router.push('/register')} />
          <Button
            title="Já tenho uma conta"
            variant="ghost"
            onPress={() => router.push('/login')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
