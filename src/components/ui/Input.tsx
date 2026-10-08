import { useState } from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import { cn } from '@/lib/cn';
import { useThemeColors } from '@/theme/useThemeColors';

import { Text } from './Text';

export type InputProps = TextInputProps & {
  label: string;
  /** Mensagem de validação; quando existe, a borda fica vermelha. */
  error?: string;
  className?: string;
};

export function Input({ label, error, className, onFocus, onBlur, ...props }: InputProps) {
  const colors = useThemeColors();
  const [focused, setFocused] = useState(false);

  return (
    <View className={cn('gap-1.5', className)}>
      <Text variant="label">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors['muted-foreground']}
        className={cn(
          'min-h-11 rounded-lg border bg-surface px-3 py-2.5 font-sans text-[15px] text-foreground',
          error ? 'border-error' : focused ? 'border-accent' : 'border-border',
        )}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        {...props}
      />
      {error ? (
        <Text variant="caption" tone="error" accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
