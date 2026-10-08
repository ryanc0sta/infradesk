import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

export type CardProps = ViewProps & { className?: string };

/** Superfície com borda fina de 1 px e cantos de 12 px. Sem sombra: a borda já separa do fundo. */
export function Card({ className, ...props }: CardProps) {
  return (
    <View className={cn('rounded-xl border border-border bg-surface p-4', className)} {...props} />
  );
}
