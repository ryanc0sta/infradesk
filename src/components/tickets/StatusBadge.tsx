import { Text, View } from 'react-native';

import { cn } from '@/lib/cn';
import { statusLabels } from '@/lib/ticket-labels';
import type { TicketStatus } from '@/types/ticket';

// As classes ficam escritas por extenso: o Tailwind só gera o que encontra como texto no código,
// então montar o nome com `bg-status-${status}` não funcionaria.
const statuses = {
  open: { container: 'bg-status-open', text: 'text-status-open-foreground' },
  in_review: {
    container: 'bg-status-in-review',
    text: 'text-status-in-review-foreground',
  },
  in_progress: {
    container: 'bg-status-in-progress',
    text: 'text-status-in-progress-foreground',
  },
  done: { container: 'bg-status-done', text: 'text-status-done-foreground' },
  rejected: {
    container: 'bg-status-rejected',
    text: 'text-status-rejected-foreground',
  },
  // Sem fundo: só contorno e texto apagado, para se diferenciar de "Aberto" pela forma.
  cancelled: {
    container: 'border border-border',
    text: 'text-muted-foreground',
  },
} satisfies Record<TicketStatus, { container: string; text: string }>;

export type StatusBadgeProps = {
  status: TicketStatus;
  className?: string;
};

/**
 * Selo em pílula com o status do chamado. As cores seguem a rampa quente e ficam mais intensas
 * conforme o chamado avança (docs/design.md, seção 3).
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statuses[status];

  return (
    <View
      accessible
      accessibilityLabel={`Status: ${statusLabels[status]}`}
      className={cn('self-start rounded-full px-3 py-1', style.container, className)}
    >
      {/* Text do React Native, e não o de `ui/`: a cor aqui vem do status, não de um `tone`. */}
      <Text className={cn('font-sans-semibold text-xs uppercase tracking-wide', style.text)}>
        {statusLabels[status]}
      </Text>
    </View>
  );
}
