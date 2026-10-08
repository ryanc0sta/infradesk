import { Stack } from 'expo-router';
import { Inbox, Moon, Send, Trash2 } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { PriorityBadge, StatusBadge } from '@/components/tickets';
import {
  Avatar,
  Button,
  Card,
  Chip,
  EmptyState,
  FAB,
  Input,
  Skeleton,
  Text,
} from '@/components/ui';
import type { TicketPriority, TicketStatus } from '@/types/ticket';

const statuses: TicketStatus[] = [
  'open',
  'in_review',
  'in_progress',
  'done',
  'rejected',
  'cancelled',
];
const priorities: TicketPriority[] = ['low', 'medium', 'high', 'critical'];
const filters = ['Todos', 'Abertos', 'Em andamento', 'Concluídos'];

// Demonstração provisória dos componentes base (#6). A vitrine definitiva é a issue #8.
export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [filter, setFilter] = useState(filters[0]);
  const [title, setTitle] = useState('');

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen options={{ title: 'InfraDesk' }} />
      <ScrollView contentContainerClassName="gap-6 p-5 pb-28">
        <View className="gap-1">
          <Text variant="title" tone="brand">
            InfraDesk
          </Text>
          <Text tone="muted">Componentes base — Etapa 1</Text>
        </View>

        <Button
          title={`Tema ${colorScheme === 'dark' ? 'escuro' : 'claro'} — alternar`}
          variant="secondary"
          icon={Moon}
          onPress={toggleColorScheme}
        />

        <Card className="gap-3">
          <Text variant="subtitle">Botões</Text>
          <Button title="Enviar chamado" icon={Send} />
          <Button title="Cancelar" variant="secondary" />
          <Button title="Ver detalhes" variant="ghost" />
          <Button title="Excluir" variant="destructive" icon={Trash2} />
          <Button title="Enviando" loading />
          <Button title="Desabilitado" disabled />
        </Card>

        <Card className="gap-4">
          <Text variant="subtitle">Campos</Text>
          <Input
            label="Título"
            placeholder="Ex.: Vazamento na pia"
            value={title}
            onChangeText={setTitle}
          />
          <Input label="Descrição" placeholder="Descreva o problema" error="Campo obrigatório" />
        </Card>

        <View className="gap-3">
          <Text variant="subtitle">Chips</Text>
          <View className="flex-row flex-wrap gap-2">
            {filters.map((item) => (
              <Chip
                key={item}
                label={item}
                selected={filter === item}
                onPress={() => setFilter(item)}
              />
            ))}
          </View>
        </View>

        <Card className="gap-3">
          <Text variant="subtitle">Status</Text>
          <View className="flex-row flex-wrap gap-2">
            {statuses.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </View>
          <Text variant="subtitle">Prioridades</Text>
          <View className="flex-row flex-wrap gap-4">
            {priorities.map((priority) => (
              <PriorityBadge key={priority} priority={priority} />
            ))}
          </View>
        </Card>

        <Card className="flex-row items-center gap-3">
          <Avatar name="Maria da Silva" size="sm" />
          <Avatar name="João Pereira" />
          <Avatar name="Ana" size="lg" />
          <View className="flex-1">
            <Text variant="label">Avatares</Text>
            <Text variant="caption" tone="muted">
              Iniciais quando não há foto
            </Text>
          </View>
        </Card>

        <Card className="gap-3">
          <Text variant="subtitle">Carregando</Text>
          <View className="flex-row items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <View className="flex-1 gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </View>
          </View>
        </Card>

        <Card>
          <EmptyState
            icon={Inbox}
            title="Nenhum chamado ainda"
            description="Quando você abrir um chamado, ele aparece aqui."
            action={{ label: 'Abrir chamado', onPress: () => {} }}
          />
        </Card>
      </ScrollView>

      <FAB accessibilityLabel="Novo chamado" onPress={() => {}} />
    </View>
  );
}
