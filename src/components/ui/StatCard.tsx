import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { useThemeColors } from '@/theme/useThemeColors';

import { Text } from './Text';

const tones = {
  accent: { halo: 'bg-accent-soft', color: 'accent' },
  success: { halo: 'bg-success-soft', color: 'success' },
  error: { halo: 'bg-status-rejected', color: 'error' },
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
      className={cn(
        'gap-3 rounded-4xl border border-border/70 bg-surface p-5 shadow-sm',
        className,
      )}
    >
      <View className={cn('h-10 w-10 items-center justify-center rounded-2xl', style.halo)}>
        <Icon size={20} color={colors[style.color]} />
      </View>
      <View className="gap-0.5">
        <Text variant="display">{value}</Text>
        <Text variant="label" tone="muted">
          {label}
        </Text>
      </View>
    </View>
  );
}
