import type { TicketStatus } from '@/types/ticket';

// As classes ficam escritas por extenso: o Tailwind só gera o que encontra como texto no código,
// então montar o nome com `bg-status-${status}-dot` não funcionaria.
/** Classe da cor do ponto de cada status, usada no selo e na linha do tempo. */
export const statusDotClasses = {
  open: 'bg-status-open-dot',
  in_review: 'bg-status-in-review-dot',
  in_progress: 'bg-status-in-progress-dot',
  done: 'bg-status-done-dot',
  rejected: 'bg-status-rejected-dot',
  cancelled: 'bg-status-cancelled-dot',
} satisfies Record<TicketStatus, string>;
