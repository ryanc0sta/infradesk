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
    <View className={cn('items-center gap-3 px-6 py-10', className)}>
      <View className="h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
        <Icon size={28} color={colors.accent} />
      </View>
      <Text variant="subtitle" className="text-center">
        {title}
      </Text>
      {description ? (
        <Text tone="muted" className="text-center">
          {description}
        </Text>
      ) : null}
      {action ? <Button title={action.label} onPress={action.onPress} className="mt-2" /> : null}
    </View>
  );
}
