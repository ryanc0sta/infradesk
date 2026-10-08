/**
 * Enums do domínio de chamados, iguais aos do banco (docs/data-model.md, seção 1).
 * Na Etapa 6 passam a vir de `database.ts`, gerado pelo Supabase.
 */
export type TicketStatus = 'open' | 'in_review' | 'in_progress' | 'done' | 'rejected' | 'cancelled';

export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
