import { AlertTriangle, ArrowDown, ArrowUp, type LucideIcon, Minus } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { cn } from '@/lib/cn';
import { type ColorToken, useThemeColors } from '@/theme/useThemeColors';
import type { TicketPriority } from '@/types/ticket';

// As classes ficam escritas por extenso: o Tailwind só gera o que encontra como texto no código.
// Cada prioridade tem UM ícone e UMA cor, iguais em todas as telas.
const priorities = {
  low: {
    label: 'Baixa',
    icon: ArrowDown,
    plain: { text: 'text-priority-low-text', color: 'priority-low-text' },
    solid: {
      container: 'bg-priority-low',
      text: 'text-priority-low-foreground',
      color: 'priority-low-foreground',
    },
  },
  medium: {
    label: 'Média',
    icon: Minus,
    plain: { text: 'text-priority-medium-text', color: 'priority-medium-text' },
    solid: {
      container: 'bg-priority-medium',
      text: 'text-priority-medium-foreground',
      color: 'priority-medium-foreground',
    },
  },
  high: {
    label: 'Alta',
    icon: ArrowUp,
    plain: { text: 'text-priority-high-text', color: 'priority-high-text' },
    solid: {
      container: 'bg-priority-high',
      text: 'text-priority-high-foreground',
      color: 'priority-high-foreground',
    },
  },
  critical: {
    label: 'Crítica',
    icon: AlertTriangle,
    plain: { text: 'text-priority-critical-text', color: 'priority-critical-text' },
    solid: {
      container: 'bg-priority-critical',
      text: 'text-priority-critical-foreground',
      color: 'priority-critical-foreground',
    },
  },
} satisfies Record<
  TicketPriority,
  {
    label: string;
    icon: LucideIcon;
    plain: { text: string; color: ColorToken };
    solid: { container: string; text: string; color: ColorToken };
  }
>;

export type PriorityBadgeProps = {
  priority: TicketPriority;
  /**
   * `plain`: ícone + texto sem fundo, para dentro de cards.
   * `solid`: selo preenchido, legível sobre fotos (fila do técnico).
   */
  variant?: 'plain' | 'solid';
  className?: string;
};

/** Prioridade do chamado: sempre ícone + texto, nunca só a cor (docs/design.md, seção 3). */
export function PriorityBadge({ priority, variant = 'plain', className }: PriorityBadgeProps) {
  const colors = useThemeColors();
  const { label, icon: Icon, plain, solid } = priorities[priority];
  const isSolid = variant === 'solid';
  const style = isSolid ? solid : plain;

  return (
    <View
      accessible
      accessibilityLabel={`Prioridade: ${label}`}
      className={cn(
        'flex-row items-center gap-1 self-start',
        isSolid && 'rounded-full px-3 py-1.5 shadow-sm',
        isSolid && solid.container,
        className,
      )}
    >
      <Icon size={14} color={colors[style.color]} strokeWidth={2.5} />
      {/* Text do React Native, e não o de `ui/`: a cor aqui vem da prioridade, não de um `tone`. */}
      <Text className={cn('font-sans-semibold text-xs uppercase tracking-wide', style.text)}>
        {label}
      </Text>
    </View>
  );
}
