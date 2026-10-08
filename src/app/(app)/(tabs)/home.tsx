import { router } from 'expo-router';
import { House } from 'lucide-react-native';
import { View } from 'react-native';

import { PlaceholderScreen } from '@/components/dev/PlaceholderScreen';
import { Button, FAB } from '@/components/ui';
import { sampleTicketId } from '@/lib/config';

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <PlaceholderScreen
        icon={House}
        title="Início"
        description="Seus chamados, com filtros por status, chegam na Etapa 3."
      >
        <Button
          title={`Abrir o chamado #${sampleTicketId}`}
          variant="secondary"
          onPress={() => router.push(`/tickets/${sampleTicketId}`)}
        />
      </PlaceholderScreen>
      <FAB accessibilityLabel="Novo chamado" onPress={() => router.push('/tickets/new')} />
    </View>
  );
}
