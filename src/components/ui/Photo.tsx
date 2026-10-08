import { Image, type ImageProps, StyleSheet, View } from 'react-native';

import { cn } from '@/lib/cn';
import type { PhotoSource } from '@/types/ticket';

export type PhotoProps = Omit<ImageProps, 'source' | 'style' | 'className'> & {
  source: PhotoSource;
  /** Tamanho e cantos da moldura, ex.: `h-20 w-20 rounded-2xl`. */
  className?: string;
};

/**
 * Foto que preenche uma moldura de tamanho definido, cortando o excesso (`cover`).
 *
 * O tamanho vai na moldura, e não na imagem, de propósito: na web, uma imagem embutida no app
 * recebe as dimensões do arquivo direto no elemento, e isso vence as classes de tamanho.
 */
export function Photo({ source, className, ...props }: PhotoProps) {
  return (
    <View className={cn('overflow-hidden bg-surface-muted', className)}>
      <Image source={source} resizeMode="cover" style={styles.image} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Largura e altura explícitas: só "encostar nas bordas" não basta na web, onde as dimensões
  // do arquivo já vêm definidas no elemento.
  image: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
});
