# InfraDesk

Aplicativo mobile de **registro e acompanhamento de problemas de infraestrutura**. Usuários fotografam
problemas em ambientes físicos (um encanamento quebrado, uma lâmpada queimada, um ar-condicionado com
defeito), descrevem e enviam um chamado. A equipe técnica recebe, assume, atualiza o andamento e
registra a solução com uma foto de "depois".

> **Status:** em desenvolvimento — Etapa 0 (fundação) concluída; próxima: Etapa 1 (design system).

---

## Funcionalidades

### Usuário

- Cadastro e login
- Abrir chamados com até 3 fotos, título, descrição, categoria, local e prioridade
- Identificar o local por QR Code da sala, busca ou localização
- Aviso de chamados parecidos já abertos ("Eu também tenho esse problema")
- Acompanhar o andamento por uma linha do tempo de status
- Comentar e avaliar o atendimento após a conclusão

### Técnico

- Fila de chamados com abas "Novos", "Meus" e "Atrasados"
- Prazos (SLA) por prioridade com contagem regressiva
- Assumir chamados e atualizar o status
- Concluir com foto de "depois" e descrição do reparo; rejeitar com justificativa

### Administrador

- Painel com métricas (abertos, atrasados, tempo médio de resolução, avaliação)
- Ocorrências por categoria e por local
- Gerenciamento de usuários e papéis

> A lista acima representa o escopo planejado. Veja o [roteiro](#roteiro) para o que já foi entregue.

---

## Stack

| Frente             | Tecnologia                                                      |
| ------------------ | --------------------------------------------------------------- |
| App                | [Expo](https://expo.dev) + React Native                         |
| Navegação          | React Navigation (Native Stack + Bottom Tabs)                   |
| Estilização        | NativeWind (Tailwind CSS para React Native)                     |
| Animações          | React Native Reanimated                                         |
| Ícones             | Lucide React Native                                             |
| Backend            | [Supabase](https://supabase.com) (Auth, Postgres, Storage, RLS) |
| Build e publicação | EAS (Expo Application Services)                                 |

---

## Pré-requisitos

- [Node.js](https://nodejs.org) (versão LTS, recomendada via [nvm](https://github.com/nvm-sh/nvm))
- [Git](https://git-scm.com)
- App **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)) ou um emulador Android (Android Studio)
- [Docker](https://www.docker.com) — necessário a partir da etapa de backend, para rodar o Supabase localmente

---

## Como rodar

```bash
# 1. Clonar o repositório
git clone https://github.com/SEU_USUARIO/infradesk.git
cd infradesk

# 2. Instalar as dependências
npm install

# 3. Configurar as variáveis de ambiente (quando o backend estiver integrado)
cp .env.example .env
# preencha os valores no .env

# 4. Iniciar o app
npx expo start
```

Outros comandos úteis:

```bash
npm run lint        # ESLint + Prettier
npm run typecheck   # checagem de tipos do TypeScript
npm run format      # formata o código com o Prettier
```

Com o servidor rodando, escaneie o QR Code com o **Expo Go** (Android) ou com a câmera (iOS), ou
pressione `a` no terminal para abrir no emulador Android.

> O celular e o computador precisam estar na mesma rede Wi-Fi.

---

## Estrutura do projeto

```
├── app.json              # configuração do Expo (nome, ícone, scheme infradesk://)
├── assets/               # ícone, splash e imagens
├── docs/                 # design, modelo de dados, decisões e roteiro
└── src/
    └── app/              # rotas do Expo Router (cada arquivo é uma tela)
        ├── _layout.tsx   # layout raiz (Stack)
        ├── index.tsx     # tela inicial
        └── +not-found.tsx
```

Nas próximas etapas entram `src/components/`, `src/services/`, `src/mocks/`, `src/hooks/`, `src/lib/`,
`src/theme/` e `src/types/` (detalhes no [CLAUDE.md](CLAUDE.md)).

---

## Roteiro

- [ ] **Etapa 0** — Fundação: repositório, documentação, lint e formatação
- [ ] **Etapa 1** — Design system: NativeWind, cores, tipografia, componentes base
- [ ] **Etapa 2** — Esqueleto de navegação por papel (usuário, técnico, admin)
- [ ] **Etapa 3** — Telas do usuário com dados fictícios
- [ ] **Etapa 4** — Telas do técnico e do administrador
- [ ] **Etapa 5** — Polimento: estados de carregamento, vazios, animações
- [ ] **Etapa 6** — Backend com Supabase (autenticação, banco e permissões)
- [ ] **Etapa 7** — Fotos no Storage, QR Code e localização
- [ ] **Etapa 8** — Notificações e envio offline
- [ ] **Etapa 9** — Testes e versão beta
- [ ] **Etapa 10** — Publicação nas lojas

---

## Fluxo de desenvolvimento

- A branch `main` sempre contém uma versão funcional.
- Cada mudança é feita em uma branch própria (`feat/`, `fix/`, `chore/`, `docs/`) e integrada via
  Pull Request.
- Commits seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/)
  (ex.: `feat: adiciona tela de novo chamado`).

---

## Autor

Desenvolvido por **Ryan** — Ciência da Computação, Universidade Federal da Paraíba (UFPB).

## Licença

A definir.
