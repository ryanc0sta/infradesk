import { router } from 'expo-router';
import { CloudOff, Inbox, ListFilter } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  TicketCard,
  TicketCardSkeleton,
  TicketTile,
  TicketTileSkeleton,
  ViewModeToggle,
} from '@/components/tickets';
import { Chip, EmptyState, FAB, SectionHeader, Text } from '@/components/ui';
import { useMyTickets } from '@/hooks/useMyTickets';
import { useTicketViewMode } from '@/lib/preferences';
import { useSession } from '@/lib/session';
import { matchesFilter, type TicketFilterKey, ticketFilters } from '@/lib/ticket-filters';
import { useThemeColors } from '@/theme/useThemeColors';
import type { TicketListItem } from '@/types/ticket';

export default function HomeScreen() {
  const colors = useThemeColors();
  const { profile } = useSession();
  const { data: tickets, isPending, isError, refetch, isRefetching } = useMyTickets();
  const [filter, setFilter] = useState<TicketFilterKey>('all');
  const [viewMode, setViewMode] = useTicketViewMode();
  const isGrid = viewMode === 'grid';

  // useMemo guarda o resultado e só refaz a conta quando a lista, o filtro ou o modo mudam.
  const visibleTickets = useMemo(() => {
    const filtered: (TicketListItem | null)[] = (tickets ?? []).filter((ticket) =>
      matchesFilter(ticket.status, filter),
    );
    // Na grade, um total ímpar deixaria o último quadro esticado na linha inteira. Um espaço
    // vazio (`null`) no fim completa a linha e mantém todos do mesmo tamanho.
    if (isGrid && filtered.length % 2 === 1) filtered.push(null);
    return filtered;
  }, [tickets, filter, isGrid]);
  const firstName = profile?.full_name.split(' ')[0] ?? '';

  const header = (
    <View className="gap-4 pb-3">
      <View className="gap-0.5">
        <Text variant="display">Olá, {firstName}</Text>
        <Text variant="label" tone="muted">
          Como podemos ajudar hoje?
        </Text>
      </View>

      {/* Os filtros quebram em mais de uma linha, para todos os contadores ficarem à vista
          sem rolar para o lado (o que não dá para fazer com o mouse). */}
      <View className="flex-row flex-wrap gap-2">
        {ticketFilters.map((item) => (
          <Chip
            key={item.key}
            label={item.label}
            count={tickets?.filter((ticket) => matchesFilter(ticket.status, item.key)).length}
            selected={filter === item.key}
            onPress={() => setFilter(item.key)}
          />
        ))}
      </View>

      <SectionHeader
        title="Meus chamados"
        accessory={<ViewModeToggle value={viewMode} onChange={setViewMode} />}
        action={{ label: 'Ver todos', onPress: () => router.push('/search') }}
      />
    </View>
  );

  // O que aparece no lugar da lista quando não há cards para mostrar.
  const empty = isPending ? (
    isGrid ? (
      <View className="gap-2" accessibilityLabel="Carregando chamados">
        <View className="flex-row gap-2">
          <TicketTileSkeleton />
          <TicketTileSkeleton />
        </View>
        <View className="flex-row gap-2">
          <TicketTileSkeleton />
          <TicketTileSkeleton />
        </View>
      </View>
    ) : (
      <View className="gap-2" accessibilityLabel="Carregando chamados">
        <TicketCardSkeleton />
        <TicketCardSkeleton />
        <TicketCardSkeleton />
      </View>
    )
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
        // O número de colunas não pode mudar com a lista montada: trocar a `key` faz o React
        // desmontar a lista de linhas e montar a de grade (e vice-versa).
        key={viewMode}
        data={visibleTickets}
        numColumns={isGrid ? 2 : 1}
        columnWrapperClassName={isGrid ? 'gap-2' : undefined}
        keyExtractor={(ticket, index) => (ticket ? String(ticket.id) : `empty-${index}`)}
        renderItem={({ item }) => {
          if (!item) return <View className="flex-1" />;
          const open = () => router.push(`/tickets/${item.id}`);
          return isGrid ? (
            <TicketTile ticket={item} onPress={open} />
          ) : (
            <TicketCard ticket={item} onPress={open} />
          );
        }}
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
