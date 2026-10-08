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

/** Botão quadrado de cantos suaves só com ícone, com 44 px de área de toque. */
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
      aria-disabled={!!disabled}
      disabled={disabled}
      // 40 px visíveis + 2 px de cada lado = 44 px de área de toque.
      hitSlop={2}
      className={cn(
        'h-10 w-10 items-center justify-center rounded-lg active:opacity-70',
        style.container,
        disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      <Icon size={20} color={colors[style.color]} />
    </Pressable>
  );
}
