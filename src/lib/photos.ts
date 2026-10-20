import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';

/** Largura máxima das fotos enviadas: suficiente para ver o problema, sem pesar no envio. */
const MAX_WIDTH = 1600;
/** Qualidade do JPEG (0 a 1). 0,7 reduz bastante o arquivo sem perda visível. */
const QUALITY = 0.7;

export type PhotoFile = { uri: string; width: number; height: number };

/**
 * Reduz e comprime uma foto (da câmera ou da galeria) antes de ela entrar no chamado.
 * Uma foto de celular tem de 3 a 8 MB; depois daqui, costuma ficar entre 200 e 500 KB.
 */
export async function compressPhoto(photo: PhotoFile): Promise<PhotoFile> {
  const context = ImageManipulator.manipulate(photo.uri);
  // Só reduz quando a foto é maior; informar só a largura mantém a proporção.
  if (photo.width > MAX_WIDTH) context.resize({ width: MAX_WIDTH });
  const image = await context.renderAsync();
  const result = await image.saveAsync({ compress: QUALITY, format: SaveFormat.JPEG });
  return { uri: result.uri, width: result.width, height: result.height };
}
