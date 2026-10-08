import type { ReactNode } from 'react';
import { Platform, View } from 'react-native';

/**
 * Na web, mostra o app dentro de uma "moldura" com o tamanho de um celular (430 x 932 px),
 * centralizada na janela. Sem isso, num monitor largo as telas se esticam de ponta a ponta e
 * deixam de representar o que o usuário vê no aparelho.
 *
 * Quando a janela é menor que a moldura (navegador de celular, ou o modo de dispositivo das
 * ferramentas de desenvolvedor), o app ocupa a tela inteira, sem borda.
 *
 * No Android e no iOS este componente não faz nada: devolve as telas como estão.
 */
export function WebFrame({ children }: { children: ReactNode }) {
  if (Platform.OS !== 'web') return <>{children}</>;

  return (
    <View className="flex-1 items-center justify-center bg-surface-muted">
      {/* `sm:` só vale em janelas com 640 px ou mais: é quando sobra espaço para a moldura. */}
      <View className="w-full flex-1 overflow-hidden bg-background sm:my-4 sm:max-h-[932px] sm:max-w-[430px] sm:rounded-2xl sm:border sm:border-border">
        {children}
      </View>
    </View>
  );
}
