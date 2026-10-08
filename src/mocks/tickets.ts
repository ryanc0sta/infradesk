import { dueAt } from '@/lib/sla';
import type { Ticket, TicketPriority, TicketStatus } from '@/types/ticket';

import { daysAgo, hoursAgo, minutesAgo } from './dates';
import { mockProfiles } from './profiles';

const [ricardo, carlos, ana] = mockProfiles;

type Seed = {
  id: number;
  author_id: string;
  assignee_id?: string;
  location_id: number;
  category_id: number;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  created_at: string;
  updated_at?: string;
  resolved_at?: string;
  resolution_note?: string;
};

// Preenche os campos derivados para cada chamado ter o formato completo da tabela `tickets`.
const ticket = (seed: Seed): Ticket => ({
  assignee_id: null,
  latitude: null,
  longitude: null,
  resolution_note: null,
  resolved_at: null,
  ...seed,
  updated_at: seed.updated_at ?? seed.created_at,
  due_at: dueAt(seed.created_at, seed.priority),
});

export const mockTickets: Ticket[] = [
  ticket({
    id: 1045,
    author_id: ricardo.id,
    location_id: 7,
    category_id: 2,
    title: 'Lâmpadas queimadas no corredor',
    description: 'Três lâmpadas seguidas apagadas, o corredor fica escuro à noite.',
    priority: 'medium',
    status: 'open',
    created_at: minutesAgo(20),
  }),
  ticket({
    id: 1042,
    author_id: ricardo.id,
    location_id: 1,
    category_id: 1,
    title: 'Vazamento na pia do banheiro masculino',
    description: 'A torneira não fecha e a água escorre o tempo todo.',
    priority: 'high',
    status: 'open',
    created_at: hoursAgo(2),
  }),
  ticket({
    id: 1038,
    author_id: ricardo.id,
    location_id: 2,
    category_id: 6,
    title: 'Ar-condicionado com a tampa solta',
    description: 'A tampa frontal está pendurada e o aparelho faz barulho.',
    priority: 'medium',
    status: 'in_review',
    created_at: hoursAgo(5),
    updated_at: hoursAgo(4),
  }),
  ticket({
    id: 1031,
    author_id: ricardo.id,
    assignee_id: carlos.id,
    location_id: 3,
    category_id: 1,
    title: 'Cano estourado no jardim',
    description: 'Cano rompido jorrando água ao lado da calçada.',
    priority: 'critical',
    status: 'in_progress',
    created_at: daysAgo(1),
    updated_at: hoursAgo(3),
  }),
  ticket({
    id: 1024,
    author_id: ricardo.id,
    assignee_id: carlos.id,
    location_id: 4,
    category_id: 3,
    title: 'Buraco no estacionamento',
    description: 'Buraco fundo perto da entrada, risco para carros e motos.',
    priority: 'medium',
    status: 'done',
    created_at: daysAgo(6),
    updated_at: daysAgo(3),
    resolved_at: daysAgo(3),
    resolution_note: 'Buraco preenchido e asfalto recomposto.',
  }),
  ticket({
    id: 1017,
    author_id: ricardo.id,
    location_id: 5,
    category_id: 4,
    title: 'Portas dos banheiros pichadas',
    description: 'Todas as portas das cabines estão pichadas.',
    priority: 'low',
    status: 'rejected',
    created_at: daysAgo(9),
    updated_at: daysAgo(8),
  }),
  ticket({
    id: 1009,
    author_id: ricardo.id,
    location_id: 6,
    category_id: 3,
    title: 'Estante com os cantos quebrados',
    description: 'Os cantos da estante estão lascados e soltando farpas.',
    priority: 'low',
    status: 'cancelled',
    created_at: daysAgo(14),
    updated_at: daysAgo(13),
  }),
  // Chamados de outras pessoas: o usuário comum não os vê; a equipe verá na Etapa 4.
  ticket({
    id: 1044,
    author_id: ana.id,
    location_id: 8,
    category_id: 3,
    title: 'Asfalto danificado no acesso principal',
    description: 'Trecho do asfalto se soltou junto ao meio-fio.',
    priority: 'high',
    status: 'open',
    created_at: hoursAgo(1),
  }),
  ticket({
    id: 1040,
    author_id: carlos.id,
    location_id: 1,
    category_id: 1,
    title: 'Registro enferrujado vazando',
    description: 'Registro antigo com vazamento forte sob a pia.',
    priority: 'critical',
    status: 'open',
    created_at: hoursAgo(3),
  }),
];
