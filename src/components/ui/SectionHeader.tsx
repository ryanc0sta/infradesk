import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { cn } from '@/lib/cn';

import { Text } from './Text';

export type SectionHeaderProps = {
  title: string;
  /** Link à direita, ex.: "Ver todos". */
  action?: { label: string; onPress: () => void };
  /** Controle extra entre o título e o link, ex.: o alternador de lista/grade. */
  accessory?: ReactNode;
  className?: string;
};

/** Título de seção com um link opcional à direita ("Meus chamados" + "Ver todos"). */
export function SectionHeader({ title, action, accessory, className }: SectionHeaderProps) {
  return (
    <View className={cn('flex-row items-center justify-between gap-3', className)}>
      <Text variant="subtitle" accessibilityRole="header" className="flex-1">
        {title}
      </Text>
      {accessory}
      {action ? (
        <Pressable
          accessibilityRole="button"
          onPress={action.onPress}
          // O texto tem ~20 px de altura; o hitSlop leva a área de toque a 44 px.
          hitSlop={12}
          className="active:opacity-70"
        >
          <Text variant="buttonSmall" tone="brand">
            {action.label}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
