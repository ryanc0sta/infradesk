import { LogOut } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DevMenu } from '@/components/dev/DevMenu';
import { Avatar, Button, Card, Text } from '@/components/ui';
import { devMenuEnabled } from '@/lib/config';
import { roleLabels } from '@/lib/roles';
import { useSession } from '@/lib/session';

// Marcador com o essencial: quem está logado e como sair. O Perfil do protótipo chega na Etapa 3.
export default function ProfileScreen() {
  const { profile, signOut } = useSession();
  // O grupo (app) só abre com sessão; este retorno existe para o TypeScript e para o instante
  // em que a sessão acabou de ser encerrada.
  if (!profile) return null;

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <ScrollView contentContainerClassName="gap-6 p-6">
        <Text variant="display">Perfil</Text>

        <Card className="flex-row items-center gap-4">
          <Avatar name={profile.full_name} uri={profile.avatar_url} size="lg" />
          <View className="flex-1 gap-0.5">
            <Text variant="subtitle">{profile.full_name}</Text>
            <Text variant="label" tone="muted">
              {roleLabels[profile.role]}
            </Text>
          </View>
        </Card>

        {devMenuEnabled ? <DevMenu /> : null}

        <Button title="Sair da conta" variant="destructive" icon={LogOut} onPress={signOut} />
      </ScrollView>
    </SafeAreaView>
  );
}
