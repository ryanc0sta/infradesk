@AGENTS.md
@docs/design.md

# CLAUDE.md — Contexto do projeto InfraDesk

> Lido automaticamente pelo Claude Code em toda sessão. O design completo está em `docs/design.md`
> (importado acima). Mantenha a seção "Estado atual" atualizada ao fim de cada tarefa relevante.

## 1. Sobre o projeto

**InfraDesk** é um aplicativo mobile de registro e acompanhamento de problemas de infraestrutura (um
help desk com foto). Usuários fotografam problemas em ambientes físicos, descrevem e enviam um
chamado; a equipe técnica assume, atualiza o status e conclui com uma foto de "depois".

Objetivo: desenvolver e rodar tudo localmente, testar com usuários reais (beta) e, depois, publicar
nas lojas.

### Papéis
| Papel | Vê | Cria chamado | Altera status |
|---|---|---|---|
| `user` | Os próprios chamados | Sim | Não (só cancela o próprio enquanto `open`) |
| `technician` | Todos | Sim | Sim |
| `admin` | Todos | Sim | Sim, e gerencia papéis |

## 2. Como colaborar comigo

- Sou o Ryan, estudante de Ciência da Computação (UFPB). Tenho experiência com Python, Supabase, N8N e
  análise de dados. **Estou aprendendo JavaScript, React e React Native** junto com este projeto.
- Responda em **português brasileiro**, de forma didática, com analogias e tabelas quando ajudarem.
- Ao introduzir um conceito ou padrão novo de React/React Native pela primeira vez, explique-o em
  poucas linhas.

### Regras
1. Antes de implementar algo grande (feature, mudança de schema, nova dependência), apresente um
   plano curto e espere minha aprovação.
2. Trabalhe em passos pequenos. Ao fim de cada passo, diga como eu testo.
3. Ao adicionar uma dependência, explique em uma linha por que ela é necessária. Instale sempre com
   `npx expo install`.
4. Não invente APIs. Se não tiver certeza da API atual do Expo, Expo Router, NativeWind ou Supabase,
   consulte a documentação oficial ou me avise.
5. Não faça commits sem eu pedir. Ao terminar, explique o que mudou em cada arquivo.
6. Não altere migrations já aplicadas; crie uma nova.
7. Ao concluir uma tarefa relevante, atualize a seção "Estado atual".

## 3. Ambiente

- Linux Mint, VSCode, Docker (para o Supabase local).
- Android: emulador do Android Studio e/ou celular físico com Expo Go.
- iOS: sem simulador no Linux; testar em aparelho físico ou via EAS.
- Em celular físico, use o IP da máquina na rede (não `localhost`) para acessar o Supabase local.

## 4. Stack

| Frente | Tecnologia |
|---|---|
| App | Expo + React Native + TypeScript |
| Navegação | **Expo Router** (rotas por arquivo em `src/app/`) |
| Estilização | NativeWind |
| Animações | React Native Reanimated |
| Gestos / bottom sheets | react-native-gesture-handler, @gorhom/bottom-sheet |
| Ícones | lucide-react-native |
| Dados remotos e cache | TanStack Query |
| Formulários | React Hook Form + Zod |
| Fotos | expo-image-picker + expo-image-manipulator |
| QR Code / localização | expo-camera / expo-location |
| Notificações | expo-notifications |
| Backend | Supabase (Auth, Postgres, Storage, RLS, Edge Functions) — local via CLI + Docker |
| Qualidade | ESLint, Prettier, Jest, React Native Testing Library, Maestro |
| Build | EAS Build / Submit / Update |

## 5. Estrutura e convenções

```
src/
├── app/            # ROTAS do Expo Router (ver mapa em docs/design.md, seção 5)
├── components/
│   ├── ui/         # componentes genéricos
│   └── tickets/    # componentes do domínio de chamados
├── services/       # acesso a dados (api.ts): mocks agora, Supabase na Etapa 6
├── mocks/          # dados fictícios no formato de docs/data-model.md
├── hooks/          # hooks de dados e utilitários
├── lib/            # clientes (Supabase, Query Client), helpers
├── theme/          # tokens de design
└── types/          # tipos (incluindo database.ts gerado pelo Supabase)
supabase/           # migrations, seed, functions (a partir da Etapa 6)
docs/               # design.md, data-model.md, decisions.md, roadmap.md
```

