import { useSyncExternalStore } from 'react';

/** Como a lista de chamados é exibida: linhas com detalhes ou grade com a foto em destaque. */
export type TicketViewMode = 'list' | 'grid';

// Preferências de exibição, guardadas no módulo (como a sessão) para valerem em todas as telas
// e sobreviverem à troca de aba. Ainda não são gravadas no aparelho: voltam ao padrão ao
// recarregar o app. A gravação entra junto com o tema manual (issue #31).
let ticketViewMode: TicketViewMode = 'list';
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getTicketViewMode = () => ticketViewMode;

export function setTicketViewMode(mode: TicketViewMode) {
  ticketViewMode = mode;
  listeners.forEach((listener) => listener());
}

/** `const [mode, setMode] = useTicketViewMode()`, no mesmo formato do `useState`. */
export function useTicketViewMode() {
  const mode = useSyncExternalStore(subscribe, getTicketViewMode, getTicketViewMode);
  return [mode, setTicketViewMode] as const;
}
