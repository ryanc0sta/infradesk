import { Stack } from 'expo-router';
import { Moon, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import { Showcase } from '@/components/showcase/Showcase';
import { IconButton } from '@/components/ui';

// Rota de desenvolvimento: infradesk://showcase
export default function ShowcaseScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Vitrine',
          headerRight: () => (
            <IconButton
              icon={isDark ? Sun : Moon}
              accessibilityLabel={isDark ? 'Usar tema claro' : 'Usar tema escuro'}
              onPress={toggleColorScheme}
            />
          ),
        }}
      />
      <Showcase />
    </>
  );
}
