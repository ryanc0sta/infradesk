import { AlertTriangle, ArrowDown, ArrowUp, type LucideIcon, Minus } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { cn } from '@/lib/cn';
import { type ColorToken, useThemeColors } from '@/theme/useThemeColors';
import type { TicketPriority } from '@/types/ticket';

const priorities = {
  low: { label: 'Baixa', icon: ArrowDown, text: 'text-priority-low', color: 'priority-low' },
  medium: { label: 'Média', icon: Minus, text: 'text-priority-medium', color: 'priority-medium' },
  high: { label: 'Alta', icon: ArrowUp, text: 'text-priority-high', color: 'priority-high' },
  critical: {
    label: 'Crítica',
    icon: AlertTriangle,
    text: 'text-priority-critical',
    color: 'priority-critical',
  },
} satisfies Record<
  TicketPriority,
  { label: string; icon: LucideIcon; text: string; color: ColorToken }
>;

export type PriorityBadgeProps = {
  priority: TicketPriority;
  className?: string;
};

/** Prioridade do chamado: sempre ícone + texto, nunca só a cor (docs/design.md, seção 3). */
export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const colors = useThemeColors();
  const { label, icon: Icon, text, color } = priorities[priority];

  return (
    <View
      accessible
      accessibilityLabel={`Prioridade: ${label}`}
      className={cn('flex-row items-center gap-1 self-start', className)}
    >
      <Icon size={14} color={colors[color]} />
      {/* Text do React Native, e não o de `ui/`: a cor aqui vem da prioridade, não de um `tone`. */}
      <Text className={cn('font-sans-medium text-xs', text)}>{label}</Text>
    </View>
  );
}
