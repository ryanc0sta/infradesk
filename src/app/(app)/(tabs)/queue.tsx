import { router } from 'expo-router';
import { Ticket } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/dev/PlaceholderScreen';
import { Button } from '@/components/ui';
import { sampleTicketId } from '@/lib/config';

export default function QueueScreen() {
  return (
    <PlaceholderScreen
      icon={Ticket}
      title="Fila de chamados"
      description="As abas Novos, Meus e Atrasados chegam na Etapa 4."
    >
      <Button
        title={`Abrir o chamado #${sampleTicketId}`}
        variant="secondary"
        onPress={() => router.push(`/tickets/${sampleTicketId}`)}
      />
    </PlaceholderScreen>
  );
}
