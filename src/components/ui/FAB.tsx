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

/** Botão flutuante redondo (ex.: "Novo chamado"), fixo no canto inferior direito. */
export function FAB({ icon: Icon = Plus, className, ...props }: FABProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      className={cn(
        'absolute bottom-6 right-6 h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg active:opacity-80',
        className,
      )}
      {...props}
    >
      <Icon size={28} color={colors['primary-foreground']} />
    </Pressable>
  );
}
