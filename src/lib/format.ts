import type { Location } from '@/types/ticket';

/** Tempo decorrido em formato curto: "agora", "há 5 min", "há 2h", "há 3d" ou a data. */
export function formatRelativeTime(iso: string, now: number = Date.now()): string {
  const minutes = Math.floor((now - new Date(iso).getTime()) / 60_000);
  if (minutes < 1) return 'agora';
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `há ${days}d`;
  return new Date(iso).toLocaleDateString('pt-BR');
}

/** "Lab. de Informática 3, Centro de Informática". */
export function formatLocation(location: Location | null): string {
  if (!location) return 'Local não informado';
  return location.building ? `${location.name}, ${location.building}` : location.name;
}

const pad = (value: number) => String(value).padStart(2, '0');

/** "08/10/2026". */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

/** "08/10/2026 às 14:30". */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return `${formatDate(iso)} às ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
