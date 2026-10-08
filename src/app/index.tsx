import { Stack } from 'expo-router';
import { ArrowRight, Droplet, Inbox, LogOut, Moon, Plus, Zap } from 'lucide-react-native';
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
const filters = [
  { label: 'Abertos', count: 3 },
  { label: 'Em andamento', count: 1 },
  { label: 'Concluídos', count: 8 },
];
const categories = [
  { label: 'Hidráulica', icon: Droplet },
  { label: 'Elétrica', icon: Zap },
];

// Demonstração provisória dos componentes. A vitrine definitiva é a issue #8.
export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [filter, setFilter] = useState(filters[0].label);
  const [category, setCategory] = useState(categories[0].label);
  const [title, setTitle] = useState('');

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen options={{ title: 'InfraDesk' }} />
      <ScrollView contentContainerClassName="gap-6 p-6 pb-32">
        <View className="gap-1">
          <Text variant="display">Olá, Ricardo</Text>
          <Text tone="muted">Como podemos ajudar hoje?</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2"
        >
          {filters.map((item) => (
            <Chip
              key={item.label}
              label={item.label}
              count={item.count}
              selected={filter === item.label}
              onPress={() => setFilter(item.label)}
            />
          ))}
        </ScrollView>

        <Button
          title={`Tema ${colorScheme === 'dark' ? 'escuro' : 'claro'} — alternar`}
          variant="secondary"
          icon={Moon}
          onPress={toggleColorScheme}
        />

        <Card className="gap-3">
          <Text variant="overline" tone="muted">
            Botões
          </Text>
          <Button title="Revisar e enviar" icon={ArrowRight} size="lg" />
          <Button title="Adicionar foto" variant="secondary" />
          <Button title="Voltar para o início" variant="ghost" />
          <Button title="Sair da conta" variant="destructive" icon={LogOut} />
          <View className="flex-row flex-wrap items-center gap-2">
            <Button title="Assumir" variant="secondary" size="sm" />
            <Button title="Eu também" variant="secondary" size="sm" icon={Plus} />
            <Button title="Enviando" size="sm" loading />
          </View>
          <Button title="Desabilitado" disabled />
        </Card>

        <View className="gap-4">
          <Text variant="overline" tone="muted">
            Campos
          </Text>
          <Input
            label="Título do problema"
            placeholder="Ex.: Vazamento na pia do banheiro"
            value={title}
            onChangeText={setTitle}
          />
          <Input label="Descrição" placeholder="Descreva o problema" error="Campo obrigatório" />
        </View>

        <View className="gap-3">
          <Text variant="overline" tone="muted">
            Categoria
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {categories.map((item) => (
              <Chip
                key={item.label}
                label={item.label}
                icon={item.icon}
                selected={category === item.label}
                onPress={() => setCategory(item.label)}
              />
            ))}
          </View>
        </View>

        <Card className="gap-4">
          <Text variant="overline" tone="muted">
            Status
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {statuses.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </View>
          <Text variant="overline" tone="muted">
            Prioridades
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {priorities.map((priority) => (
              <PriorityBadge key={priority} priority={priority} variant="solid" />
            ))}
          </View>
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
          <Text variant="overline" tone="muted">
            Carregando
          </Text>
          <View className="flex-row items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-2xl" />
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
