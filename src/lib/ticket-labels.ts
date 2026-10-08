import type { TicketPriority, TicketStatus } from '@/types/ticket';

/** Nomes dos status e das prioridades na interface (docs/data-model.md, seção 1). */
export const statusLabels: Record<TicketStatus, string> = {
  open: 'Aberto',
  in_review: 'Em análise',
  in_progress: 'Em andamento',
  done: 'Concluído',
  rejected: 'Rejeitado',
  cancelled: 'Cancelado',
};

export const priorityLabels: Record<TicketPriority, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  critical: 'Crítica',
};
