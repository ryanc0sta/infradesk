import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { cn } from '@/lib/cn';

export type SkeletonProps = {
  /** Tamanho e forma pelo className, ex.: `h-4 w-32` ou `h-10 w-10 rounded-full`. */
  className?: string;
};

/** Bloco pulsante que ocupa o lugar do conteúdo enquanto ele carrega. */
export function Skeleton({ className }: SkeletonProps) {
  const reduceMotion = useReducedMotion();
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (reduceMotion) return;
    // Vai de 1 a 0.4 e volta, para sempre (-1), invertendo a cada ciclo (true).
    opacity.value = withRepeat(withTiming(0.4, { duration: 800 }), -1, true);
    return () => cancelAnimation(opacity);
  }, [opacity, reduceMotion]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={animatedStyle} accessibilityElementsHidden importantForAccessibility="no">
      <View className={cn('rounded-lg bg-border', className)} />
    </Animated.View>
  );
}
