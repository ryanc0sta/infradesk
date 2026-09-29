# Modelo de dados (data-model.md)

> Referência para os mocks (Etapas 3–4) e para as migrations do Supabase (Etapa 6).
> Os dados fictícios em `src/mocks/` devem seguir exatamente estes nomes e formatos.

## 1. Enums

| Enum              | Valores                                                             |
| ----------------- | ------------------------------------------------------------------- |
| `user_role`       | `user`, `technician`, `admin`                                       |
| `ticket_status`   | `open`, `in_review`, `in_progress`, `done`, `rejected`, `cancelled` |
| `ticket_priority` | `low`, `medium`, `high`, `critical`                                 |
| `photo_kind`      | `before`, `after`                                                   |

Rótulos na interface: Aberto, Em análise, Em andamento, Concluído, Rejeitado, Cancelado;
Baixa, Média, Alta, Crítica.

## 2. Tabelas

### `profiles` (1:1 com `auth.users`)

| Coluna       | Tipo                  | Observação                                       |
| ------------ | --------------------- | ------------------------------------------------ |
| `id`         | uuid, PK              | referencia `auth.users(id)`, `on delete cascade` |
| `full_name`  | text, not null        |                                                  |
| `avatar_url` | text                  | opcional                                         |
| `role`       | `user_role`, not null | default `user`                                   |
| `created_at` | timestamptz           | default `now()`                                  |

### `locations`

| Coluna                  | Tipo                 | Observação               |
| ----------------------- | -------------------- | ------------------------ |
| `id`                    | bigint, PK, identity | usado no QR Code da sala |
| `name`                  | text, not null       | ex.: "Sala 101"          |
| `building`              | text                 | ex.: "Bloco A"           |
| `latitude`, `longitude` | double precision     | opcionais                |

### `categories`

| Coluna | Tipo                   | Observação                                                                         |
| ------ | ---------------------- | ---------------------------------------------------------------------------------- |
| `id`   | bigint, PK, identity   |                                                                                    |
| `name` | text, unique, not null | Hidráulica, Elétrica, Estrutura, Limpeza, TI/Rede, Climatização, Segurança, Outros |
| `icon` | text                   | nome do ícone Lucide                                                               |

### `tickets`

