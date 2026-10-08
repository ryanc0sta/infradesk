import {
  Bell,
  House,
  LayoutDashboard,
  type LucideIcon,
  MapPin,
  Search,
  Ticket,
  User,
  Users,
} from 'lucide-react-native';

import type { UserRole } from '@/types/user';

/** Nome de cada arquivo em `src/app/(app)/(tabs)/`. */
export type TabName =
  'dashboard' | 'home' | 'queue' | 'search' | 'locations' | 'team' | 'notifications' | 'profile';

/** Rótulo e ícone de cada aba na barra. */
export const tabs: Record<TabName, { label: string; icon: LucideIcon }> = {
  dashboard: { label: 'Painel', icon: LayoutDashboard },
  home: { label: 'Início', icon: House },
  queue: { label: 'Fila', icon: Ticket },
  search: { label: 'Buscar', icon: Search },
  locations: { label: 'Locais', icon: MapPin },
  team: { label: 'Equipe', icon: Users },
  notifications: { label: 'Alertas', icon: Bell },
  profile: { label: 'Perfil', icon: User },
};

/**
 * Ordem das abas na barra. É uma lista só para os três papéis: cada papel vê o subconjunto
 * definido em `tabsByRole`, nesta mesma ordem.
 */
export const tabOrder: TabName[] = [
  'dashboard',
  'home',
  'queue',
  'search',
  'locations',
  'team',
  'notifications',
  'profile',
];

/** Abas de cada papel (docs/design.md, seção 5). A primeira é a aba inicial. */
export const tabsByRole: Record<UserRole, TabName[]> = {
  user: ['home', 'search', 'notifications', 'profile'],
  technician: ['queue', 'locations', 'notifications', 'profile'],
  admin: ['dashboard', 'queue', 'team', 'profile'],
};

/** Técnico e admin têm o botão central de QR Code na barra. */
export const rolesWithScanButton: UserRole[] = ['technician', 'admin'];
