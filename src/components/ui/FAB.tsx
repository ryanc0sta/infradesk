import { type LucideIcon, Plus } from 'lucide-react-native';
import { Pressable, type PressableProps } from 'react-native';

import { cn } from '@/lib/cn';
import { useThemeColors } from '@/theme/useThemeColors';

export type FABProps = Omit<PressableProps, 'children'> & {
  /** Obrigatório: o botão só tem ícone, então o leitor de tela precisa deste texto. */
  accessibilityLabel: string;
  icon?: LucideIcon;
  className?: string;
};

/**
 * Botão flutuante da ação principal da tela (ex.: "Novo chamado"), fixo no canto inferior direito.
 * É o único elemento com sombra: ele realmente flutua sobre a lista.
 */
export function FAB({ icon: Icon = Plus, className, ...props }: FABProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      className={cn(
        'absolute bottom-4 right-4 h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-md active:opacity-80',
        className,
      )}
      {...props}
    >
      <Icon size={24} color={colors['primary-foreground']} />
    </Pressable>
  );
}
