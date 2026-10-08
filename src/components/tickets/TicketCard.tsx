import { MapPin } from 'lucide-react-native';
import { Pressable, type PressableProps, View } from 'react-native';

import { Photo, Skeleton, Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatLocation, formatRelativeTime } from '@/lib/format';
import { statusLabels } from '@/lib/ticket-labels';
import { useThemeColors } from '@/theme/useThemeColors';
import type { TicketListItem } from '@/types/ticket';

import { CategoryIcon } from './CategoryIcon';
import { StatusBadge } from './StatusBadge';

const cardClassName =
  'flex-row items-center gap-4 rounded-4xl border border-border/70 bg-surface p-4 shadow-sm';

export type TicketCardProps = Omit<PressableProps, 'children'> & {
  ticket: TicketListItem;
  className?: string;
};

/** Chamado em uma linha da lista: foto (ou o ícone da categoria), status, título, local e tempo. */
export function TicketCard({ ticket, className, ...props }: TicketCardProps) {
  const colors = useThemeColors();
  const location = formatLocation(ticket.location);
  const time = formatRelativeTime(ticket.created_at);

  return (
    <Pressable
      accessibilityRole="button"
      // Um rótulo só para o card inteiro: o leitor de tela lê a frase completa de uma vez.
      accessibilityLabel={`Chamado ${ticket.id}: ${ticket.title}. ${statusLabels[ticket.status]}. ${location}. Aberto ${time}.`}
      className={cn(cardClassName, 'active:opacity-80', className)}
      {...props}
    >
      {ticket.cover ? (
        <Photo source={ticket.cover} className="h-20 w-20 rounded-2xl" />
      ) : (
        <View className="h-20 w-20 items-center justify-center rounded-2xl bg-surface-muted">
          <CategoryIcon name={ticket.category.icon} size={28} color={colors['muted-foreground']} />
        </View>
      )}

      <View className="flex-1 gap-1.5">
        <View className="flex-row items-center justify-between gap-2">
          <StatusBadge status={ticket.status} />
          <Text variant="caption" tone="muted">
            {time}
          </Text>
        </View>
        <Text variant="subtitle" numberOfLines={2}>
          {ticket.title}
        </Text>
        <View className="flex-row items-center gap-1">
          <MapPin size={14} color={colors['muted-foreground']} />
          <Text variant="label" tone="muted" numberOfLines={1} className="flex-1">
            {location}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

/** Marcador com o formato do card, exibido enquanto a lista carrega. */
export function TicketCardSkeleton() {
  return (
    <View className={cardClassName}>
      <Skeleton className="h-20 w-20 rounded-2xl" />
      <View className="flex-1 gap-2">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </View>
    </View>
  );
}
