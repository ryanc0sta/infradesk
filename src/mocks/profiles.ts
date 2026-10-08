import type { Profile } from '@/types/user';

/** Um perfil fictício por papel, no formato da tabela `profiles` (docs/data-model.md). */
export const mockProfiles: Profile[] = [
  {
    id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    full_name: 'Ricardo Oliveira',
    avatar_url: null,
    role: 'user',
    created_at: '2026-08-03T13:20:00Z',
  },
  {
    id: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
    full_name: 'Carlos Eduardo Souza',
    avatar_url: null,
    role: 'technician',
    created_at: '2026-07-14T11:05:00Z',
  },
  {
    id: '9b2c1d4e-5a6f-4b7c-8d9e-0f1a2b3c4d5e',
    full_name: 'Ana Beatriz Lima',
    avatar_url: null,
    role: 'admin',
    created_at: '2026-06-22T09:40:00Z',
  },
];
