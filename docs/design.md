# Documento de Design e Especificações (design.md)

> Planta de design do InfraDesk. Referenciado pelo `CLAUDE.md`.
> Alterações de design devem ser registradas aqui antes de implementadas.

## 1. Visão geral do produto

**Nome:** InfraDesk (provisório)
**Descrição:** aplicativo mobile de help desk com foco visual (fotos) para registro, acompanhamento e
resolução de problemas de infraestrutura em ambientes físicos (ex.: universidades, escolas,
condomínios, empresas).
**Idioma da interface:** 100% português do Brasil.

## 2. Stack e restrições de interface

- **Framework:** React Native + Expo, em TypeScript.
- **Navegação:** Expo Router (rotas baseadas em arquivos em `src/app/`). Ver seção 5.
- **Estilização:** NativeWind (Tailwind CSS para React Native), apenas com Flexbox. Não usar CSS Grid
  nem interações dependentes de `hover`.
- **Animações:** React Native Reanimated (transições, bottom sheets, animação de conclusão).
- **Gestos e bottom sheets:** `react-native-gesture-handler` + `@gorhom/bottom-sheet`.
- **Ícones:** `lucide-react-native` (+ `react-native-svg`).
- **Toasts:** biblioteca multiplataforma (o iOS não tem toast nativo).
- **Dados na fase de interface:** fictícios, realistas e em português, **no mesmo formato das tabelas
  definidas em `docs/data-model.md`**, acessados sempre pela camada `src/services/`.

## 3. Identidade visual e design system

- **Estilo:** limpo, moderno e acolhedor; espaço em branco generoso; sombras suaves; cantos
  arredondados (16 px em cards, `rounded-2xl`).
- **Cores da marca (laranja):**
  - `orange-700`: botões primários com texto branco (garante contraste adequado para texto normal).
  - `orange-600` / `orange-500`: ícones ativos, FAB, destaques e elementos sem texto pequeno.
  - `orange-50` / `orange-100`: fundos de destaque.
- **Neutros:** tons de `zinc` (ou `stone`), escolhidos uma única vez e usados de forma consistente.
- **Tema:** claro e escuro completos, seguindo a preferência do sistema, com opção manual no Perfil.
- **Tipografia:** Inter (via `expo-font`), com fallback para a fonte do sistema.
- **Status (cores distintas do laranja da marca):**

| Status       | Fundo        | Texto        |
| ------------ | ------------ | ------------ |
| Aberto       | `blue-100`   | `blue-700`   |
| Em análise   | `violet-100` | `violet-700` |
| Em andamento | `amber-100`  | `amber-800`  |
| Concluído    | `green-100`  | `green-700`  |
| Rejeitado    | `red-100`    | `red-700`    |
| Cancelado    | `zinc-100`   | `zinc-700`   |

- **Prioridades:** sempre ícone + texto, nunca só cor.

| Prioridade | Prazo (SLA) | Destaque                         |
| ---------- | ----------- | -------------------------------- |
| Baixa      | 15 dias     | Neutro                           |
| Média      | 7 dias      | Âmbar                            |
| Alta       | 3 dias      | Laranja                          |
| Crítica    | 24 horas    | Vermelho + ícone `AlertTriangle` |

- **Acessibilidade:** alvos de toque de no mínimo 44x44 px; contraste adequado em ambos os temas;
  rótulos de acessibilidade em ícones e botões sem texto.

## 4. Componentes reutilizáveis (UI kit)

**Base (`src/components/ui/`):** `Text` (variantes), `Button` (primário, secundário, fantasma,
destrutivo; estados carregando e desabilitado), `Input` (rótulo e erro), `Card`, `Chip`, `Avatar`,
`Skeleton`, `EmptyState`, `FAB`, `BottomSheet`, `Toast`.

**Domínio (`src/components/tickets/`):**

- `TicketCard`: foto (ou placeholder), título, local, status, prioridade, tempo relativo e SLA (para
  a equipe).
- `StatusBadge` e `PriorityBadge`.
- `PhotoPicker`: câmera/galeria, até 3 fotos, com prévia e remoção.
- `StatusTimeline`: linha do tempo vertical com autor e data.
- `BeforeAfter`: comparação antes/depois com controle deslizante.
- `SlaBadge`: contagem regressiva ou atraso.

## 5. Navegação (Expo Router)

### Mapa de rotas

