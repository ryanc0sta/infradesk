import { mockCategories } from '@/mocks/categories';
import { mockLocations } from '@/mocks/locations';
import { mockPhotoFiles, mockTicketPhotos } from '@/mocks/ticket-photos';
import { mockTickets } from '@/mocks/tickets';
import type { Ticket, TicketListItem } from '@/types/ticket';

/**
 * Acesso a dados do app. Hoje lê os mocks com um atraso que imita a rede; na Etapa 6 as
 * mesmas funções passam a consultar o Supabase, e nada fora deste arquivo precisa mudar.
 */
const delay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

// Junta ao chamado o que no banco viria por JOIN: local, categoria e a primeira foto "antes".
function toListItem(ticket: Ticket): TicketListItem {
  const category = mockCategories.find((item) => item.id === ticket.category_id);
  if (!category) throw new Error(`Categoria ${ticket.category_id} não existe nos mocks.`);
  const photo = mockTicketPhotos.find(
    (item) => item.ticket_id === ticket.id && item.kind === 'before',
  );

  return {
    ...ticket,
    category,
    location: mockLocations.find((item) => item.id === ticket.location_id) ?? null,
    cover: photo ? (mockPhotoFiles[photo.storage_path] ?? null) : null,
  };
}

/** Chamados abertos por uma pessoa, do mais recente para o mais antigo. */
export async function listTicketsByAuthor(authorId: string): Promise<TicketListItem[]> {
  await delay();
  return mockTickets
    .filter((ticket) => ticket.author_id === authorId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map(toListItem);
}
