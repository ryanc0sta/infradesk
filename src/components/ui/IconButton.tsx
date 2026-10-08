import type { LucideIcon } from 'lucide-react-native';
import { Pressable, type PressableProps } from 'react-native';

import { cn } from '@/lib/cn';
import { type ColorToken, useThemeColors } from '@/theme/useThemeColors';

const variants = {
  // Fundo areia: ações de cabeçalho (ex.: filtro).
  soft: { container: 'bg-surface-muted', color: 'foreground' },
  // Sem fundo: voltar, fechar, editar.
  ghost: { container: '', color: 'foreground' },
  // Fundo escuro translúcido: botões em cima de fotos (voltar no detalhe, flash na câmera).
  overlay: { container: 'bg-overlay/60', color: 'overlay-foreground' },
} satisfies Record<string, { container: string; color: ColorToken }>;

export type IconButtonProps = Omit<PressableProps, 'children'> & {
  icon: LucideIcon;
  /** Obrigatório: o botão só tem ícone, então o leitor de tela precisa deste texto. */
  accessibilityLabel: string;
  variant?: keyof typeof variants;
  className?: string;
};

/** Botão redondo só com ícone, com 44 px de área de toque. */
export function IconButton({
  icon: Icon,
  variant = 'ghost',
  disabled,
  className,
  ...props
}: IconButtonProps) {
  const colors = useThemeColors();
  const style = variants[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      className={cn(
        'h-11 w-11 items-center justify-center rounded-full active:opacity-70',
        style.container,
        disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      <Icon size={22} color={colors[style.color]} />
    </Pressable>
  );
}
