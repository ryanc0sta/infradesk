import { Tabs } from 'expo-router/js-tabs';

import { TabBar } from '@/components/navigation/TabBar';
import { useSession } from '@/lib/session';
import { tabOrder, tabsByRole } from '@/lib/tabs';

export default function TabsLayout() {
  const { profile } = useSession();
  const allowed = profile ? tabsByRole[profile.role] : [];

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      {/* Tabs.Protected funciona como o porteiro do Stack: a aba só existe para quem tem o
          papel certo. Abas de outro papel nem aparecem na barra nem abrem pelo endereço. */}
      {tabOrder.map((name) => (
        <Tabs.Protected key={name} guard={allowed.includes(name)}>
          <Tabs.Screen name={name} />
        </Tabs.Protected>
      ))}
    </Tabs>
  );
}
