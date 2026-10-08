import type { UserRole } from '@/types/user';

/** Nome de cada papel na interface. */
export const roleLabels: Record<UserRole, string> = {
  user: 'Usuário',
  technician: 'Técnico',
  admin: 'Administrador',
};
