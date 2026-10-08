import { Redirect } from 'expo-router';

import { useSession } from '@/lib/session';
import { tabsByRole } from '@/lib/tabs';

// "/" não tem tela própria: leva para a aba inicial do papel de quem entrou.
export default function AppIndex() {
  const { profile } = useSession();
  if (!profile) return null;

  return <Redirect href={`/${tabsByRole[profile.role][0]}`} />;
}
