import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { cn } from '@/lib/cn';

const variants = {
  display: 'font-sans-bold text-3xl',
  title: 'font-sans-bold text-2xl',
  subtitle: 'font-sans-semibold text-lg',
  body: 'font-sans text-base',
  label: 'font-sans-medium text-sm',
  caption: 'font-sans text-xs',
  // Rótulo de seção em maiúsculas, ex.: "CONTA E SEGURANÇA", "PROTOCOLO".
  overline: 'font-sans-semibold text-xs uppercase tracking-wider',
  button: 'font-sans-semibold text-base',
  buttonSmall: 'font-sans-semibold text-sm',
} as const;

const tones = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  brand: 'text-brand',
  success: 'text-success-text',
  error: 'text-error',
  inverse: 'text-primary-foreground',
} as const;

export type TextProps = RNTextProps & {
  variant?: keyof typeof variants;
  tone?: keyof typeof tones;
  className?: string;
};

/**
 * Texto do app: aplica a fonte Inter no peso certo e a cor pelo token (tom).
 * Fonte, tamanho e cor vêm SÓ de `variant` e `tone`. Não passe `text-*` nem `font-*` no
 * `className`: duas classes para a mesma propriedade conflitam e vence a que vem depois no CSS
 * gerado, não a última da lista. Use o `className` para layout (margem, alinhamento...).
 */
export function Text({ variant = 'body', tone = 'default', className, ...props }: TextProps) {
  return <RNText className={cn(variants[variant], tones[tone], className)} {...props} />;
}
