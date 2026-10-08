import { router } from 'expo-router';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { QrCode } from 'lucide-react-native';
import { Fragment } from 'react';
import { Pressable, Text, View } from 'react-native';

import { cn } from '@/lib/cn';
import { useSession } from '@/lib/session';
import { rolesWithScanButton, type TabName, tabs } from '@/lib/tabs';
import { useThemeColors } from '@/theme/useThemeColors';

/**
 * Barra de abas: superfície neutra com borda fina, ícone e rótulo; só a aba ativa leva a cor
 * da marca. Para técnico e admin, o botão de QR Code fica no meio, entre as abas.
 *
 * O navegador de abas entrega aqui o estado (quais abas existem e qual está ativa) e a função
 * de navegar; este componente só decide como desenhar.
 */
export function TabBar({ state, navigation, insets }: BottomTabBarProps) {
  const colors = useThemeColors();
  const { profile } = useSession();
  const showScanButton = profile ? rolesWithScanButton.includes(profile.role) : false;
  // Com o botão central, metade das abas fica de cada lado dele.
  const middle = Math.ceil(state.routes.length / 2);

  return (
    <View
      accessibilityRole="tablist"
      className="flex-row border-t border-border bg-surface px-2"
      // Sobe a barra acima da faixa de gestos do sistema (ou do "queixo" do iPhone).
      style={{ paddingBottom: insets.bottom }}
    >
      {state.routes.map((route, index) => {
        const tab = tabs[route.name as TabName];
        if (!tab) return null;
        const focused = state.index === index;
        const Icon = tab.icon;

        const onPress = () => {
          // Avisa quem estiver ouvindo (ex.: uma lista que rola para o topo ao tocar na aba ativa)
          // e só navega se ninguém cancelou.
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
        };

        return (
          // Fragment agrupa o botão de QR e a aba sem criar um elemento a mais na barra: assim
          // cada aba ocupa uma fatia igual (flex-1) e o botão tem a sua, de largura fixa.
          <Fragment key={route.key}>
            {showScanButton && index === middle ? (
              <View className="w-20 items-center">
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Escanear QR Code"
                  onPress={() => router.push('/scan')}
                  // -mt-5 ergue o botão para fora da barra, como no protótipo.
                  className="-mt-5 h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-md active:opacity-80"
                >
                  <QrCode size={24} color={colors['primary-foreground']} />
                </Pressable>
              </View>
            ) : null}
            <Pressable
              accessibilityRole="tab"
              aria-selected={focused}
              accessibilityLabel={tab.label}
              onPress={onPress}
              className="min-h-14 flex-1 items-center justify-center gap-1 py-1.5 active:opacity-70"
            >
              <Icon
                size={22}
                color={focused ? colors.brand : colors['muted-foreground']}
                strokeWidth={focused ? 2.25 : 1.75}
              />
              {/* Text do React Native: a cor depende de a aba estar ativa, não de um `tone`. */}
              <Text
                className={cn(
                  'font-sans-medium text-[11px]',
                  focused ? 'text-brand' : 'text-muted-foreground',
                )}
              >
                {tab.label}
              </Text>
            </Pressable>
          </Fragment>
        );
      })}
    </View>
  );
}
