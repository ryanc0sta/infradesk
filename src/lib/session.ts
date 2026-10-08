import { useSyncExternalStore } from 'react';

import { signInAs } from '@/services/auth';
import type { Profile, UserRole } from '@/types/user';

/**
 * Sessão falsa da Etapa 2: vive só na memória e some ao recarregar o app.
 * Na Etapa 6 dá lugar à sessão real do Supabase.
 *
 * O perfil fica guardado AQUI, no módulo, e não no estado de um componente. Motivo: em algumas
 * navegações (ex.: o botão "avançar" do navegador) o Expo Router remonta o layout raiz, e todo
 * estado guardado em componente volta ao valor inicial, o que deslogava a pessoa. Uma variável
 * do módulo sobrevive a isso. O cliente do Supabase guarda a sessão real do mesmo jeito.
 */
let currentProfile: Profile | null = null;

// Quem quer ser avisado quando a sessão muda (as telas que chamaram `useSession`).
const listeners = new Set<() => void>();

function setProfile(profile: Profile | null) {
  currentProfile = profile;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getProfile = () => currentProfile;

/** Entra com o perfil fictício do papel escolhido. */
export function signIn(role: UserRole) {
  setProfile(signInAs(role));
}

export function signOut() {
  setProfile(null);
}

/**
 * Lê a sessão em qualquer tela: `const { profile, signIn, signOut } = useSession()`.
 * `profile` é quem está logado, ou `null` sem sessão.
 *
 * useSyncExternalStore é o hook do React para ler um valor que mora fora dos componentes:
 * ele assina as mudanças e renderiza a tela de novo quando o valor muda.
 */
export function useSession() {
  const profile = useSyncExternalStore(subscribe, getProfile, getProfile);
  return { profile, signIn, signOut };
}
