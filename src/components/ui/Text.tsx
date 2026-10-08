import { StyleSheet, Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { cn } from '@/lib/cn';

// Escala curta e previsível: o peso (e não o tamanho) faz a maior parte da hierarquia.
const variants = {
  display: 'font-sans-semibold text-2xl',
  title: 'font-sans-semibold text-xl',
  subtitle: 'font-sans-semibold text-base',
  // Título de item de lista ou de card.
  strong: 'font-sans-semibold text-[15px] leading-5',
  body: 'font-sans text-[15px] leading-[22px]',
  label: 'font-sans-medium text-[13px] leading-[18px]',
  caption: 'font-sans text-xs',
  // Rótulo de seção em maiúsculas, ex.: "CONTA E SEGURANÇA", "PROTOCOLO".
  overline: 'font-sans-medium text-[11px] uppercase tracking-wider',
  button: 'font-sans-semibold text-[15px]',
  buttonSmall: 'font-sans-medium text-[13px]',
} as const;

const tones = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  brand: 'text-brand',
  success: 'text-success-text',
  error: 'text-error',
  // Sobre o botão primário (laranja).
  inverse: 'text-primary-foreground',
  // Sobre uma superfície na cor do texto (chip selecionado).
  contrast: 'text-background',
} as const;

export type TextProps = RNTextProps & {
  variant?: keyof typeof variants;
  tone?: keyof typeof tones;
  /**
   * Números com a mesma largura (tabulares). Use em protocolos, horários, contadores e prazos:
   * os dígitos ficam alinhados e o texto não "pula" quando o valor muda.
   */
  tabular?: boolean;
  className?: string;
};

/**
 * Texto do app: aplica a fonte Inter no peso certo e a cor pelo token (tom).
 * Fonte, tamanho e cor vêm SÓ de `variant` e `tone`. Não passe `text-*` nem `font-*` no
 * `className`: duas classes para a mesma propriedade conflitam e vence a que vem depois no CSS
 * gerado, não a última da lista. Use o `className` para layout (margem, alinhamento...).
 */
export function Text({
  variant = 'body',
  tone = 'default',
  tabular = false,
  className,
  style,
  ...props
}: TextProps) {
  return (
    <RNText
      className={cn(variants[variant], tones[tone], className)}
      // `fontVariant` vai em `style`: a classe `tabular-nums` do Tailwind não funciona no celular.
      style={tabular ? [styles.tabular, style] : style}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  tabular: { fontVariant: ['tabular-nums'] },
});
