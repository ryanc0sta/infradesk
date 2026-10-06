import type { LucideIcon } from 'lucide-react-native';
import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';

import { cn } from '@/lib/cn';
import { type ColorToken, useThemeColors } from '@/theme/useThemeColors';

import { Text, type TextProps } from './Text';

const variants = {
  primary: { container: 'bg-primary', tone: 'inverse', color: 'primary-foreground' },
  secondary: { container: 'border border-border bg-surface', tone: 'default', color: 'foreground' },
  ghost: { container: 'bg-transparent', tone: 'brand', color: 'brand' },
  destructive: { container: 'bg-danger', tone: 'inverse', color: 'danger-foreground' },
} satisfies Record<string, { container: string; tone: TextProps['tone']; color: ColorToken }>;

export type ButtonProps = Omit<PressableProps, 'children'> & {
  title: string;
  variant?: keyof typeof variants;
  /** Ícone do Lucide exibido antes do texto. */
  icon?: LucideIcon;
  loading?: boolean;
  className?: string;
};

export function Button({
  title,
  variant = 'primary',
  icon: Icon,
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const colors = useThemeColors();
  const style = variants[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      className={cn(
        // min-h-11 = 44 px, o alvo de toque mínimo do design.
        'min-h-11 flex-row items-center justify-center gap-2 rounded-2xl px-5 active:opacity-80',
        style.container,
        isDisabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors[style.color]} />
      ) : (
        Icon && <Icon size={18} color={colors[style.color]} />
      )}
      <Text variant="button" tone={style.tone}>
        {title}
      </Text>
    </Pressable>
  );
}
