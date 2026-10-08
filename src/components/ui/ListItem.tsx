import { ChevronRight, type LucideIcon } from 'lucide-react-native';
import { Children, type ReactNode } from 'react';
import { Pressable, type PressableProps, View } from 'react-native';

import { cn } from '@/lib/cn';
import { useThemeColors } from '@/theme/useThemeColors';

import { Text } from './Text';

export type ListItemProps = Omit<PressableProps, 'children'> & {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  /** Mostra a seta à direita, indicando que a linha abre outra tela. */
  chevron?: boolean;
  className?: string;
};

/** Linha de lista de ajustes: ícone em um quadrado suave, título, subtítulo e seta. */
export function ListItem({
  icon: Icon,
  title,
  subtitle,
  chevron = true,
  className,
  ...props
}: ListItemProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      className={cn('min-h-16 flex-row items-center gap-4 px-5 py-3 active:opacity-70', className)}
      {...props}
    >
      <View className="h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft">
        <Icon size={20} color={colors.accent} />
      </View>
      <View className="flex-1 gap-0.5">
        <Text variant="body">{title}</Text>
        {subtitle ? (
          <Text variant="label" tone="muted">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {chevron ? <ChevronRight size={20} color={colors['muted-foreground']} /> : null}
    </Pressable>
  );
}

export type ListGroupProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Cartão que agrupa vários `ListItem` e desenha uma linha divisória entre eles.
 * A divisória começa depois do ícone, alinhada ao texto, como no protótipo.
 */
export function ListGroup({ children, className }: ListGroupProps) {
  // Children.toArray transforma os filhos em uma lista, descartando `null` e `false`.
  const items = Children.toArray(children);

  return (
    <View
      className={cn(
        'overflow-hidden rounded-4xl border border-border/70 bg-surface py-1 shadow-sm',
        className,
      )}
    >
      {items.map((item, index) => (
        <View key={index}>
          {index > 0 ? <View className="ml-20 h-px bg-border/70" /> : null}
          {item}
        </View>
      ))}
    </View>
  );
}
