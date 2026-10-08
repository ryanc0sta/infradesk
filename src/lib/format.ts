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
