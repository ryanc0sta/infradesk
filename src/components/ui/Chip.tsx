import type { LucideIcon } from 'lucide-react-native';
import { Pressable, type PressableProps } from 'react-native';

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

/**
 * Opção selecionável compacta (filtros de status, categorias). A selecionada inverte as cores
 * (fundo na cor do texto), sem usar a cor da marca: ela fica reservada à ação principal.
 */
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
      // 32 px visíveis + 6 px de cada lado = 44 px de área de toque.
      hitSlop={6}
      className={cn(
        'h-8 flex-row items-center gap-1.5 rounded-lg border px-3 active:opacity-80',
        selected ? 'border-foreground bg-foreground' : 'border-border bg-surface',
        className,
      )}
      {...props}
    >
      {Icon && <Icon size={14} color={selected ? colors.background : colors['muted-foreground']} />}
      <Text variant="buttonSmall" tone={selected ? 'contrast' : 'default'}>
        {label}
      </Text>
      {count !== undefined && (
        <Text
          variant="buttonSmall"
          tone={selected ? 'contrast' : 'muted'}
          tabular
          className={selected ? 'opacity-70' : undefined}
        >
          {count}
        </Text>
      )}
    </Pressable>
  );
}
