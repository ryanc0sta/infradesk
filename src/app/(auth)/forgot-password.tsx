import { router } from 'expo-router';
import { KeyRound } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/dev/PlaceholderScreen';
import { Button } from '@/components/ui';

export default function ForgotPasswordScreen() {
  return (
    <PlaceholderScreen
      icon={KeyRound}
      title="Recuperar senha"
      description="O envio do link de recuperação chega na Etapa 3."
    >
      <Button title="Voltar para o login" variant="secondary" onPress={() => router.back()} />
    </PlaceholderScreen>
  );
}
