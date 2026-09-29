# Roteiro de desenvolvimento (roadmap.md)

> Cada etapa só termina quando: o checkpoint funciona no celular, o código está na `main` via PR,
> a tag `etapa-N-nome` foi criada e o README e o `CLAUDE.md` foram atualizados.

## Etapa 0 — Fundação

- [x] Migrar o template em branco para Expo Router (`src/app/`) e TypeScript
- [x] `docs/design.md`, `docs/data-model.md`, `docs/decisions.md`, `docs/roadmap.md`
- [x] `CLAUDE.md` na raiz
- [x] ESLint, Prettier e atalho `@/` → `src/`
- [x] `.env.example` e `.gitignore` conferidos
- [ ] Quadro no GitHub Projects com as issues da Etapa 1

**Checkpoint:** `npx expo start` abre a tela inicial pelo Expo Router e o lint passa.

## Etapa 1 — Design system

- [x] NativeWind configurado (guia oficial da versão atual)
- [ ] Tokens de cor (marca, neutros, status, prioridade) no `tailwind.config.js`
- [ ] Fonte Inter
- [ ] Tema claro e escuro
- [ ] `ui/`: Text, Button, Input, Card, Chip, Avatar, Skeleton, EmptyState, FAB
- [ ] `tickets/`: StatusBadge, PriorityBadge
- [ ] Tela-vitrine com todos os componentes

**Checkpoint:** vitrine correta no celular, nos dois temas.

## Etapa 2 — Navegação

- [ ] Grupos `(auth)` e `(app)` com redirecionamento por sessão
- [ ] Sessão falsa (contexto com usuário e papel)
- [ ] Abas por papel no `(tabs)/_layout.tsx`
- [ ] Rotas `tickets/new` (modal) e `tickets/[id]`
- [ ] Telas-placeholder para todas as rotas
- [ ] Menu de desenvolvimento para trocar de papel

**Checkpoint:** "logar", ver as abas do papel, abrir um detalhe e voltar; testar um deep link.

## Etapa 3 — Telas do usuário (mocks)

- [ ] `src/mocks/` no formato do `data-model.md`
- [ ] `src/services/api.ts` com atraso simulado
- [ ] TanStack Query e hooks (`useTickets`, `useTicket`, `useCreateTicket`)
- [ ] Onboarding, Login, Cadastro, Recuperar senha (React Hook Form + Zod)
- [ ] Início, Detalhe, Buscar, Notificações, Perfil
- [ ] Wizard de Novo chamado com câmera real e compressão
- [ ] Aviso de chamado parecido e tela de sucesso

**Checkpoint:** criar um chamado com foto do celular e vê-lo na lista e no detalhe.

## Etapa 4 — Técnico e admin (mocks)

- [ ] Função `getSla()` e `SlaBadge`
- [ ] Fila com abas Novos / Meus / Atrasados
- [ ] Ações por deslizar e bottom sheet de status com as regras
- [ ] Antes/depois e avaliação
- [ ] Locais, Painel e Equipe

**Checkpoint:** técnico conclui com foto "depois"; usuário vê a linha do tempo e avalia.

## Etapa 5 — Polimento

- [ ] Quatro estados (carregando, vazio, erro, sucesso) em todas as telas de dados
- [ ] Toasts, banner offline, puxar para atualizar
- [ ] Animações com Reanimated
- [ ] Teclado, acessibilidade, tema escuro, telas pequenas

**Checkpoint:** checklist de estados conferida tela a tela.

## Etapa 6 — Supabase

- [ ] `supabase init` / `start`
- [ ] Migrations: enums, tabelas, triggers, `is_staff()`, RLS
- [ ] `seed.sql` igual aos mocks; tipos gerados
- [ ] Cliente em `src/lib/supabase.ts`; Auth real
- [ ] `api.ts` reescrito com Supabase

**Checkpoint:** usuário comum tenta alterar status e o banco recusa.

## Etapa 7 — Fotos e recursos nativos

- [ ] Bucket privado e políticas; upload e URLs assinadas
- [ ] QR Code por local; leitura com `expo-camera`
- [ ] Localização com `expo-location`; permissões no `app.json`

**Checkpoint:** escanear o QR de uma sala, criar chamado com foto e vê-lo no celular do técnico.

## Etapa 8 — Notificações e offline

- [ ] Push token salvo; webhook → Edge Function ou N8N → push
- [ ] Notificações com dados reais
- [ ] Fila de envio offline

**Checkpoint:** mudança de status notifica o autor.

## Etapa 9 — Qualidade e beta

- [ ] Jest, Testing Library, Maestro
- [ ] Sentry e GitHub Actions
- [ ] Supabase de staging; `eas.json`; APK de teste
- [ ] Rodada de feedback com usuários

**Checkpoint:** grupo de teste usando por alguns dias sem erros graves.

## Etapa 10 — Publicação

- [ ] Privacidade, termos (LGPD) e exclusão de conta
- [ ] Assets das lojas; Supabase de produção
- [ ] `eas build` e `eas submit`; tag `v1.0.0`; EAS Update

**Checkpoint:** app disponível nas lojas.
