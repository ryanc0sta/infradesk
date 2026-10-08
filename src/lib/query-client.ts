import { QueryClient } from '@tanstack/react-query';

/**
 * Cliente do TanStack Query: guarda em memória o resultado de cada busca (cache) e controla
 * carregamento, erro e nova tentativa. Fica no módulo, fora dos componentes, pelo mesmo motivo
 * da sessão: sobreviver quando o layout raiz é remontado.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Por 30 s o dado é considerado "fresco" e a tela não busca de novo ao reaparecer.
      staleTime: 30_000,
      retry: 1,
    },
  },
});
