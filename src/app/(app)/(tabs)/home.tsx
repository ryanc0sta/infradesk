import { router } from 'expo-router';
import { CloudOff, Inbox, ListFilter } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TicketCard, TicketCardSkeleton } from '@/components/tickets';
import { Chip, EmptyState, FAB, SectionHeader, Text } from '@/components/ui';
import { useMyTickets } from '@/hooks/useMyTickets';
import { useSession } from '@/lib/session';
import { matchesFilter, type TicketFilterKey, ticketFilters } from '@/lib/ticket-filters';
import { useThemeColors } from '@/theme/useThemeColors';

export default function HomeScreen() {
  const colors = useThemeColors();
  const { profile } = useSession();
  const { data: tickets, isPending, isError, refetch, isRefetching } = useMyTickets();
  const [filter, setFilter] = useState<TicketFilterKey>('all');

  // useMemo guarda o resultado e só refaz a conta quando a lista ou o filtro mudam.
  const visibleTickets = useMemo(
    () => (tickets ?? []).filter((ticket) => matchesFilter(ticket.status, filter)),
    [tickets, filter],
  );
  const firstName = profile?.full_name.split(' ')[0] ?? '';

  const header = (
    <View className="gap-4 pb-3">
      <View className="gap-0.5">
        <Text variant="display">Olá, {firstName}</Text>
        <Text variant="label" tone="muted">
          Como podemos ajudar hoje?
        </Text>
      </View>

      {/* -mx-4 e px-4: a fileira de filtros rola de ponta a ponta da tela, sem cortar na margem. */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="-mx-4"
        contentContainerClassName="gap-2 px-4"
      >
        {ticketFilters.map((item) => (
          <Chip
            key={item.key}
            label={item.label}
            count={tickets?.filter((ticket) => matchesFilter(ticket.status, item.key)).length}
            selected={filter === item.key}
            onPress={() => setFilter(item.key)}
          />
        ))}
      </ScrollView>

      <SectionHeader
        title="Meus chamados"
        action={{ label: 'Ver todos', onPress: () => router.push('/search') }}
      />
    </View>
  );

  // O que aparece no lugar da lista quando não há cards para mostrar.
  const empty = isPending ? (
    <View className="gap-2" accessibilityLabel="Carregando chamados">
      <TicketCardSkeleton />
      <TicketCardSkeleton />
      <TicketCardSkeleton />
    </View>
  ) : isError ? (
    <EmptyState
      icon={CloudOff}
      title="Não foi possível carregar"
      description="Confira a conexão e tente de novo."
      action={{ label: 'Tentar novamente', onPress: () => refetch() }}
    />
  ) : tickets?.length ? (
    <EmptyState
      icon={ListFilter}
      title="Nada neste filtro"
      description="Você não tem chamados nesta situação."
      action={{ label: 'Ver todos', onPress: () => setFilter('all') }}
    />
  ) : (
    <EmptyState
      icon={Inbox}
      title="Nenhum chamado ainda"
      description="Viu um problema? Fotografe e avise a equipe."
      action={{ label: 'Abrir chamado', onPress: () => router.push('/tickets/new') }}
    />
  );

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      {/* FlatList só desenha os cards que estão na tela, o que mantém listas longas leves. */}
      <FlatList
        data={visibleTickets}
        keyExtractor={(ticket) => String(ticket.id)}
        renderItem={({ item }) => (
          <TicketCard ticket={item} onPress={() => router.push(`/tickets/${item.id}`)} />
        )}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        ItemSeparatorComponent={() => <View className="h-2" />}
        contentContainerClassName="p-4 pb-24"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => refetch()}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      />
      <FAB accessibilityLabel="Novo chamado" onPress={() => router.push('/tickets/new')} />
    </SafeAreaView>
  );
}
