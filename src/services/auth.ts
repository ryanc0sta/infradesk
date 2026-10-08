import { mockProfiles } from '@/mocks/profiles';
import type { Profile, UserRole } from '@/types/user';

/**
 * Login de demonstração: devolve o perfil fictício do papel escolhido.
 * Na Etapa 6 este arquivo passa a falar com o Supabase Auth; quem o usa não muda.
 */
export function signInAs(role: UserRole): Profile {
  const profile = mockProfiles.find((item) => item.role === role);
  if (!profile) throw new Error(`Não há perfil fictício para o papel "${role}".`);
  return profile;
}