| Coluna                  | Tipo                        | Observação                             |
| ----------------------- | --------------------------- | -------------------------------------- |
| `id`                    | bigint, PK, identity        | também é o número de protocolo (#1042) |
| `author_id`             | uuid, not null              | FK `profiles`                          |
| `assignee_id`           | uuid                        | FK `profiles`; técnico responsável     |
| `location_id`           | bigint                      | FK `locations`                         |
| `category_id`           | bigint, not null            | FK `categories`                        |
| `title`                 | text, not null              | 5 a 80 caracteres                      |
| `description`           | text                        | até 1000 caracteres                    |
| `priority`              | `ticket_priority`, not null | default `medium`                       |
| `status`                | `ticket_status`, not null   | default `open`                         |
| `latitude`, `longitude` | double precision            | quando o usuário usa a localização     |
| `due_at`                | timestamptz                 | prazo calculado pela prioridade (SLA)  |
| `resolution_note`       | text                        | obrigatório ao concluir                |
| `created_at`            | timestamptz                 | default `now()`                        |
| `updated_at`            | timestamptz                 | atualizado por trigger                 |
| `resolved_at`           | timestamptz                 | preenchido ao concluir                 |

### `ticket_photos`

| Coluna         | Tipo                   | Observação                                         |
| -------------- | ---------------------- | -------------------------------------------------- |
| `id`           | bigint, PK, identity   |                                                    |
| `ticket_id`    | bigint, not null       | FK `tickets`, `on delete cascade`                  |
| `storage_path` | text, not null         | `{ticket_id}/{uuid}.jpg` no bucket `ticket-photos` |
| `kind`         | `photo_kind`, not null | default `before`                                   |
| `uploaded_by`  | uuid                   | FK `profiles`                                      |
| `created_at`   | timestamptz            |                                                    |

### `ticket_events` (linha do tempo e auditoria)

| Coluna        | Tipo                 | Observação                        |
| ------------- | -------------------- | --------------------------------- |
| `id`          | bigint, PK, identity |                                   |
| `ticket_id`   | bigint, not null     | FK `tickets`, `on delete cascade` |
| `actor_id`    | uuid                 | FK `profiles`                     |
| `from_status` | `ticket_status`      | nulo na criação                   |
| `to_status`   | `ticket_status`      | nulo em comentários               |
| `comment`     | text                 | comentário ou justificativa       |
| `created_at`  | timestamptz          |                                   |

### `ticket_supports` ("Eu também tenho esse problema")

| Coluna       | Tipo        | Observação                              |
| ------------ | ----------- | --------------------------------------- |
| `ticket_id`  | bigint      | FK `tickets`; PK composta com `user_id` |
| `user_id`    | uuid        | FK `profiles`                           |
| `created_at` | timestamptz |                                         |

### `ticket_ratings`

| Coluna       | Tipo               | Observação                               |
| ------------ | ------------------ | ---------------------------------------- |
| `ticket_id`  | bigint, PK         | FK `tickets` (uma avaliação por chamado) |
| `rating`     | smallint, not null | 1 a 5                                    |
| `comment`    | text               | opcional                                 |
| `created_at` | timestamptz        |                                          |

### `push_tokens` (Etapa 8)

| Coluna       | Tipo           | Observação         |
| ------------ | -------------- | ------------------ |
| `token`      | text, PK       | token do Expo Push |
| `user_id`    | uuid, not null | FK `profiles`      |
| `created_at` | timestamptz    |                    |

## 3. Prazos (SLA)

`due_at = created_at + prazo da prioridade`

| Prioridade | Prazo    |
| ---------- | -------- |
| `critical` | 24 horas |
| `high`     | 3 dias   |
| `medium`   | 7 dias   |
| `low`      | 15 dias  |

Um chamado está **atrasado** quando `now() > due_at` e o status não é `done`, `rejected` nem
`cancelled`.

## 4. Regras de negócio

1. Ao se cadastrar, um trigger cria o `profile` com `role = 'user'`.
2. **Ninguém altera o próprio `role`.** Apenas `admin` altera papéis de outros usuários.
3. Toda mudança de `status` gera um registro em `ticket_events` (trigger no banco).
4. Transições permitidas:

| De            | Para                                   | Quem   |
| ------------- | -------------------------------------- | ------ |
| `open`        | `in_review`, `in_progress`, `rejected` | equipe |
| `open`        | `cancelled`                            | autor  |
| `in_review`   | `in_progress`, `rejected`              | equipe |
| `in_progress` | `done`, `rejected`                     | equipe |

5. `done` exige ao menos uma foto `after` e `resolution_note`; preenche `resolved_at`.
6. `rejected` exige comentário (justificativa) no evento.
7. Avaliação só pelo autor e só quando o status for `done`.
8. Um usuário apoia ("eu também") um chamado no máximo uma vez e não pode apoiar o próprio.

## 5. Permissões (resumo para RLS)

Função auxiliar `is_staff()` (`security definer`, `search_path` fixo): verdadeiro para `technician`
e `admin`.

| Tabela                    | `user`                                        | `technician`                                | `admin`                 |
| ------------------------- | --------------------------------------------- | ------------------------------------------- | ----------------------- |
| `profiles`                | lê o próprio; edita o próprio (exceto `role`) | lê todos                                    | lê todos; altera `role` |
| `tickets`                 | lê e cria os próprios; cancela o próprio      | lê todos; cria; altera status e responsável | igual ao técnico        |
| `ticket_photos`           | lê e envia fotos dos próprios chamados        | lê todas; envia `after`                     | igual ao técnico        |
| `ticket_events`           | lê os dos próprios chamados; comenta          | lê e cria em todos                          | igual ao técnico        |
| `ticket_supports`         | cria/remove o próprio apoio; lê contagens     | lê                                          | lê                      |
| `ticket_ratings`          | cria nos próprios chamados concluídos         | lê                                          | lê                      |
| `locations`, `categories` | lê                                            | lê                                          | lê e gerencia           |

Storage: bucket **privado** `ticket-photos`, com políticas espelhando as de `ticket_photos`.
Fotos exibidas por URLs assinadas.
