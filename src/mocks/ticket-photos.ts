import type { PhotoSource, TicketPhoto } from '@/types/ticket';

import { daysAgo, hoursAgo } from './dates';

/**
 * Linhas da tabela `ticket_photos`. O 1045 fica sem foto, para exercitar o card sem imagem.
 * A foto "depois" do 1024 é um recorte de asfalto intacto da própria foto do buraco.
 */
export const mockTicketPhotos: TicketPhoto[] = [
  {
    id: 1,
    ticket_id: 1042,
    storage_path: '1042/faucet-leak.jpg',
    kind: 'before',
    uploaded_by: null,
    created_at: hoursAgo(2),
  },
  {
    id: 2,
    ticket_id: 1038,
    storage_path: '1038/air-conditioner-cover.jpg',
    kind: 'before',
    uploaded_by: null,
    created_at: hoursAgo(5),
  },
  {
    id: 3,
    ticket_id: 1031,
    storage_path: '1031/burst-pipe.jpg',
    kind: 'before',
    uploaded_by: null,
    created_at: daysAgo(1),
  },
  {
    id: 4,
    ticket_id: 1024,
    storage_path: '1024/pothole.jpg',
    kind: 'before',
    uploaded_by: null,
    created_at: daysAgo(6),
  },
  {
    id: 5,
    ticket_id: 1017,
    storage_path: '1017/restroom-doors.jpg',
    kind: 'before',
    uploaded_by: null,
    created_at: daysAgo(9),
  },
  {
    id: 6,
    ticket_id: 1009,
    storage_path: '1009/broken-shelf.jpg',
    kind: 'before',
    uploaded_by: null,
    created_at: daysAgo(14),
  },
  {
    id: 7,
    ticket_id: 1044,
    storage_path: '1044/asphalt-damage.jpg',
    kind: 'before',
    uploaded_by: null,
    created_at: hoursAgo(1),
  },
  {
    id: 8,
    ticket_id: 1040,
    storage_path: '1040/rusty-pipe-leak.jpg',
    kind: 'before',
    uploaded_by: null,
    created_at: hoursAgo(3),
  },
  // Segunda foto do 1042 (para o carrossel) e a foto "depois" do 1024, que está concluído.
  {
    id: 9,
    ticket_id: 1042,
    storage_path: '1042/rusty-pipe-leak.jpg',
    kind: 'before',
    uploaded_by: null,
    created_at: hoursAgo(2),
  },
  {
    id: 10,
    ticket_id: 1024,
    storage_path: '1024/pothole-fixed.jpg',
    kind: 'after',
    uploaded_by: null,
    created_at: daysAgo(3),
  },
];

/**
 * Faz o papel do Storage enquanto não há backend: liga cada `storage_path` ao arquivo embutido
 * no app. O `require` de uma imagem devolve um número que o componente `Image` entende.
 * Na Etapa 7 isto dá lugar às URLs assinadas do bucket `ticket-photos`.
 */
export const mockPhotoFiles: Record<string, PhotoSource> = {
  '1042/faucet-leak.jpg': require('../../assets/mocks/tickets/faucet-leak.jpg'),
  '1038/air-conditioner-cover.jpg': require('../../assets/mocks/tickets/air-conditioner-cover.jpg'),
  '1031/burst-pipe.jpg': require('../../assets/mocks/tickets/burst-pipe.jpg'),
  '1024/pothole.jpg': require('../../assets/mocks/tickets/pothole.jpg'),
  '1017/restroom-doors.jpg': require('../../assets/mocks/tickets/restroom-doors.jpg'),
  '1009/broken-shelf.jpg': require('../../assets/mocks/tickets/broken-shelf.jpg'),
  '1044/asphalt-damage.jpg': require('../../assets/mocks/tickets/asphalt-damage.jpg'),
  '1040/rusty-pipe-leak.jpg': require('../../assets/mocks/tickets/rusty-pipe-leak.jpg'),
  '1042/rusty-pipe-leak.jpg': require('../../assets/mocks/tickets/rusty-pipe-leak.jpg'),
  '1024/pothole-fixed.jpg': require('../../assets/mocks/tickets/pothole-fixed.jpg'),
};
