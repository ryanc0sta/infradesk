import { router } from 'expo-router';
import { type LucideIcon, ShieldCheck, User, Wrench } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

import { Button, ListGroup, ListItem, Text } from '@/components/ui';
import { roleLabels } from '@/lib/roles';
import { useSession } from '@/lib/session';
import type { UserRole } from '@/types/user';

const roles: { role: UserRole; icon: LucideIcon; description: string }[] = [
  { role: 'user', icon: User, description: 'Abre chamados e acompanha os próprios' },
  { role: 'technician', icon: Wrench, description: 'Atende a fila de chamados' },
  { role: 'admin', icon: ShieldCheck, description: 'Vê o painel e gerencia a equipe' },
];

// Login de demonstração da Etapa 2. O formulário de e-mail e senha chega na Etapa 3.
export default function LoginScreen() {
  const { signIn } = useSession();

  function handleSignIn(role: UserRole) {
    signIn(role);
    // Com a sessão criada, o grupo (app) fica disponível; `replace` troca a tela sem deixar o
    // login no histórico do botão "voltar".
    router.replace('/');
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-5 p-4">
      <View className="gap-1">
        <Text variant="title">Entrar como</Text>
        <Text variant="label" tone="muted">
          Login de demonstração: escolha um papel para ver o app com os olhos dele.
        </Text>
      </View>

      <ListGroup>
        {roles.map(({ role, icon, description }) => (
          <ListItem
            key={role}
            icon={icon}
            title={roleLabels[role]}
            subtitle={description}
            accessibilityLabel={`Entrar como ${roleLabels[role]}`}
            onPress={() => handleSignIn(role)}
          />
        ))}
      </ListGroup>

      <View className="gap-1">
        <Button title="Criar conta" variant="ghost" onPress={() => router.push('/register')} />
        <Button
          title="Esqueci minha senha"
          variant="ghost"
          onPress={() => router.push('/forgot-password')}
        />
      </View>
    </ScrollView>
  );
}
