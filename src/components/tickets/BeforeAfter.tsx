import { View } from 'react-native';

import { Photo, Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { PhotoSource } from '@/types/ticket';

function LabeledPhoto({ label, source }: { label: string; source: PhotoSource }) {
  return (
    <View className="flex-1">
      <Photo
        source={source}
        accessibilityLabel={`Foto: ${label}`}
        className="aspect-square w-full rounded-lg"
      />
      <View className="absolute bottom-2 left-2 rounded-md bg-overlay/60 px-2 py-0.5">
        <Text variant="caption" tone="inverse">
          {label}
        </Text>
      </View>
    </View>
  );
}

export type BeforeAfterProps = {
  before: PhotoSource;
  after: PhotoSource;
  className?: string;
};

/**
 * Fotos do "antes" e do "depois" lado a lado. A comparação com controle deslizante fica para a
 * Etapa 4, junto com o fluxo em que o técnico envia a foto do reparo.
 */
export function BeforeAfter({ before, after, className }: BeforeAfterProps) {
  return (
    <View className={cn('flex-row gap-2', className)}>
      <LabeledPhoto label="Antes" source={before} />
      <LabeledPhoto label="Depois" source={after} />
    </View>
  );
}
