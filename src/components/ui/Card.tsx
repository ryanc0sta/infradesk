import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

export type CardProps = ViewProps & { className?: string };

/** Superfície branca com cantos de 28 px (`rounded-4xl`), borda e sombra suaves. */
export function Card({ className, ...props }: CardProps) {
  return (
    <View
      className={cn('rounded-4xl border border-border/70 bg-surface p-5 shadow-sm', className)}
      {...props}
    />
  );
}
