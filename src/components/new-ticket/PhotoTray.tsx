import { ImagePlus, X } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Photo, Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { type DraftPhoto, MAX_PHOTOS } from '@/lib/ticket-draft';
import { useThemeColors } from '@/theme/useThemeColors';

export type PhotoTrayProps = {
  photos: DraftPhoto[];
  onRemove: (id: string) => void;
  className?: string;
};

/**
 * As fotos já tiradas, em miniaturas, mais os espaços vazios até o limite. Fica sobre o fundo
 * escuro da câmera, por isso usa as cores fixas de `overlay` (iguais nos dois temas).
 */
export function PhotoTray({ photos, onRemove, className }: PhotoTrayProps) {
  const colors = useThemeColors();
  const slots = Array.from({ length: MAX_PHOTOS }, (_, index) => photos[index] ?? null);

  return (
    <View className={cn('flex-row items-center gap-3', className)}>
      {slots.map((photo, index) =>
        photo ? (
          <View key={photo.id} className="h-16 w-16">
            <Photo
              source={{ uri: photo.uri }}
              accessibilityLabel={`Foto ${index + 1}`}
              className="h-16 w-16 rounded-lg border border-overlay-foreground/30"
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Remover foto ${index + 1}`}
              onPress={() => onRemove(photo.id)}
              // 24 px visíveis; o hitSlop completa a área de toque.
              hitSlop={10}
              className="absolute -right-2 -top-2 h-6 w-6 items-center justify-center rounded-full bg-overlay-foreground active:opacity-70"
            >
              <X size={14} color={colors.overlay} strokeWidth={2.5} />
            </Pressable>
          </View>
        ) : (
          <View
            key={`empty-${index}`}
            className="h-16 w-16 items-center justify-center rounded-lg border border-dashed border-overlay-foreground/30"
          >
            <ImagePlus size={18} color={colors['overlay-foreground']} opacity={0.4} />
          </View>
        ),
      )}
      <Text variant="caption" tone="inverse" tabular className="ml-auto opacity-70">
        {photos.length} de {MAX_PHOTOS} fotos
      </Text>
    </View>
  );
}
