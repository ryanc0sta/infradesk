import type { TicketEvent } from '@/types/ticket';

import { daysAgo, hoursAgo, minutesAgo } from './dates';
import { mockProfiles } from './profiles';

const [ricardo, carlos, ana] = mockProfiles;

/**
 * Linhas da tabela `ticket_events`. Cada chamado começa com um evento de criação
 * (`from_status` nulo) e ganha um evento a cada mudança de status, como o trigger do banco fará.
 */
export const mockTicketEvents: TicketEvent[] = [
  {
    id: 1,
    ticket_id: 1045,
    actor_id: ricardo.id,
    from_status: null,
    to_status: 'open',
    comment: null,
    created_at: minutesAgo(20),
  },

  {
    id: 2,
    ticket_id: 1042,
    actor_id: ricardo.id,
    from_status: null,
    to_status: 'open',
    comment: null,
    created_at: hoursAgo(2),
  },

  {
    id: 3,
    ticket_id: 1038,
    actor_id: ricardo.id,
    from_status: null,
    to_status: 'open',
    comment: null,
    created_at: hoursAgo(5),
  },
  {
    id: 4,
    ticket_id: 1038,
    actor_id: carlos.id,
    from_status: 'open',
    to_status: 'in_review',
    comment: 'Chamado encaminhado para a equipe de climatização.',
    created_at: hoursAgo(4),
  },

  {
    id: 5,
    ticket_id: 1031,
    actor_id: ricardo.id,
    from_status: null,
    to_status: 'open',
    comment: null,
    created_at: daysAgo(1),
  },
  {
    id: 6,
    ticket_id: 1031,
    actor_id: carlos.id,
    from_status: 'open',
    to_status: 'in_review',
    comment: 'Equipe de hidráulica acionada.',
    created_at: hoursAgo(22),
  },
  {
    id: 7,
    ticket_id: 1031,
    actor_id: carlos.id,
    from_status: 'in_review',
    to_status: 'in_progress',
    comment: 'Técnico em deslocamento para o local.',
    created_at: hoursAgo(5),
  },
  {
    id: 8,
    ticket_id: 1031,
    actor_id: carlos.id,
    from_status: null,
    to_status: null,
    comment: 'Registro geral fechado. Aguardando a peça do almoxarifado.',
    created_at: hoursAgo(3),
  },

  {
    id: 9,
    ticket_id: 1024,
    actor_id: ricardo.id,
    from_status: null,
    to_status: 'open',
    comment: null,
    created_at: daysAgo(6),
  },
  {
    id: 10,
    ticket_id: 1024,
    actor_id: carlos.id,
    from_status: 'open',
    to_status: 'in_review',
    comment: null,
    created_at: daysAgo(5),
  },
  {
    id: 11,
    ticket_id: 1024,
    actor_id: carlos.id,
    from_status: 'in_review',
    to_status: 'in_progress',
    comment: 'Reparo agendado com a equipe de pavimentação.',
    created_at: daysAgo(4),
  },
  {
    id: 12,
    ticket_id: 1024,
    actor_id: carlos.id,
    from_status: 'in_progress',
    to_status: 'done',
    comment: null,
    created_at: daysAgo(3),
  },

  {
    id: 13,
    ticket_id: 1017,
    actor_id: ricardo.id,
    from_status: null,
    to_status: 'open',
    comment: null,
    created_at: daysAgo(9),
  },
  {
    id: 14,
    ticket_id: 1017,
    actor_id: ana.id,
    from_status: 'open',
    to_status: 'rejected',
    comment: 'A pintura das portas já está prevista na reforma do bloco, em novembro.',
    created_at: daysAgo(8),
  },

  {
    id: 15,
    ticket_id: 1009,
    actor_id: ricardo.id,
    from_status: null,
    to_status: 'open',
    comment: null,
    created_at: daysAgo(14),
  },
  {
    id: 16,
    ticket_id: 1009,
    actor_id: ricardo.id,
    from_status: 'open',
    to_status: 'cancelled',
    comment: null,
    created_at: daysAgo(13),
  },

  {
    id: 17,
    ticket_id: 1044,
    actor_id: ana.id,
    from_status: null,
    to_status: 'open',
    comment: null,
    created_at: hoursAgo(1),
  },
  {
    id: 18,
    ticket_id: 1040,
    actor_id: carlos.id,
    from_status: null,
    to_status: 'open',
    comment: null,
    created_at: hoursAgo(3),
  },
];
