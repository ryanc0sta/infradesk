import { useQuery } from '@tanstack/react-query';

import { useSession } from '@/lib/session';
import { listTicketsByAuthor } from '@/services/api';

/**
 * Chamados de quem está logado. Devolve o objeto do TanStack Query: `data`, `isPending`
 * (primeira carga), `isError`, `refetch` e `isRefetching` (atualizando com dados na tela).
 */
export function useMyTickets() {
  const { profile } = useSession();
  const authorId = profile?.id;

  return useQuery({
    // A chave identifica esta busca no cache; muda com o usuário, então cada um tem a sua lista.
    queryKey: ['tickets', 'by-author', authorId],
    queryFn: () => listTicketsByAuthor(authorId!),
    enabled: !!authorId,
  });
}
