import { CameraView, type CameraType, type FlashMode, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowRight,
  Camera,
  CameraOff,
  Images,
  type LucideIcon,
  Settings,
  SwitchCamera,
  X,
  Zap,
  ZapOff,
} from 'lucide-react-native';
import { type ReactNode, useRef, useState } from 'react';
import { ActivityIndicator, Linking, Platform, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, IconButton, Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { compressPhoto } from '@/lib/photos';
import {
  addDraftPhotos,
  clearDraft,
  MAX_PHOTOS,
  removeDraftPhoto,
  useTicketDraft,
} from '@/lib/ticket-draft';
import { useThemeColors } from '@/theme/useThemeColors';

import { PhotoTray } from './PhotoTray';

/** Botão redondo com rótulo, ao lado do disparador (Galeria, Girar). */
function SideButton({
  icon: Icon,
  label,
  onPress,
  disabled,
}: {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const colors = useThemeColors();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      aria-disabled={!!disabled}
      disabled={disabled}
      onPress={onPress}
      className={cn('w-20 items-center gap-1.5 active:opacity-70', disabled && 'opacity-40')}
    >
      <View className="h-12 w-12 items-center justify-center rounded-full bg-overlay-foreground/15">
        <Icon size={22} color={colors['overlay-foreground']} />
      </View>
      <Text variant="caption" tone="inverse">
        {label}
      </Text>
    </Pressable>
  );
}

/** Mensagem no lugar da câmera (sem permissão ou sem câmera), com as saídas possíveis. */
function CameraNotice({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  const colors = useThemeColors();
  return (
    <View className="flex-1 items-center justify-center gap-3 px-8">
      <View className="h-12 w-12 items-center justify-center rounded-xl bg-overlay-foreground/15">
        <Icon size={22} color={colors['overlay-foreground']} />
      </View>
      <Text variant="subtitle" tone="inverse" className="text-center">
        {title}
      </Text>
      <Text variant="label" tone="inverse" className="text-center opacity-70">
        {description}
      </Text>
      {children ? <View className="mt-2 w-full gap-2">{children}</View> : null}
    </View>
  );
}

/**
 * Primeiro passo do novo chamado: fotografar o problema (até 3 fotos), pela câmera ou pela
 * galeria. As fotos são comprimidas e guardadas no rascunho do chamado.
 */
export function CameraStep() {
  const colors = useThemeColors();
  const [permission, requestPermission] = useCameraPermissions();
  // `ref` dá acesso direto ao componente da câmera, para chamar `takePictureAsync`.
  const cameraRef = useRef<CameraView>(null);
  const [ready, setReady] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [busy, setBusy] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmingDiscard, setConfirmingDiscard] = useState(false);
  // Se a pessoa já tocou em "Permitir câmera" e mesmo assim não deu certo, a mensagem muda: na
  // web, um computador sem câmera ou um pedido recusado continuam dizendo "pode pedir de novo".
  const [askedPermission, setAskedPermission] = useState(false);
  const { photos } = useTicketDraft();

  const remaining = MAX_PHOTOS - photos.length;
  const full = remaining <= 0;
  const cameraOn = !!permission?.granted && !unavailable;

  async function takePhoto() {
    if (!cameraRef.current || !ready || busy || full) return;
    setBusy(true);
    setError(null);
    try {
      const picture = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      if (picture) addDraftPhotos([await compressPhoto(picture)]);
    } catch {
      setError('Não foi possível tirar a foto. Tente de novo.');
    } finally {
      setBusy(false);
    }
  }

  async function pickFromGallery() {
    if (busy || full) return;
    setError(null);
    // A galeria não pede permissão; na web, só abre a partir de um toque (como este).
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: remaining,
      quality: 1,
    });
    if (result.canceled) return;
    setBusy(true);
    try {
      const compressed = await Promise.all(result.assets.slice(0, remaining).map(compressPhoto));
      addDraftPhotos(compressed);
    } catch {
      setError('Não foi possível usar essa imagem. Tente outra.');
    } finally {
      setBusy(false);
    }
  }

  async function askPermission() {
    await requestPermission();
    setAskedPermission(true);
  }

  function close() {
    if (photos.length > 0) {
      setConfirmingDiscard(true);
      return;
    }
    router.back();
  }

  function discardAndClose() {
    clearDraft();
    router.back();
  }

  let body;
  if (!permission) {
    // A resposta da permissão ainda está chegando.
    body = (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={colors['overlay-foreground']} />
      </View>
    );
  } else if (!permission.granted && askedPermission) {
    body = (
      <CameraNotice
        icon={CameraOff}
        title="Não foi possível acessar a câmera"
        description={
          Platform.OS === 'web'
            ? 'Confira se há uma câmera conectada e se o navegador permite o acesso (ícone ao lado do endereço). Você também pode escolher fotos da galeria.'
            : 'O acesso à câmera foi negado. Libere nas configurações do aparelho ou escolha fotos da galeria.'
        }
      >
        {permission.canAskAgain ? (
          <Button title="Tentar de novo" onPress={askPermission} />
        ) : Platform.OS !== 'web' ? (
          <Button
            title="Abrir configurações"
            icon={Settings}
            onPress={() => Linking.openSettings()}
          />
        ) : null}
        <Button title="Escolher da galeria" variant="overlay" onPress={pickFromGallery} />
      </CameraNotice>
    );
  } else if (!permission.granted) {
    body = (
      <CameraNotice
        icon={Camera}
        title="Permita o uso da câmera"
        description="Assim você fotografa o problema na hora. Se preferir, escolha fotos da galeria."
      >
        {permission.canAskAgain ? (
          <Button title="Permitir câmera" onPress={askPermission} />
        ) : Platform.OS === 'web' ? (
          <Text variant="caption" tone="inverse" className="text-center opacity-70">
            A câmera foi bloqueada no navegador. Libere-a no ícone ao lado do endereço.
          </Text>
        ) : (
          <Button
            title="Abrir configurações"
            icon={Settings}
            onPress={() => Linking.openSettings()}
          />
        )}
        <Button title="Escolher da galeria" variant="overlay" onPress={pickFromGallery} />
      </CameraNotice>
    );
  } else if (unavailable) {
    body = (
      <CameraNotice
        icon={CameraOff}
        title="Câmera indisponível"
        description="Não encontramos uma câmera neste aparelho. Você pode escolher fotos da galeria."
      >
        <Button title="Escolher da galeria" variant="overlay" onPress={pickFromGallery} />
      </CameraNotice>
    );
  } else {
    body = (
      <View className="flex-1 overflow-hidden">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={facing}
          flash={flash}
          onCameraReady={() => setReady(true)}
          onMountError={() => setUnavailable(true)}
        />
        {/* Moldura-guia no centro: só desenho, não recebe toques. */}
        <View pointerEvents="none" className="absolute inset-0 items-center justify-center">
          <View className="aspect-square w-2/3 rounded-xl border border-overlay-foreground/50" />
        </View>
        <View pointerEvents="none" className="absolute bottom-3 left-0 right-0 items-center">
          <View className="rounded-md bg-overlay/60 px-3 py-1">
            <Text variant="caption" tone="inverse">
              Fotografe o problema de perto e com boa luz
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-overlay">
      {/* Fundo sempre escuro: a barra de status fica clara nos dois temas. */}
      <StatusBar style="light" />

      <View className="flex-row items-center justify-between px-3 py-2">
        <IconButton icon={X} variant="overlay" accessibilityLabel="Fechar" onPress={close} />
        <Text variant="strong" tone="inverse">
          Novo chamado
        </Text>
        {/* O flash só existe no celular; na web, um espaço vazio mantém o título centralizado. */}
        {cameraOn && Platform.OS !== 'web' ? (
          <IconButton
            icon={flash === 'on' ? Zap : ZapOff}
            variant="overlay"
            accessibilityLabel={flash === 'on' ? 'Desligar flash' : 'Ligar flash'}
            onPress={() => setFlash((current) => (current === 'on' ? 'off' : 'on'))}
          />
        ) : (
          <View className="h-10 w-10" />
        )}
      </View>

      {body}

      <View className="gap-4 px-4 pb-2 pt-4">
        <PhotoTray photos={photos} onRemove={removeDraftPhoto} />

        {error ? (
          <Text variant="caption" tone="error" accessibilityRole="alert">
            {error}
          </Text>
        ) : null}

        {confirmingDiscard ? (
          <View className="gap-3 rounded-xl bg-overlay-foreground/10 p-3">
            <Text variant="strong" tone="inverse">
              Descartar {photos.length === 1 ? 'a foto' : `as ${photos.length} fotos`}?
            </Text>
            <View className="flex-row gap-2">
              <Button
                title="Continuar"
                variant="overlay"
                onPress={() => setConfirmingDiscard(false)}
                className="flex-1"
              />
              <Button
                title="Descartar"
                variant="destructive"
                onPress={discardAndClose}
                className="flex-1"
              />
            </View>
          </View>
        ) : (
          <>
            <View className="flex-row items-center justify-between px-2">
              <SideButton
                icon={Images}
                label="Galeria"
                onPress={pickFromGallery}
                disabled={full || busy}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={full ? `Limite de ${MAX_PHOTOS} fotos atingido` : 'Tirar foto'}
                aria-disabled={!cameraOn || !ready || full || busy}
                disabled={!cameraOn || !ready || full || busy}
                onPress={takePhoto}
                className={cn(
                  'h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-overlay-foreground active:opacity-80',
                  (!cameraOn || !ready || full) && 'opacity-40',
                )}
              >
                {busy ? (
                  <ActivityIndicator color={colors['overlay-foreground']} />
                ) : (
                  <View className="h-14 w-14 rounded-full bg-overlay-foreground" />
                )}
              </Pressable>
              <SideButton
                icon={SwitchCamera}
                label="Girar"
                onPress={() => setFacing((current) => (current === 'back' ? 'front' : 'back'))}
                disabled={!cameraOn}
              />
            </View>

            {photos.length > 0 ? (
              <Button
                title="Continuar"
                icon={ArrowRight}
                onPress={() => router.push('/tickets/new/details')}
              />
            ) : null}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
