import type { LucideProps } from 'lucide-react-native';
import { createElement } from 'react';

import { getCategoryIcon } from '@/lib/categories';

export type CategoryIconProps = LucideProps & {
  /** Nome do ícone guardado na categoria (`categories.icon`). */
  name: string | null;
};

/** Desenha o ícone de uma categoria a partir do nome guardado nos dados. */
export function CategoryIcon({ name, ...props }: CategoryIconProps) {
  // createElement é o que o JSX vira por baixo dos panos; aqui deixa claro que o componente é
  // escolhido de uma lista fixa, e não criado a cada renderização.
  return createElement(getCategoryIcon(name), props);
}
