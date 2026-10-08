import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { useThemeColors } from '@/theme/useThemeColors';

import { Button } from './Button';
import { Text } from './Text';

export type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  /** Ação sugerida, ex.: "Abrir chamado". */
  action?: { label: string; onPress: () => void };
  className?: string;
};

/** Mensagem para listas sem itens, com ícone, explicação e uma ação opcional. */
export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  const colors = useThemeColors();

  return (
    <View className={cn('items-center gap-2 px-6 py-8', className)}>
      <View className="mb-1 h-12 w-12 items-center justify-center rounded-xl bg-surface-muted">
        <Icon size={22} color={colors['muted-foreground']} />
      </View>
      <Text variant="subtitle" className="text-center">
        {title}
      </Text>
      {description ? (
        <Text variant="label" tone="muted" className="text-center">
          {description}
        </Text>
      ) : null}
      {action ? (
        <Button
          title={action.label}
          onPress={action.onPress}
          size="sm"
          variant="secondary"
          className="mt-3"
        />
      ) : null}
    </View>
  );
}
