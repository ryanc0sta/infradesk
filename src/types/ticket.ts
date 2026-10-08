/**
 * Tipos do domínio de chamados, iguais às tabelas do banco (docs/data-model.md).
 * Na Etapa 6 passam a vir de `database.ts`, gerado pelo Supabase.
 */
export type TicketStatus = 'open' | 'in_review' | 'in_progress' | 'done' | 'rejected' | 'cancelled';

export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export type PhotoKind = 'before' | 'after';

export type Category = {
  id: number;
  name: string;
  /** Nome do ícone do Lucide (ver src/lib/categories.ts). */
  icon: string | null;
};

export type Location = {
  id: number;
  name: string;
  building: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type Ticket = {
  /** Também é o número de protocolo (#1042). */
  id: number;
  author_id: string;
  assignee_id: string | null;
  location_id: number | null;
  category_id: number;
  title: string;
  description: string | null;
  priority: TicketPriority;
  status: TicketStatus;
  latitude: number | null;
  longitude: number | null;
  due_at: string | null;
  resolution_note: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
};

export type TicketPhoto = {
  id: number;
  ticket_id: number;
  storage_path: string;
  kind: PhotoKind;
  uploaded_by: string | null;
  created_at: string;
};

/**
 * Imagem pronta para o componente `Image`: um arquivo embutido no app (número devolvido pelo
 * `require`) ou um endereço. Com mocks é sempre o primeiro; na Etapa 7 vira a URL assinada.
 */
export type PhotoSource = number | { uri: string };

/** Chamado como aparece em listas: já com o local, a categoria e a foto de capa. */
export type TicketListItem = Ticket & {
  location: Location | null;
  category: Category;
  cover: PhotoSource | null;
};
