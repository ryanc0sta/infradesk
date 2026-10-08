import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { IconButton, Photo, Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { useThemeColors } from '@/theme/useThemeColors';
import type { TicketPhotoItem } from '@/types/ticket';

import { CategoryIcon } from './CategoryIcon';

export type PhotoCarouselProps = {
  photos: TicketPhotoItem[];
  /** Ícone exibido no lugar da foto quando o chamado não tem nenhuma. */
  categoryIcon: string | null;
  className?: string;
};

/**
 * Fotos do chamado, uma por vez. Dá para trocar deslizando o dedo ou pelas setas (que também
 * servem para o mouse e para leitores de tela); os pontos e o contador mostram a posição.
 */
export function PhotoCarousel({ photos, categoryIcon, className }: PhotoCarouselProps) {
  const colors = useThemeColors();
  const scrollRef = useRef<ScrollView>(null);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <View
        accessible
        accessibilityLabel="Chamado sem foto"
        className={cn(
          'aspect-[4/3] w-full items-center justify-center bg-surface-muted',
          className,
        )}
      >
        <CategoryIcon name={categoryIcon} size={40} color={colors['muted-foreground']} />
      </View>
    );
  }

  const goTo = (next: number) => {
    scrollRef.current?.scrollTo({ x: next * width, animated: true });
    setIndex(next);
  };

  return (
    <View
      className={cn('aspect-[4/3] w-full bg-surface-muted', className)}
      // A largura real só é conhecida depois que a tela é desenhada: `onLayout` informa.
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        // `pagingEnabled` faz a rolagem parar sempre em uma foto inteira.
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={32}
        onScroll={(event) => {
          if (width > 0) setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
        }}
        accessibilityLabel={`Foto ${index + 1} de ${photos.length}`}
      >
        {photos.map((photo) => (
          <View key={photo.id} style={{ width }} className="h-full">
            <Photo source={photo.source} className="h-full w-full" />
          </View>
        ))}
      </ScrollView>

      {photos.length > 1 ? (
        <>
          <View className="absolute right-3 top-3 rounded-md bg-overlay/60 px-2 py-0.5">
            <Text variant="caption" tone="inverse" tabular>
              {index + 1}/{photos.length}
            </Text>
          </View>

          {index > 0 ? (
            <IconButton
              icon={ChevronLeft}
              variant="overlay"
              accessibilityLabel="Foto anterior"
              onPress={() => goTo(index - 1)}
              className="absolute left-3 top-1/2 -mt-5"
            />
          ) : null}
          {index < photos.length - 1 ? (
            <IconButton
              icon={ChevronRight}
              variant="overlay"
              accessibilityLabel="Próxima foto"
              onPress={() => goTo(index + 1)}
              className="absolute right-3 top-1/2 -mt-5"
            />
          ) : null}

          <View className="absolute bottom-3 left-0 right-0 flex-row justify-center gap-1.5">
            {photos.map((photo, position) => (
              <View
                key={photo.id}
                className={cn(
                  'h-1.5 rounded-full',
                  position === index
                    ? 'w-4 bg-overlay-foreground'
                    : 'w-1.5 bg-overlay-foreground/50',
                )}
              />
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
}
