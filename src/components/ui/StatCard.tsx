import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { useThemeColors } from '@/theme/useThemeColors';

import { Text } from './Text';

const tones = {
  // O ícone leva a cor; o quadrado atrás dele é sempre neutro.
  accent: { halo: 'bg-surface-muted', color: 'foreground' },
  success: { halo: 'bg-surface-muted', color: 'success' },
  error: { halo: 'bg-surface-muted', color: 'error' },
} as const;

export type StatCardProps = {
  icon: LucideIcon;
  /** Número em destaque, já formatado: "14 min", "84", "08". */
  value: string;
  label: string;
  /** Cor do ícone: `success` para resolvidos, `error` para críticos/atrasados. */
  tone?: keyof typeof tones;
  className?: string;
};

/** Cartão de métrica do painel: ícone, número grande e legenda. */
export function StatCard({ icon: Icon, value, label, tone = 'accent', className }: StatCardProps) {
  const colors = useThemeColors();
  const style = tones[tone];

  return (
    <View
      accessible
      accessibilityLabel={`${label}: ${value}`}
      className={cn('gap-3 rounded-xl border border-border bg-surface p-4', className)}
    >
      <View className={cn('h-8 w-8 items-center justify-center rounded-lg', style.halo)}>
        <Icon size={16} color={colors[style.color]} />
      </View>
      <View className="gap-0.5">
        <Text variant="display" tabular>
          {value}
        </Text>
        <Text variant="caption" tone="muted">
          {label}
        </Text>
      </View>
    </View>
  );
}
