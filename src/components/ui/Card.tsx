import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

export type CardProps = ViewProps & { className?: string };

/** Superfície com cantos de 16 px (`rounded-2xl`), borda e sombra suaves. */
export function Card({ className, ...props }: CardProps) {
  return (
    <View
      className={cn('rounded-2xl border border-border bg-surface p-4 shadow-sm', className)}
      {...props}
    />
  );
}
