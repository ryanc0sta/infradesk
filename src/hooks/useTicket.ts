import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useSession } from '@/lib/session';
import { cancelTicket, getTicket } from '@/services/api';

/** Um chamado completo. `data` é `null` quando ele não existe ou a pessoa não pode vê-lo. */
export function useTicket(id: number | null) {
  const { profile } = useSession();

  return useQuery({
    queryKey: ['tickets', 'detail', id, profile?.id],
    queryFn: () => getTicket(id!, profile!),
    enabled: id !== null && !!profile,
  });
}

/**
 * Cancela um chamado. `useMutation` é o par do `useQuery` para ações que ALTERAM dados:
 * devolve `mutate` (dispara a ação), `isPending` e `error`.
 */
export function useCancelTicket() {
  const { profile } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => cancelTicket(id, profile!),
    // Depois de cancelar, marca como desatualizado tudo que começa com 'tickets' no cache:
    // a lista e o detalhe buscam de novo e mostram o status novo.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tickets'] }),
  });
}
