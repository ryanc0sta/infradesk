import {
  BrushCleaning,
  CircleEllipsis,
  Droplet,
  Hammer,
  type LucideIcon,
  ShieldAlert,
  Wifi,
  Wind,
  Zap,
} from 'lucide-react-native';

// O banco guarda só o NOME do ícone (coluna `categories.icon`). Este mapa liga o nome ao
// componente; importar cada ícone pelo nome mantém fora do app os que não são usados.
const icons: Record<string, LucideIcon> = {
  BrushCleaning,
  CircleEllipsis,
  Droplet,
  Hammer,
  ShieldAlert,
  Wifi,
  Wind,
  Zap,
};

/** Ícone da categoria; cai em "Outros" se o nome não for conhecido. */
export function getCategoryIcon(name: string | null): LucideIcon {
  return (name && icons[name]) || CircleEllipsis;
}
