import {
  ArrowLeft,
  ArrowRight,
  Bell,
  ClipboardCheck,
  Droplet,
  Inbox,
  Lock,
  LogOut,
  Moon,
  Plus,
  SlidersHorizontal,
  Timer,
  TriangleAlert,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react-native';
import { type ReactNode, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { PriorityBadge, StatusBadge } from '@/components/tickets';
import {
  Avatar,
  Button,
  Card,
  Chip,
  EmptyState,
  FAB,
  IconButton,
  Input,
  ListGroup,
  ListItem,
  ProgressBar,
  SectionHeader,
  Skeleton,
  StatCard,
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

// As classes ficam por extenso porque o Tailwind só gera o que encontra escrito no código.
const ramp = [
  { name: 'background', className: 'bg-background' },
  { name: 'surface-muted', className: 'bg-surface-muted' },
  { name: 'border', className: 'bg-border' },
  { name: 'accent-soft', className: 'bg-accent-soft' },
  { name: 'accent', className: 'bg-accent' },
  { name: 'primary', className: 'bg-primary' },
  { name: 'brand', className: 'bg-brand' },
  { name: 'foreground', className: 'bg-foreground' },
];
const exceptions = [
  { name: 'success', className: 'bg-success' },
  { name: 'danger', className: 'bg-danger' },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-3">
      <Text variant="overline" tone="muted" accessibilityRole="header">
        {title}
      </Text>
      {children}
    </View>
  );
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <View className="w-24 items-center gap-1">
      <View className={`h-12 w-12 rounded-2xl border border-border ${className}`} />
      <Text variant="caption" tone="muted" numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
}

/** Vitrine do design system: todos os componentes e variantes, para conferir nos dois temas. */
export function Showcase() {
  const [filter, setFilter] = useState(filters[0].label);
  const [category, setCategory] = useState(categories[0].label);
  const [title, setTitle] = useState('');

  return (
    <View className="flex-1 bg-background">
      <ScrollView contentContainerClassName="gap-8 p-6 pb-32">
        <Section title="Cores — rampa quente">
          <Card className="gap-4">
            <View className="flex-row flex-wrap gap-2">
              {ramp.map((item) => (
                <Swatch key={item.name} {...item} />
              ))}
            </View>
            <Text variant="caption" tone="muted">
              Fora da rampa, só com significado fixo: sucesso e erro.
            </Text>
            <View className="flex-row gap-2">
              {exceptions.map((item) => (
                <Swatch key={item.name} {...item} />
              ))}
            </View>
          </Card>
        </Section>

        <Section title="Tipografia">
          <Card className="gap-2">
            <Text variant="display">Display</Text>
            <Text variant="title">Título</Text>
            <Text variant="subtitle">Subtítulo</Text>
            <Text>Corpo: texto corrido do aplicativo.</Text>
            <Text variant="label">Rótulo</Text>
            <Text variant="caption">Legenda</Text>
            <Text variant="overline" tone="muted">
              Sobrelinha
            </Text>
            <View className="flex-row flex-wrap gap-4 pt-2">
              <Text tone="muted">Apagado</Text>
              <Text tone="brand">Marca</Text>
              <Text tone="success">Sucesso</Text>
              <Text tone="error">Erro</Text>
            </View>
          </Card>
        </Section>

        <Section title="Botões">
          <Card className="gap-3">
            <Button title="Revisar e enviar" icon={ArrowRight} size="lg" />
            <Button title="Ver meus chamados" />
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
        </Section>

        <Section title="Botões de ícone">
          <Card className="flex-row items-center gap-3">
            <IconButton icon={ArrowLeft} accessibilityLabel="Voltar" />
            <IconButton icon={SlidersHorizontal} variant="soft" accessibilityLabel="Filtrar" />
            {/* O fundo escuro simula uma foto, onde a variante `overlay` é usada. */}
            <View className="rounded-2xl bg-muted-foreground p-2">
              <IconButton icon={X} variant="overlay" accessibilityLabel="Fechar" />
            </View>
            <IconButton icon={Bell} accessibilityLabel="Alertas" disabled />
          </Card>
        </Section>

        <Section title="Campos">
          <View className="gap-4">
            <Input
              label="Título do problema"
              placeholder="Ex.: Vazamento na pia do banheiro"
              value={title}
              onChangeText={setTitle}
            />
            <Input label="Descrição" placeholder="Descreva o problema" error="Campo obrigatório" />
          </View>
        </Section>

        <Section title="Chips">
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
        </Section>

        <Section title="Status e prioridade">
          <Card className="gap-4">
            <View className="flex-row flex-wrap gap-2">
              {statuses.map((status) => (
                <StatusBadge key={status} status={status} />
              ))}
            </View>
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
        </Section>

        <Section title="Cabeçalho de seção e lista">
          <SectionHeader title="Meus chamados" action={{ label: 'Ver todos', onPress: () => {} }} />
          <ListGroup>
            <ListItem icon={User} title="Dados pessoais" subtitle="Nome, e-mail e foto" />
            <ListItem icon={Bell} title="Notificações" subtitle="Alertas de novos chamados" />
            <ListItem icon={Moon} title="Tema" subtitle="Automático" />
            <ListItem icon={Lock} title="Privacidade" />
          </ListGroup>
        </Section>

        <Section title="Métricas">
          <View className="flex-row gap-3">
            <StatCard
              icon={Timer}
              value="14 min"
              label="Tempo médio de resposta"
              className="flex-1"
            />
            <StatCard
              icon={ClipboardCheck}
              value="84"
              label="Chamados resolvidos"
              tone="success"
              className="flex-1"
            />
          </View>
          <View className="flex-row gap-3">
            <StatCard
              icon={TriangleAlert}
              value="08"
              label="Críticos pendentes"
              tone="error"
              className="flex-1"
            />
            <StatCard icon={Users} value="12" label="Técnicos ativos" className="flex-1" />
          </View>
        </Section>

        <Section title="Barras">
          <Card className="gap-4">
            <ProgressBar label="Hidráulica" value={0.85} tone="strong" />
            <ProgressBar label="Elétrica" value={0.62} />
            <ProgressBar label="Climatização" value={0.3} tone="soft" />
            <ProgressBar label="Resolvidos na semana" value={0.72} tone="success" />
          </Card>
        </Section>

        <Section title="Avatares">
          <Card className="flex-row items-center gap-3">
            <Avatar name="Maria da Silva" size="sm" />
            <Avatar name="João Pereira" />
            <Avatar name="Ana" size="lg" />
            <Text variant="label" tone="muted" className="flex-1">
              Iniciais quando não há foto
            </Text>
          </Card>
        </Section>

        <Section title="Carregando">
          <Card className="flex-row items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-2xl" />
            <View className="flex-1 gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </View>
          </Card>
        </Section>

        <Section title="Lista vazia">
          <Card>
            <EmptyState
              icon={Inbox}
              title="Nenhum chamado ainda"
              description="Quando você abrir um chamado, ele aparece aqui."
              action={{ label: 'Abrir chamado', onPress: () => {} }}
            />
          </Card>
        </Section>
      </ScrollView>

      <FAB accessibilityLabel="Novo chamado" onPress={() => {}} />
    </View>
  );
}
