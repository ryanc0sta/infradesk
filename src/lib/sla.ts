import type { TicketPriority } from '@/types/ticket';

/** Prazo de atendimento por prioridade, em horas (docs/data-model.md, seção 3). */
export const slaHours: Record<TicketPriority, number> = {
  critical: 24,
  high: 3 * 24,
  medium: 7 * 24,
  low: 15 * 24,
};

/** `due_at = created_at + prazo da prioridade`. */
export function dueAt(createdAt: string, priority: TicketPriority): string {
  return new Date(new Date(createdAt).getTime() + slaHours[priority] * 3_600_000).toISOString();
}
