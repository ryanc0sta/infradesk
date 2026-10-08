import {
  CalendarClock,
  CircleCheck,
  Clock,
  type LucideIcon,
  MapPin,
  Tag,
  UserRound,
} from 'lucide-react-native';
import { type ReactNode, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Button, Card, Text } from '@/components/ui';
import { formatDate, formatDateTime, formatLocation } from '@/lib/format';
import { useThemeColors } from '@/theme/useThemeColors';
import type { TicketDetail } from '@/types/ticket';

import { BeforeAfter } from './BeforeAfter';
import { PhotoCarousel } from './PhotoCarousel';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';
import { StatusTimeline } from './StatusTimeline';

/** Linha de metadado: ícone, rótulo curto e o valor. */
function MetaRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  const colors = useThemeColors();

  return (
    <View className="flex-row items-start gap-3 px-4 py-2.5">
      <View className="pt-0.5">
        <Icon size={16} color={colors['muted-foreground']} />
      </View>
      <Text variant="label" tone="muted" className="w-24">
        {label}
      </Text>
      <Text variant="label" className="flex-1">
        {children}
      </Text>
    </View>
  );
}

const Divider = () => <View className="ml-11 h-px bg-border" />;

export type TicketDetailViewProps = {
  ticket: TicketDetail;
  /** O autor pode cancelar enquanto o chamado está aberto. */
  canCancel: boolean;
  onCancel: () => void;
  isCancelling: boolean;
  cancelError: string | null;
};

/** Conteúdo da tela de detalhe: fotos, resumo, dados, resolução e histórico. */
export function TicketDetailView({
  ticket,
  canCancel,
  onCancel,
  isCancelling,
  cancelError,
}: TicketDetailViewProps) {
  const colors = useThemeColors();
  // O cancelamento pede confirmação na própria tela, em dois passos.
  const [confirming, setConfirming] = useState(false);

  const isActive = ['open', 'in_review', 'in_progress'].includes(ticket.status);
  const before = ticket.photos.find((photo) => photo.kind === 'before');
  const after = ticket.photos.find((photo) => photo.kind === 'after');

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="pb-8">
      {/* No carrossel entram só as fotos do problema; a do reparo aparece na resolução. */}
      <PhotoCarousel
        photos={ticket.photos.filter((photo) => photo.kind === 'before')}
        categoryIcon={ticket.category.icon}
      />

      <View className="gap-5 p-4">
        <View className="gap-2">
          {/* Cada selo vai em uma caixa própria: assim a linha centraliza os dois na vertical,
              mesmo tendo alturas diferentes. */}
          <View className="flex-row items-center gap-3">
            <View>
              <StatusBadge status={ticket.status} />
            </View>
            <View>
              <PriorityBadge priority={ticket.priority} />
            </View>
          </View>
          <Text variant="title" accessibilityRole="header">
            {ticket.title}
          </Text>
          {ticket.description ? <Text tone="muted">{ticket.description}</Text> : null}
        </View>

        <View className="overflow-hidden rounded-xl border border-border bg-surface py-1">
          <MetaRow icon={MapPin} label="Local">
            {formatLocation(ticket.location)}
          </MetaRow>
          <Divider />
          <MetaRow icon={Tag} label="Categoria">
            {ticket.category.name}
          </MetaRow>
          <Divider />
          <MetaRow icon={Clock} label="Aberto em">
            {formatDateTime(ticket.created_at)}
          </MetaRow>
          {isActive && ticket.due_at ? (
            <>
              <Divider />
              <MetaRow icon={CalendarClock} label="Prazo">
                até {formatDate(ticket.due_at)}
              </MetaRow>
            </>
          ) : null}
          {ticket.assignee ? (
            <>
              <Divider />
              <MetaRow icon={UserRound} label="Responsável">
                {ticket.assignee.full_name}
              </MetaRow>
            </>
          ) : null}
        </View>

        {ticket.status === 'done' ? (
          <Card className="gap-3">
            <View className="flex-row items-center gap-2">
              <CircleCheck size={18} color={colors.success} />
              <Text variant="subtitle" tone="success" accessibilityRole="header">
                Resolução
              </Text>
            </View>
            {ticket.resolution_note ? <Text variant="label">{ticket.resolution_note}</Text> : null}
            {before && after ? <BeforeAfter before={before.source} after={after.source} /> : null}
            {ticket.resolved_at ? (
              <Text variant="caption" tone="muted" tabular>
                Concluído em {formatDateTime(ticket.resolved_at)}
              </Text>
            ) : null}
          </Card>
        ) : null}

        <View className="gap-3">
          <Text variant="subtitle" accessibilityRole="header">
            Histórico
          </Text>
          <StatusTimeline events={ticket.events} />
        </View>

        {canCancel ? (
          confirming ? (
            <Card className="gap-3">
              <View className="gap-1">
                <Text variant="strong">Cancelar este chamado?</Text>
                <Text variant="label" tone="muted">
                  A equipe deixa de atendê-lo. Esta ação não pode ser desfeita.
                </Text>
              </View>
              {cancelError ? (
                <Text variant="caption" tone="error" accessibilityRole="alert">
                  {cancelError}
                </Text>
              ) : null}
              <View className="flex-row gap-2">
                <Button
                  title="Manter aberto"
                  variant="secondary"
                  disabled={isCancelling}
                  onPress={() => setConfirming(false)}
                  className="flex-1"
                />
                <Button
                  title="Sim, cancelar"
                  variant="destructive"
                  loading={isCancelling}
                  onPress={onCancel}
                  className="flex-1"
                />
              </View>
            </Card>
          ) : (
            <Button
              title="Cancelar chamado"
              variant="destructive"
              onPress={() => setConfirming(true)}
            />
          )
        ) : null}
      </View>
    </ScrollView>
  );
}
