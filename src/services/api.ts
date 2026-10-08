import { mockCategories } from '@/mocks/categories';
import { mockLocations } from '@/mocks/locations';
import { mockProfiles } from '@/mocks/profiles';
import { mockTicketEvents } from '@/mocks/ticket-events';
import { mockPhotoFiles, mockTicketPhotos } from '@/mocks/ticket-photos';
import { mockTickets } from '@/mocks/tickets';
import type { Person, Ticket, TicketDetail, TicketListItem, TicketPhotoItem } from '@/types/ticket';
import type { Profile } from '@/types/user';

/**
 * Acesso a dados do app. Hoje lê os mocks com um atraso que imita a rede; na Etapa 6 as
 * mesmas funções passam a consultar o Supabase, e nada fora deste arquivo precisa mudar.
 *
 * As regras de permissão e de negócio aplicadas aqui são as mesmas que o banco vai impor
 * (docs/data-model.md, seções 4 e 5): quem não pode ver um chamado recebe "não existe", e
 * uma ação fora das regras é recusada com erro.
 */
const delay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

function toPerson(profileId: string | null): Person | null {
  const profile = mockProfiles.find((item) => item.id === profileId);
  return profile ? { id: profile.id, full_name: profile.full_name, role: profile.role } : null;
}

function photosOf(ticketId: number): TicketPhotoItem[] {
  return mockTicketPhotos
    .filter((photo) => photo.ticket_id === ticketId && mockPhotoFiles[photo.storage_path])
    .map((photo) => ({
      id: photo.id,
      kind: photo.kind,
      source: mockPhotoFiles[photo.storage_path],
    }));
}

// Junta ao chamado o que no banco viria por JOIN: local, categoria e a primeira foto "antes".
function toListItem(ticket: Ticket): TicketListItem {
  const category = mockCategories.find((item) => item.id === ticket.category_id);
  if (!category) throw new Error(`Categoria ${ticket.category_id} não existe nos mocks.`);

  return {
    ...ticket,
    category,
    location: mockLocations.find((item) => item.id === ticket.location_id) ?? null,
    cover: photosOf(ticket.id).find((photo) => photo.kind === 'before')?.source ?? null,
  };
}

/** Usuário comum vê só os próprios chamados; técnico e admin veem todos. */
function canView(ticket: Ticket, viewer: Profile): boolean {
  return viewer.role !== 'user' || ticket.author_id === viewer.id;
}

/** Chamados abertos por uma pessoa, do mais recente para o mais antigo. */
export async function listTicketsByAuthor(authorId: string): Promise<TicketListItem[]> {
  await delay();
  return mockTickets
    .filter((ticket) => ticket.author_id === authorId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map(toListItem);
}

/** Um chamado completo, ou `null` se ele não existe ou quem pede não pode vê-lo. */
export async function getTicket(id: number, viewer: Profile): Promise<TicketDetail | null> {
  await delay();
  const ticket = mockTickets.find((item) => item.id === id);
  if (!ticket || !canView(ticket, viewer)) return null;

  return {
    ...toListItem(ticket),
    photos: photosOf(ticket.id),
    events: mockTicketEvents
      .filter((event) => event.ticket_id === ticket.id)
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .map((event) => ({ ...event, actor: toPerson(event.actor_id) })),
    author: toPerson(ticket.author_id),
    assignee: toPerson(ticket.assignee_id),
  };
}

/**
 * Cancela um chamado. Só o autor pode cancelar, e só enquanto o status for "aberto".
 * Como toda mudança de status, gera um evento no histórico.
 */
export async function cancelTicket(id: number, actor: Profile): Promise<void> {
  await delay(500);
  const ticket = mockTickets.find((item) => item.id === id);
  if (!ticket || !canView(ticket, actor)) throw new Error('Chamado não encontrado.');
  if (ticket.author_id !== actor.id) throw new Error('Só quem abriu o chamado pode cancelá-lo.');
  if (ticket.status !== 'open') {
    throw new Error('Só é possível cancelar um chamado que ainda está aberto.');
  }

  const now = new Date().toISOString();
  mockTicketEvents.push({
    id: Math.max(...mockTicketEvents.map((event) => event.id)) + 1,
    ticket_id: ticket.id,
    actor_id: actor.id,
    from_status: ticket.status,
    to_status: 'cancelled',
    comment: null,
    created_at: now,
  });
  ticket.status = 'cancelled';
  ticket.updated_at = now;
}
