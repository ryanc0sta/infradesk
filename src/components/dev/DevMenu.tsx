import { router } from 'expo-router';
import { Camera, FileText, Palette } from 'lucide-react-native';
import { View } from 'react-native';

import { Chip, ListGroup, ListItem, Text } from '@/components/ui';
import { sampleTicketId } from '@/lib/config';
import { roleLabels } from '@/lib/roles';
import { useSession } from '@/lib/session';
import type { UserRole } from '@/types/user';

const roles: UserRole[] = ['user', 'technician', 'admin'];

/**
 * Atalhos para testar o app enquanto a sessão é falsa: trocar de papel sem sair e abrir telas
 * de exemplo. Controlado por `devMenuEnabled` em src/lib/config.ts.
 */
export function DevMenu() {
  const { profile, signIn } = useSession();
  if (!profile) return null;

  return (
    <View className="gap-3">
      <Text variant="overline" tone="muted" accessibilityRole="header">
        Desenvolvimento
      </Text>

      <View className="gap-2">
        <Text variant="label" tone="muted">
          Ver o app como
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {roles.map((role) => (
            <Chip
              key={role}
              label={roleLabels[role]}
              selected={profile.role === role}
              accessibilityLabel={`Ver como ${roleLabels[role]}`}
              onPress={() => signIn(role)}
            />
          ))}
        </View>
      </View>

      <ListGroup>
        <ListItem
          icon={FileText}
          title={`Chamado #${sampleTicketId}`}
          subtitle="Abre o detalhe de exemplo"
          onPress={() => router.push(`/tickets/${sampleTicketId}`)}
        />
        <ListItem
          icon={Camera}
          title="Novo chamado"
          subtitle="Abre o modal de criação"
          onPress={() => router.push('/tickets/new')}
        />
        <ListItem
          icon={Palette}
          title="Vitrine de componentes"
          subtitle="Design system nos dois temas"
          onPress={() => router.push('/showcase')}
        />
      </ListGroup>
    </View>
  );
}
