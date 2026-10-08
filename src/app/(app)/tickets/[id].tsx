import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CloudOff, SearchX } from 'lucide-react-native';
import { View } from 'react-native';

import { TicketDetailView } from '@/components/tickets/TicketDetailView';
import { Button, EmptyState, IconButton, Skeleton } from '@/components/ui';
import { useCancelTicket, useTicket } from '@/hooks/useTicket';
import { useSession } from '@/lib/session';

// Quem chega por um link direto não tem tela anterior para onde voltar.
const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));

// O nome do arquivo entre colchetes vira um parâmetro: /tickets/1042 abre esta tela com id = "1042".
export default function TicketDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // O id vem do endereço, que pode ser digitado ou vir de um link: só aceita números inteiros.
  const ticketId = /^\d+$/.test(id ?? '') ? Number(id) : null;

  const { profile } = useSession();
  const { data: ticket, isPending, isError, refetch } = useTicket(ticketId);
  const cancel = useCancelTicket();

  const canCancel = !!ticket && ticket.author_id === profile?.id && ticket.status === 'open';

  let content;
  if (ticketId === null || ticket === null) {
    // Mesma mensagem para "não existe" e "não é seu": não revela chamados de outras pessoas.
    content = (
      <View className="flex-1 justify-center bg-background">
        <EmptyState
          icon={SearchX}
          title="Chamado não encontrado"
          description="Ele não existe ou você não tem acesso a ele."
          action={{ label: 'Voltar', onPress: goBack }}
        />
      </View>
    );
  } else if (isPending) {
    content = (
      <View className="flex-1 bg-background" accessibilityLabel="Carregando chamado">
        <Skeleton className="aspect-[4/3] w-full rounded-none" />
        <View className="gap-3 p-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-7 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-32 w-full rounded-xl" />
        </View>
      </View>
    );
  } else if (isError || !ticket) {
    content = (
      <View className="flex-1 justify-center bg-background">
        <EmptyState
          icon={CloudOff}
          title="Não foi possível carregar"
          description="Confira a conexão e tente de novo."
          action={{ label: 'Tentar novamente', onPress: () => refetch() }}
        />
        <Button title="Voltar" variant="ghost" onPress={goBack} />
      </View>
    );
  } else {
    content = (
      <TicketDetailView
        ticket={ticket}
        canCancel={canCancel}
        onCancel={() => cancel.mutate(ticket.id)}
        isCancelling={cancel.isPending}
        cancelError={cancel.error instanceof Error ? cancel.error.message : null}
      />
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: ticketId === null ? 'Chamado' : `Chamado #${ticketId}`,
          // Sem tela anterior (link direto), o cabeçalho não mostra a seta: esta leva ao início.
          headerLeft: router.canGoBack()
            ? undefined
            : () => (
                <IconButton
                  icon={ArrowLeft}
                  accessibilityLabel="Ir para o início"
                  onPress={() => router.replace('/')}
                />
              ),
        }}
      />
      {content}
    </>
  );
}
