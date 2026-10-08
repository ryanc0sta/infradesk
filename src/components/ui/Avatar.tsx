import { Image, Text, View } from 'react-native';

import { cn } from '@/lib/cn';

const sizes = {
  sm: { box: 'h-8 w-8', text: 'text-xs' },
  md: { box: 'h-10 w-10', text: 'text-sm' },
  lg: { box: 'h-12 w-12', text: 'text-base' },
} as const;

export type AvatarProps = {
  name: string;
  /** Foto do usuário; sem ela, mostra as iniciais do nome. */
  uri?: string | null;
  size?: keyof typeof sizes;
  className?: string;
};

/** "Maria da Silva" → "MS". */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export function Avatar({ name, uri, size = 'md', className }: AvatarProps) {
  const style = sizes[size];

  if (uri) {
    return (
      <Image
        source={{ uri }}
        accessibilityLabel={name}
        className={cn(style.box, 'rounded-full bg-surface-muted', className)}
      />
    );
  }

  return (
    <View
      accessible
      accessibilityLabel={name}
      className={cn(
        style.box,
        'items-center justify-center rounded-full bg-surface-muted',
        className,
      )}
    >
      <Text className={cn('font-sans-semibold text-foreground', style.text)}>{initials(name)}</Text>
    </View>
  );
}
