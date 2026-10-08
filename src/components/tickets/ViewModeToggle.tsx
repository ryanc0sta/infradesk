import { LayoutGrid, List, type LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { cn } from '@/lib/cn';
import type { TicketViewMode } from '@/lib/preferences';
import { useThemeColors } from '@/theme/useThemeColors';

const options: { mode: TicketViewMode; icon: LucideIcon; label: string }[] = [
  { mode: 'list', icon: List, label: 'Ver em lista' },
  { mode: 'grid', icon: LayoutGrid, label: 'Ver em grade' },
];

export type ViewModeToggleProps = {
  value: TicketViewMode;
  onChange: (mode: TicketViewMode) => void;
  className?: string;
};

/** Alterna entre lista e grade: dois botões de ícone lado a lado, com o ativo destacado. */
export function ViewModeToggle({ value, onChange, className }: ViewModeToggleProps) {
  const colors = useThemeColors();

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel="Modo de exibição"
      className={cn('flex-row rounded-lg border border-border bg-surface p-0.5', className)}
    >
      {options.map(({ mode, icon: Icon, label }) => {
        const selected = value === mode;
        return (
          <Pressable
            key={mode}
            accessibilityRole="radio"
            accessibilityLabel={label}
            aria-checked={selected}
            onPress={() => onChange(mode)}
            // 28 px visíveis; o hitSlop completa a área de toque na vertical.
            hitSlop={{ top: 8, bottom: 8 }}
            className={cn(
              'h-7 w-8 items-center justify-center rounded-md active:opacity-70',
              selected && 'bg-surface-muted',
            )}
          >
            <Icon size={16} color={selected ? colors.foreground : colors['muted-foreground']} />
          </Pressable>
        );
      })}
    </View>
  );
}
