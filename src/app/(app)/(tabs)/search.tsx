import { Search } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/dev/PlaceholderScreen';

export default function SearchScreen() {
  return (
    <PlaceholderScreen
      icon={Search}
      title="Buscar"
      description="A busca por texto, status, categoria e local chega na Etapa 3."
    />
  );
}
