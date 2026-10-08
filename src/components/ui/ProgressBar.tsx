import { View } from 'react-native';

import { cn } from '@/lib/cn';

import { Text } from './Text';

// Três intensidades para barras lado a lado, mais o verde de sucesso.
const tones = {
  strong: 'bg-primary',
  medium: 'bg-accent',
  soft: 'bg-priority-medium',
  success: 'bg-success',
} as const;

export type ProgressBarProps = {
  label: string;
  /** Fração de 0 a 1. */
  value: number;
  tone?: keyof typeof tones;
  className?: string;
};

/** Barra horizontal com rótulo e porcentagem, feita só com `View` (ex.: ocorrências por categoria). */
export function ProgressBar({ label, value, tone = 'medium', className }: ProgressBarProps) {
  const percent = Math.round(Math.min(Math.max(value, 0), 1) * 100);

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={cn('gap-1.5', className)}
    >
      <View className="flex-row items-center justify-between gap-3">
        <Text variant="label" className="flex-1">
          {label}
        </Text>
        <Text variant="label" tone="muted" tabular>
          {percent}%
        </Text>
      </View>
      <View className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
        {/* A largura muda a cada valor, então vai em `style`: classes do Tailwind são fixas. */}
        <View className={cn('h-full rounded-full', tones[tone])} style={{ width: `${percent}%` }} />
      </View>
    </View>
  );
}
