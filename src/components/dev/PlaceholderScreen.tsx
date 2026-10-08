import type { LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';
import { useThemeColors } from '@/theme/useThemeColors';

export type PlaceholderScreenProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Botões ou links da tela, abaixo do texto. */
  children?: ReactNode;
};

/** Tela-marcador: guarda o lugar de uma rota cujo conteúdo chega em uma etapa futura. */
export function PlaceholderScreen({
  icon: Icon,
  title,
  description,
  children,
}: PlaceholderScreenProps) {
  const colors = useThemeColors();

  return (
    <View className="flex-1 items-center justify-center gap-3 bg-background p-6">
      <View className="h-12 w-12 items-center justify-center rounded-xl bg-surface-muted">
        <Icon size={22} color={colors['muted-foreground']} />
      </View>
      <View className="items-center gap-1">
        <Text variant="title" className="text-center">
          {title}
        </Text>
        <Text variant="label" tone="muted" className="text-center">
          {description}
        </Text>
      </View>
      {children ? <View className="w-full gap-3 pt-2">{children}</View> : null}
    </View>
  );
}
