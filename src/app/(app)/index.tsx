import { router } from 'expo-router';
import { LogOut, Palette } from 'lucide-react-native';
import { View } from 'react-native';

import { Avatar, Button, Card, Text } from '@/components/ui';
import { roleLabels } from '@/lib/roles';
import { useSession } from '@/lib/session';

// Tela inicial provisória de quem está logado. Dá lugar às abas por papel na issue #19.
export default function HomeScreen() {
  const { profile, signOut } = useSession();
  // O grupo (app) só abre com sessão; este retorno existe para o TypeScript e para o instante
  // em que a sessão acabou de ser encerrada.
  if (!profile) return null;

  const firstName = profile.full_name.split(' ')[0];

  return (
    <View className="flex-1 gap-6 bg-background p-6">
      <View className="gap-1">
        <Text variant="display">Olá, {firstName}</Text>
        <Text tone="muted">Você entrou com um perfil de demonstração.</Text>
      </View>

      <Card className="flex-row items-center gap-4">
        <Avatar name={profile.full_name} uri={profile.avatar_url} size="lg" />
        <View className="flex-1 gap-0.5">
          <Text variant="subtitle">{profile.full_name}</Text>
          <Text variant="label" tone="muted">
            {roleLabels[profile.role]}
          </Text>
        </View>
      </Card>

      <View className="gap-3">
        <Button
          title="Ver a vitrine de componentes"
          variant="secondary"
          icon={Palette}
          onPress={() => router.push('/showcase')}
        />
        <Button title="Sair da conta" variant="destructive" icon={LogOut} onPress={signOut} />
      </View>
    </View>
  );
}
