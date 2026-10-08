import type { LucideIcon } from 'lucide-react-native';
import { Pressable, type PressableProps, Text as RNText, View } from 'react-native';

import { cn } from '@/lib/cn';
import { useThemeColors } from '@/theme/useThemeColors';

import { Text } from './Text';

export type ChipProps = Omit<PressableProps, 'children'> & {
  label: string;
  selected?: boolean;
  icon?: LucideIcon;
  /** Contador ao lado do texto, ex.: "Abertos 3". */
  count?: number;
  className?: string;
};

/** Opção selecionável em pílula (filtros de status, categorias): laranja quando selecionada. */
export function Chip({
  label,
  selected = false,
  icon: Icon,
  count,
  className,
  ...props
}: ChipProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      aria-selected={selected}
      accessibilityLabel={count === undefined ? label : `${label}, ${count}`}
      className={cn(
        'min-h-11 flex-row items-center gap-2 rounded-full border px-5 active:opacity-80',
        selected ? 'border-primary bg-primary' : 'border-border bg-surface',
        className,
      )}
      {...props}
    >
      {Icon && (
        <Icon size={16} color={selected ? colors['primary-foreground'] : colors.foreground} />
      )}
      <Text variant="buttonSmall" tone={selected ? 'inverse' : 'default'}>
        {label}
      </Text>
      {count !== undefined && (
        <View
          className={cn(
            'min-w-6 items-center rounded-full px-1.5 py-0.5',
            selected ? 'bg-primary-foreground/25' : 'bg-surface-muted',
          )}
        >
          {/* Text do React Native: a cor depende do fundo do contador, não de um `tone`. */}
          <RNText
            className={cn(
              'font-sans-semibold text-xs',
              selected ? 'text-primary-foreground' : 'text-foreground',
            )}
          >
            {count}
          </RNText>
        </View>
      )}
    </Pressable>
  );
}
