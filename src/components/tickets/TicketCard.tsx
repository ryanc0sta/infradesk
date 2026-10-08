import { MapPin } from 'lucide-react-native';
import { Pressable, type PressableProps, View } from 'react-native';

import { Photo, Skeleton, Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatLocation, formatRelativeTime } from '@/lib/format';
import { priorityLabels, statusLabels } from '@/lib/ticket-labels';
import { useThemeColors } from '@/theme/useThemeColors';
import type { TicketListItem } from '@/types/ticket';

import { CategoryIcon } from './CategoryIcon';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';

const cardClassName = 'flex-row gap-3 rounded-xl border border-border bg-surface p-3';

export type TicketCardProps = Omit<PressableProps, 'children'> & {
  ticket: TicketListItem;
  className?: string;
};

/**
 * Chamado em uma linha da lista, feito para ser lido de relance, em três linhas:
 * protocolo, status e tempo; depois o título; depois o local e a prioridade.
 */
export function TicketCard({ ticket, className, ...props }: TicketCardProps) {
  const colors = useThemeColors();
  const location = formatLocation(ticket.location);
  const time = formatRelativeTime(ticket.created_at);

  return (
    <Pressable
      accessibilityRole="button"
      // Um rótulo só para o card inteiro: o leitor de tela lê a frase completa de uma vez.
      accessibilityLabel={`Chamado ${ticket.id}: ${ticket.title}. ${statusLabels[ticket.status]}. Prioridade ${priorityLabels[ticket.priority]}. ${location}. Aberto ${time}.`}
      className={cn(cardClassName, 'active:bg-surface-muted', className)}
      {...props}
    >
      {ticket.cover ? (
        <Photo source={ticket.cover} className="h-14 w-14 rounded-lg" />
      ) : (
        <View className="h-14 w-14 items-center justify-center rounded-lg bg-surface-muted">
          <CategoryIcon name={ticket.category.icon} size={22} color={colors['muted-foreground']} />
        </View>
      )}

      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-2">
          <Text variant="caption" tone="muted" tabular>
            #{ticket.id}
          </Text>
          <StatusBadge status={ticket.status} />
          <Text variant="caption" tone="muted" tabular className="flex-1 text-right">
            {time}
          </Text>
        </View>
        <Text variant="strong" numberOfLines={1}>
          {ticket.title}
        </Text>
        <View className="flex-row items-center gap-2">
          <View className="flex-1 flex-row items-center gap-1">
            <MapPin size={12} color={colors['muted-foreground']} />
            <Text variant="caption" tone="muted" numberOfLines={1} className="flex-1">
              {location}
            </Text>
          </View>
          <PriorityBadge priority={ticket.priority} />
        </View>
      </View>
    </Pressable>
  );
}

/** Marcador com o formato do card, exibido enquanto a lista carrega. */
export function TicketCardSkeleton() {
  return (
    <View className={cardClassName}>
      <Skeleton className="h-14 w-14 rounded-lg" />
      <View className="flex-1 gap-1.5 py-0.5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
      </View>
    </View>
  );
}