```
src/app/
├── _layout.tsx                 # providers (tema, dados, sessão) + Stack raiz
├── +not-found.tsx              # rota inexistente
├── (auth)/                     # não logado
│   ├── _layout.tsx
│   ├── onboarding.tsx
│   ├── login.tsx
│   ├── register.tsx
│   └── forgot-password.tsx
└── (app)/                      # logado (redireciona para /login sem sessão)
    ├── _layout.tsx
    ├── (tabs)/
    │   ├── _layout.tsx         # abas visíveis conforme o papel
    │   ├── index.tsx           # redireciona para a aba inicial do papel
    │   ├── home.tsx            # Usuário: Início
    │   ├── search.tsx          # Usuário: Buscar
    │   ├── queue.tsx           # Técnico/Admin: Fila
    │   ├── locations.tsx       # Técnico: Locais
    │   ├── dashboard.tsx       # Admin: Painel
    │   ├── team.tsx            # Admin: Equipe
    │   ├── notifications.tsx   # Todos
    │   └── profile.tsx         # Todos
    └── tickets/
        ├── new.tsx             # Novo chamado (wizard, apresentado como modal)
        └── [id].tsx            # Detalhe do chamado
```

### Abas por papel

| Papel   | Abas                                 | Aba inicial |
| ------- | ------------------------------------ | ----------- |
| Usuário | Início, Buscar, Notificações, Perfil | Início      |
| Técnico | Fila, Locais, Notificações, Perfil   | Fila        |
| Admin   | Painel, Fila, Equipe, Perfil         | Painel      |

Abas que não pertencem ao papel são ocultadas no `_layout.tsx` das abas (opção `href: null`).

### Deep links

Esquema do app: `infradesk://`

| Link                                  | Uso                                                      |
| ------------------------------------- | -------------------------------------------------------- |
| `infradesk://tickets/1042`            | Notificação push abre o chamado                          |
| `infradesk://tickets/new?location=12` | QR Code da sala abre o formulário com o local preenchido |

## 6. Fluxos e telas

### Autenticação e onboarding

- **Onboarding:** 3 slides curtos (Fotografar → Enviar → Acompanhar), exibido só no primeiro acesso.
- **Login**, **Cadastro** (nome, e-mail, senha, aceite de termos) e **Recuperar senha**.

### Usuário

- **Início:** saudação, cards de resumo (abertos, em andamento, concluídos), chips de filtro por
  status e lista de "Meus chamados".
- **Buscar:** busca por texto, com filtros de status, categoria e local.
- **Novo chamado** (wizard com barra de progresso):
  1. _Fotos:_ até 3 (câmera ou galeria), comprimidas antes do envio.
  2. _Detalhes:_ título, descrição, categoria (Hidráulica, Elétrica, Estrutura, Limpeza, TI/Rede,
     Climatização, Segurança, Outros) e prioridade com explicação curta de cada nível.
  3. _Local:_ escanear QR Code, buscar na lista ou usar a localização.
  4. _Revisão_ e envio.
  - _Chamado parecido:_ se houver chamado aberto no mesmo local e categoria, bottom sheet "Esse
    problema já foi relatado?" com "Eu também tenho esse problema" ou "É outro problema".
  - _Sucesso:_ animação e número de protocolo (ex.: #1042).
- **Cancelar chamado:** o autor pode cancelar enquanto o status for "Aberto".
- **Chamado rejeitado:** o autor vê a justificativa na linha do tempo.

### Técnico

- **Fila:** abas "Novos", "Meus" e "Atrasados", ordenadas por prioridade e prazo, com `SlaBadge`
  ("Vence em 3 h", "Atrasado 1 dia").
- **Ações rápidas** (deslizar o card ou bottom sheet): assumir chamado e alterar status.
  - _Concluir:_ exige foto de "depois" e descrição do reparo.
  - _Rejeitar:_ exige justificativa.
- **Locais:** lista de locais com a quantidade de chamados abertos. Mapa fica para versão futura.

### Admin

- **Painel:** cards de métricas (abertos, atrasados, tempo médio de resolução, avaliação média) e
  barras horizontais por categoria e por local (feitas com `View`, sem biblioteca de gráficos).
- **Equipe:** lista de usuários e alteração de papel.

### Comum a todos

- **Detalhe do chamado:** carrossel de fotos; se concluído, `BeforeAfter`; `StatusTimeline`;
  comentários; para o usuário, botão "Eu também" com contador e avaliação de 1 a 5 estrelas após a
  conclusão.
- **Notificações:** lista agrupada por dia.
- **Perfil:** dados do usuário, preferências de notificação, tema, termos e privacidade, sair e
  excluir conta.

## 7. Estados, erros e microinterações

- **Quatro estados em toda tela de dados:** carregando (skeleton), vazio (`EmptyState`), erro (com
  "Tentar novamente") e sucesso.
- **Feedback:** toasts para confirmações e erros, com mensagens claras.
- **Offline:** banner persistente "Sem conexão – seu chamado será enviado quando a internet voltar".
- **Animações:** abertura de bottom sheets, troca de abas, tela de sucesso.
- **Listas:** puxar para atualizar.
- **Formulários:** teclado nunca cobre o campo ativo.
