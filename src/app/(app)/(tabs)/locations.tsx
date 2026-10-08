import { MapPin } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/dev/PlaceholderScreen';

export default function LocationsScreen() {
  return (
    <PlaceholderScreen
      icon={MapPin}
      title="Locais"
      description="A lista de locais com chamados abertos chega na Etapa 4."
    />
  );
}
