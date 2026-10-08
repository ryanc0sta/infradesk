import { router, Stack } from 'expo-router';
import { Palette } from 'lucide-react-native';
import { View } from 'react-native';

import { Button, Text } from '@/components/ui';

// Tela inicial provisória. Na Etapa 2 ela dá lugar ao login e às abas por papel.
export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center gap-8 bg-background p-6">
      <Stack.Screen options={{ title: 'InfraDesk' }} />
      <View className="gap-2">
        <Text variant="display">InfraDesk</Text>
        <Text tone="muted">
          Registro e acompanhamento de problemas de infraestrutura. As telas chegam nas próximas
          etapas.
        </Text>
      </View>
      <Button
        title="Ver a vitrine de componentes"
        icon={Palette}
        onPress={() => router.push('/showcase')}
      />
    </View>
  );
}
