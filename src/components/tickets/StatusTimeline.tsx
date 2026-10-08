import { View } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatDateTime, formatRelativeTime } from '@/lib/format';
import { roleLabels } from '@/lib/roles';
import { statusLabels } from '@/lib/ticket-labels';
import type { TicketEventItem } from '@/types/ticket';

import { statusDotClasses } from './status-dots';

function eventTitle(event: TicketEventItem): string {
  if (!event.to_status) return 'Comentário';
  // A criação do chamado é o único evento sem status anterior.
  if (!event.from_status) return 'Chamado aberto';
  return statusLabels[event.to_status];
}

export type StatusTimelineProps = {
  /** Do mais recente para o mais antigo. */
  events: TicketEventItem[];
  className?: string;
};

/** Histórico do chamado em linha do tempo vertical: o que aconteceu, quem fez e quando. */
export function StatusTimeline({ events, className }: StatusTimelineProps) {
  return (
    <View className={className}>
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        const title = eventTitle(event);
        const author = event.actor
          ? `${event.actor.full_name} · ${roleLabels[event.actor.role]}`
          : 'Sistema';

        return (
          <View
            key={event.id}
            accessible
            accessibilityLabel={`${title}, por ${author}, em ${formatDateTime(event.created_at)}.${event.comment ? ` ${event.comment}` : ''}`}
            className="flex-row gap-3"
          >
            {/* Trilho: o ponto do evento e a linha que o liga ao evento seguinte. */}
            <View className="w-2.5 items-center">
              <View
                className={cn(
                  'mt-1.5 h-2.5 w-2.5 rounded-full',
                  event.to_status ? statusDotClasses[event.to_status] : 'bg-border',
                )}
              />
              {isLast ? null : <View className="mt-1 w-px flex-1 bg-border" />}
            </View>

            <View className={cn('flex-1 gap-1', !isLast && 'pb-4')}>
              <View className="flex-row items-center justify-between gap-2">
                <Text variant="strong" className="flex-1">
                  {title}
                </Text>
                <Text variant="caption" tone="muted" tabular>
                  {formatRelativeTime(event.created_at)}
                </Text>
              </View>
              <Text variant="caption" tone="muted">
                {author}
              </Text>
              {event.comment ? (
                <View className="mt-1 rounded-lg bg-surface-muted px-3 py-2">
                  <Text variant="label">{event.comment}</Text>
                </View>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}
