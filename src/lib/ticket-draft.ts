import { useSyncExternalStore } from 'react';

/** Quantas fotos um chamado pode ter (docs/design.md, seção 6). */
export const MAX_PHOTOS = 3;

export type DraftPhoto = {
  id: string;
  uri: string;
  width: number;
  height: number;
};

type Draft = { photos: DraftPhoto[] };

/**
 * Rascunho do chamado que está sendo criado, compartilhado entre os passos do fluxo (câmera →
 * formulário → revisão). Fica no módulo, como a sessão, para não se perder entre as telas.
 * Some ao recarregar o app ou ao descartar/enviar o chamado.
 */
let draft: Draft = { photos: [] };
const listeners = new Set<() => void>();

function update(next: Draft) {
  draft = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getDraft = () => draft;

let nextId = 1;

/** Acrescenta fotos ao rascunho, respeitando o limite de `MAX_PHOTOS`. */
export function addDraftPhotos(photos: Omit<DraftPhoto, 'id'>[]) {
  const room = MAX_PHOTOS - draft.photos.length;
  const added = photos.slice(0, room).map((photo) => ({ ...photo, id: String(nextId++) }));
  update({ ...draft, photos: [...draft.photos, ...added] });
}

export function removeDraftPhoto(id: string) {
  update({ ...draft, photos: draft.photos.filter((photo) => photo.id !== id) });
}

export function clearDraft() {
  update({ photos: [] });
}

/** Lê o rascunho em qualquer tela: `const { photos } = useTicketDraft()`. */
export function useTicketDraft() {
  return useSyncExternalStore(subscribe, getDraft, getDraft);
}
