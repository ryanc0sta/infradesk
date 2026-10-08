import type { LucideIcon } from 'lucide-react-native';
import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';

import { cn } from '@/lib/cn';
import { type ColorToken, useThemeColors } from '@/theme/useThemeColors';

import { Text, type TextProps } from './Text';

const variants = {
  // A única variante com a cor da marca: uma por tela, na ação principal.
  primary: { container: 'bg-primary', tone: 'inverse', color: 'primary-foreground' },
  secondary: { container: 'border border-border bg-surface', tone: 'default', color: 'foreground' },
  ghost: { container: '', tone: 'brand', color: 'brand' },
  // Contorno e texto vermelhos sobre um fundo suave: avisa sem gritar.
  destructive: {
    container: 'border border-error/25 bg-danger-soft',
    tone: 'error',
    color: 'error',
  },
} satisfies Record<string, { container: string; tone: TextProps['tone']; color: ColorToken }>;

const sizes = {
  // 32 px visíveis; o hitSlop completa os 44 px de área de toque.
  sm: { container: 'h-8 gap-1.5 rounded-md px-3', text: 'buttonSmall', icon: 14, hitSlop: 6 },
  md: { container: 'h-11 gap-2 rounded-lg px-4', text: 'button', icon: 16, hitSlop: 0 },
  lg: { container: 'h-12 gap-2 rounded-lg px-5', text: 'button', icon: 18, hitSlop: 0 },
} satisfies Record<
  string,
  { container: string; text: TextProps['variant']; icon: number; hitSlop: number }
>;

export type ButtonProps = Omit<PressableProps, 'children'> & {
  title: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Ícone do Lucide exibido antes do texto. */
  icon?: LucideIcon;
  loading?: boolean;
  className?: string;
};

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const colors = useThemeColors();
  const style = variants[variant];
  const dimensions = sizes[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      aria-disabled={isDisabled}
      aria-busy={loading}
      disabled={isDisabled}
      hitSlop={dimensions.hitSlop}
      className={cn(
        'flex-row items-center justify-center active:opacity-80',
        dimensions.container,
        style.container,
        isDisabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors[style.color]} />
      ) : (
        Icon && <Icon size={dimensions.icon} color={colors[style.color]} />
      )}
      <Text variant={dimensions.text} tone={style.tone}>
        {title}
      </Text>
    </Pressable>
  );
}
