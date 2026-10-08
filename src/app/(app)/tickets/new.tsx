import { router } from 'expo-router';
import { Camera } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/dev/PlaceholderScreen';
import { Button } from '@/components/ui';

export default function NewTicketScreen() {
  return (
    <PlaceholderScreen
      icon={Camera}
      title="Novo chamado"
      description="A câmera e o formulário (foto primeiro, depois os detalhes) chegam na Etapa 3."
    >
      <Button title="Fechar" variant="secondary" onPress={() => router.back()} />
    </PlaceholderScreen>
  );
}
