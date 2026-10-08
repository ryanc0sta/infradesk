import type { TicketStatus } from '@/types/ticket';

export type TicketFilterKey = 'all' | 'open' | 'in_progress' | 'done' | 'closed';

/**
 * Filtros da lista de chamados. Cada um agrupa status que, para quem abriu o chamado, significam
 * a mesma coisa: "ainda ninguém pegou", "estão resolvendo", "resolvido" e "não vai ser feito".
 */
export const ticketFilters: {
  key: TicketFilterKey;
  label: string;
  statuses: TicketStatus[] | null;
}[] = [
  { key: 'all', label: 'Todos', statuses: null },
  { key: 'open', label: 'Abertos', statuses: ['open', 'in_review'] },
  { key: 'in_progress', label: 'Em andamento', statuses: ['in_progress'] },
  { key: 'done', label: 'Concluídos', statuses: ['done'] },
  { key: 'closed', label: 'Encerrados', statuses: ['rejected', 'cancelled'] },
];

export function matchesFilter(status: TicketStatus, key: TicketFilterKey): boolean {
  const statuses = ticketFilters.find((filter) => filter.key === key)?.statuses;
  return !statuses || statuses.includes(status);
}
