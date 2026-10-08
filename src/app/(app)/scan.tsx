import { router } from 'expo-router';
import { QrCode } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/dev/PlaceholderScreen';
import { Button } from '@/components/ui';

export default function ScanScreen() {
  return (
    <PlaceholderScreen
      icon={QrCode}
      title="Escanear QR Code"
      description="A leitura do QR Code das salas com a câmera chega na Etapa 7."
    >
      <Button title="Fechar" variant="secondary" onPress={() => router.back()} />
    </PlaceholderScreen>
  );
}
