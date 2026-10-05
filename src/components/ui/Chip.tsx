import type { LucideIcon } from 'lucide-react-native';
import { Pressable, type PressableProps } from 'react-native';

import { cn } from '@/lib/cn';
import { useThemeColors } from '@/theme/useThemeColors';

import { Text } from './Text';

export type ChipProps = Omit<PressableProps, 'children'> & {
  label: string;
  selected?: boolean;
  icon?: LucideIcon;
  className?: string;
};

/** Opção selecionável em formato de pílula (ex.: filtros de status). */
export function Chip({ label, selected = false, icon: Icon, className, ...props }: ChipProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      // 36 px visíveis + 4 px de cada lado = 44 px de área de toque.
      hitSlop={4}
      className={cn(
        'min-h-9 flex-row items-center gap-1.5 rounded-full border px-4 active:opacity-80',
        selected ? 'border-accent bg-accent-soft' : 'border-border bg-surface',
        className,
      )}
      {...props}
    >
      {Icon && <Icon size={16} color={selected ? colors.brand : colors['muted-foreground']} />}
      <Text variant="label" tone={selected ? 'brand' : 'default'}>
        {label}
      </Text>
    </Pressable>
  );
}