- **Rotas ficam apenas em `src/app/`.** Arquivos de rota devem ser "magros": montam a tela e chamam
  hooks. Lógica e componentes ficam fora de `src/app/`.
- **Telas nunca importam `src/mocks/` diretamente**; sempre via hooks → `src/services/`.
- Código, nomes de arquivos, tabelas, variáveis e funções em **inglês**. Textos da interface em
  **português**.
- Arquivos `.tsx` para componentes e rotas, `.ts` para o resto. Componentes em `PascalCase`, hooks
  começando com `use`, rotas em `kebab-case`.
- Imports com o atalho `@/` (aponta para `src/`).
- Estilos com classes do NativeWind usando os tokens do design; evite cores "soltas" no código.
- Esquema de deep link: `infradesk://`.

## 6. Dados

O modelo de dados (tabelas, enums, relações e regras de negócio) está em `docs/data-model.md`.
Regras que devem ser respeitadas em todas as etapas:
- Usuário nunca altera o próprio papel.
- Toda mudança de status gera um registro de histórico.
- Concluir exige foto "depois"; rejeitar exige justificativa.

## 7. Roteiro

Detalhes e checklists de cada etapa em `docs/roadmap.md`. Decisões de projeto e seus motivos em
`docs/decisions.md` — consulte antes de propor mudanças de stack ou arquitetura, e registre ali
qualquer nova decisão.

| Etapa | Foco |
|---|---|
| 0 | Fundação: Expo Router, TypeScript, docs, ESLint/Prettier |
| 1 | Design system: NativeWind, tokens, fontes, tema escuro, componentes base, tela-vitrine |
| 2 | Navegação: grupos `(auth)`/`(app)`, abas por papel, sessão falsa, menu de troca de papel |
| 3 | Telas do usuário com mocks (câmera real) |
| 4 | Telas do técnico e do admin com mocks |
| 5 | Polimento: estados, toasts, animações, acessibilidade |
| 6 | Supabase: migrations, RLS, Auth real, troca dos mocks |
| 7 | Storage de fotos, QR Code, localização |
| 8 | Notificações push e envio offline |
| 9 | Testes, Sentry, CI, beta com EAS |
| 10 | Publicação |

## 8. Git e segurança

- Fluxo: branch por tarefa (`feat/`, `fix/`, `chore/`, `docs/`) → PR → squash merge na `main`.
- Commits em Conventional Commits.
- Nunca leia, exiba ou edite `.env`. Variáveis novas vão para `.env.example` e eu preencho o `.env`.
- Nunca use chaves secret/service_role no app nem com prefixo `EXPO_PUBLIC_`.
- Nunca rode comandos contra projetos Supabase na nuvem sem autorização explícita.
- Nunca use `git push --force` nem reescreva histórico enviado.

## 9. Comandos

```bash
npx expo start              # iniciar o app
npx expo start --clear      # iniciar limpando o cache
npx expo install <pacote>   # instalar dependência compatível com o SDK
npx expo lint               # lint
npx tsc --noEmit            # checagem de tipos
npx prettier --write .      # formatar (atalhos: npm run lint | typecheck | format)
```

## 10. Estado atual

- **Etapa:** 0 — Fundação (em andamento)
- **Feito:** Expo Router com rotas em `src/app/` (`_layout.tsx`, `index.tsx`, `+not-found.tsx`);
  TypeScript (`strict`, atalho `@/` → `src/`); ESLint (`eslint-config-expo`) + Prettier;
  `.env.example`; scheme `infradesk`; `react-dom` fixado na versão do SDK (resolve conflito de
  dependências do Expo Router).
- **Pendências:** primeiro commit/PR da etapa; quadro no GitHub Projects com as issues da Etapa 1;
  definir licença (o `LICENSE` atual é o do template do Expo); `userInterfaceStyle` fica `light` até
  a Etapa 1.
