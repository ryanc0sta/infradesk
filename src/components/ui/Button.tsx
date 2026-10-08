import type { LucideIcon } from 'lucide-react-native';
import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';

import { cn } from '@/lib/cn';
import { type ColorToken, useThemeColors } from '@/theme/useThemeColors';

import { Text, type TextProps } from './Text';

const variants = {
  primary: { container: 'bg-primary', tone: 'inverse', color: 'primary-foreground' },
  // Contorno marrom sobre fundo transparente ("Assumir", "Adicionar foto").
  secondary: { container: 'border border-foreground', tone: 'default', color: 'foreground' },
  ghost: { container: '', tone: 'brand', color: 'brand' },
  destructive: { container: 'bg-danger', tone: 'inverse', color: 'danger-foreground' },
} satisfies Record<string, { container: string; tone: TextProps['tone']; color: ColorToken }>;

const sizes = {
  // 36 px visíveis; o hitSlop completa os 44 px de área de toque.
  sm: { container: 'min-h-9 gap-1.5 px-4', text: 'buttonSmall', icon: 16, hitSlop: 4 },
  md: { container: 'min-h-12 gap-2 px-6', text: 'button', icon: 18, hitSlop: 0 },
  lg: { container: 'min-h-14 gap-2 px-7', text: 'button', icon: 20, hitSlop: 0 },
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
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      hitSlop={dimensions.hitSlop}
      className={cn(
        'flex-row items-center justify-center rounded-full active:opacity-80',
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
