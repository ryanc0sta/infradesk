import { Pressable, type PressableProps, View } from 'react-native';

import { Photo, Skeleton, Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatLocation, formatRelativeTime } from '@/lib/format';
import { priorityLabels, statusLabels } from '@/lib/ticket-labels';
import { useThemeColors } from '@/theme/useThemeColors';
import type { TicketListItem } from '@/types/ticket';

import { CategoryIcon } from './CategoryIcon';
import { StatusBadge } from './StatusBadge';

const tileClassName = 'flex-1 overflow-hidden rounded-xl border border-border bg-surface';

export type TicketTileProps = Omit<PressableProps, 'children'> & {
  ticket: TicketListItem;
  className?: string;
};

/**
 * Chamado em um quadro da grade: a foto em destaque e só o essencial abaixo (status, tempo e
 * título). Os outros dados ficam no detalhe e no leitor de tela.
 */
export function TicketTile({ ticket, className, ...props }: TicketTileProps) {
  const colors = useThemeColors();
  const time = formatRelativeTime(ticket.created_at);

  return (
    <Pressable
      accessibilityRole="button"
      // Mesmo rótulo do card de lista: quem usa leitor de tela recebe a informação completa.
      accessibilityLabel={`Chamado ${ticket.id}: ${ticket.title}. ${statusLabels[ticket.status]}. Prioridade ${priorityLabels[ticket.priority]}. ${formatLocation(ticket.location)}. Aberto ${time}.`}
      className={cn(tileClassName, 'active:bg-surface-muted', className)}
      {...props}
    >
      {ticket.cover ? (
        <Photo source={ticket.cover} className="aspect-square w-full" />
      ) : (
        <View className="aspect-square w-full items-center justify-center bg-surface-muted">
          <CategoryIcon name={ticket.category.icon} size={32} color={colors['muted-foreground']} />
        </View>
      )}

      <View className="gap-1.5 p-2.5">
        <View className="flex-row items-center justify-between gap-2">
          <StatusBadge status={ticket.status} />
          <Text variant="caption" tone="muted" tabular>
            {time}
          </Text>
        </View>
        <Text variant="label" numberOfLines={2}>
          {ticket.title}
        </Text>
      </View>
    </Pressable>
  );
}

/** Marcador com o formato do quadro, exibido enquanto a grade carrega. */
export function TicketTileSkeleton() {
  return (
    <View className={tileClassName}>
      <Skeleton className="aspect-square w-full rounded-none" />
      <View className="gap-2 p-2.5">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4/5" />
      </View>
    </View>
  );
}
