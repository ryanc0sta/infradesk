import { router } from 'expo-router';
import { UserPlus } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/dev/PlaceholderScreen';
import { Button } from '@/components/ui';

export default function RegisterScreen() {
  return (
    <PlaceholderScreen
      icon={UserPlus}
      title="Criar conta"
      description="O cadastro com nome, e-mail e senha chega na Etapa 3."
    >
      <Button
        title="Entrar com um perfil de demonstração"
        onPress={() => router.replace('/login')}
      />
    </PlaceholderScreen>
  );
}
