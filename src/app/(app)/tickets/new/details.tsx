import { router } from 'expo-router';
import { ClipboardList } from 'lucide-react-native';
import { View } from 'react-native';

import { PlaceholderScreen } from '@/components/dev/PlaceholderScreen';
import { Button, Photo } from '@/components/ui';
import { clearDraft, useTicketDraft } from '@/lib/ticket-draft';

// Marcador do segundo passo. O formulário (título, categoria, prioridade e local) é a issue #28.
export default function NewTicketDetailsScreen() {
  const { photos } = useTicketDraft();

  return (
    <PlaceholderScreen
      icon={ClipboardList}
      title="Detalhes do chamado"
      description={`${photos.length} ${photos.length === 1 ? 'foto pronta' : 'fotos prontas'}. O formulário com título, categoria, prioridade e local chega na issue #28.`}
    >
      <View className="flex-row justify-center gap-2">
        {photos.map((photo, index) => (
          <Photo
            key={photo.id}
            source={{ uri: photo.uri }}
            accessibilityLabel={`Foto ${index + 1}`}
            className="h-16 w-16 rounded-lg"
          />
        ))}
      </View>
      <Button title="Voltar para as fotos" variant="secondary" onPress={() => router.back()} />
      <Button
        title="Descartar chamado"
        variant="ghost"
        onPress={() => {
          clearDraft();
          // Fecha o fluxo inteiro de novo chamado e volta para onde a pessoa estava.
          router.dismissAll();
          router.back();
        }}
      />
    </PlaceholderScreen>
  );
}
