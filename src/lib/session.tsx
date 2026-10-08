import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';

import { signInAs } from '@/services/auth';
import type { Profile, UserRole } from '@/types/user';

type SessionContextValue = {
  /** Perfil de quem está logado, ou `null` sem sessão. */
  profile: Profile | null;
  /** Entra com o perfil fictício do papel escolhido. */
  signIn: (role: UserRole) => void;
  signOut: () => void;
};

// O Contexto é um "quadro de avisos": o que o Provider publica aqui, qualquer tela abaixo dele
// consegue ler com `useSession()`, sem precisar receber por props.
const SessionContext = createContext<SessionContextValue | null>(null);

/**
 * Sessão falsa da Etapa 2: vive só na memória e some ao recarregar o app.
 * Na Etapa 6 dá lugar à sessão real do Supabase.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);

  // useMemo evita criar um objeto novo a cada renderização, o que faria todas as telas que
  // leem a sessão renderizarem de novo sem necessidade.
  const value = useMemo<SessionContextValue>(
    () => ({
      profile,
      signIn: (role) => setProfile(signInAs(role)),
      signOut: () => setProfile(null),
    }),
    [profile],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error('useSession precisa estar dentro de <SessionProvider>.');
  return value;
}
