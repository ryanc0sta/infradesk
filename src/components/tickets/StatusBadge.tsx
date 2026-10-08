import { Text, View } from 'react-native';

import { cn } from '@/lib/cn';
import { statusLabels } from '@/lib/ticket-labels';
import type { TicketStatus } from '@/types/ticket';

import { statusDotClasses } from './status-dots';

export type StatusBadgeProps = {
  status: TicketStatus;
  className?: string;
};

/**
 * Selo de status: fundo neutro, um ponto colorido e o nome por extenso. A cor fica só no ponto,
 * então uma lista com vários status continua calma de ler (docs/design.md, seção 3).
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <View
      accessible
      accessibilityLabel={`Status: ${statusLabels[status]}`}
      className={cn(
        'flex-row items-center gap-1.5 self-start rounded-md bg-surface-muted px-2 py-0.5',
        className,
      )}
    >
      <View className={cn('h-1.5 w-1.5 rounded-full', statusDotClasses[status])} />
      <Text className="font-sans-medium text-xs text-foreground">{statusLabels[status]}</Text>
    </View>
  );
}
