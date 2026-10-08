import { router, Stack, useLocalSearchParams } from 'expo-router';
import { FileText, SearchX } from 'lucide-react-native';

import { PlaceholderScreen } from '@/components/dev/PlaceholderScreen';
import { Button } from '@/components/ui';

// O nome do arquivo entre colchetes vira um parâmetro: /tickets/1042 abre esta tela com id = "1042".
export default function TicketDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // O id vem do endereço, que pode ser digitado ou vir de um link: só aceita números inteiros.
  const isValid = /^\d+$/.test(id ?? '');

  // Quem chega por um link direto não tem tela anterior para onde voltar.
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));

  if (!isValid) {
    return (
      <PlaceholderScreen
        icon={SearchX}
        title="Chamado não encontrado"
        description="O endereço não corresponde a um número de protocolo."
      >
        <Button title="Voltar" variant="secondary" onPress={goBack} />
      </PlaceholderScreen>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: `Chamado #${id}` }} />
      <PlaceholderScreen
        icon={FileText}
        title={`Chamado #${id}`}
        description="As fotos, o histórico e os comentários do chamado chegam na Etapa 3."
      >
        <Button title="Voltar" variant="secondary" onPress={goBack} />
      </PlaceholderScreen>
    </>
  );
}
