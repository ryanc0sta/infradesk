# Registro de decisões (decisions.md)

> Decisões de projeto e o motivo de cada uma. Quando uma decisão mudar, não apague: acrescente uma
> nova entrada explicando a mudança.

| Data    | Decisão                                                       | Motivo                                                                                                                                                                                                               |
| ------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-09 | **Supabase como backend** (BaaS), sem servidor próprio        | Auth, Postgres, Storage e API prontos; o desenvolvedor já conhece a ferramenta. A lógica de backend fica em migrations SQL (tabelas, triggers, RLS) e Edge Functions                                                 |
| 2026-09 | **Expo + React Native**                                       | Um código para Android e iOS; builds na nuvem com EAS (não há Mac disponível)                                                                                                                                        |
| 2026-09 | **TypeScript**                                                | Tipos gerados do banco, menos erros; o editor ajuda quem está aprendendo                                                                                                                                             |
| 2026-09 | **Expo Router**, rotas em `src/app/`                          | Substituiu a decisão anterior de usar React Navigation. Motivo: deep links automáticos, essenciais para notificações (`infradesk://tickets/1042`) e para o QR Code das salas (`infradesk://tickets/new?location=12`) |
| 2026-09 | **NativeWind** para estilos                                   | Classes do Tailwind no React Native; facilita traduzir o protótipo visual feito no v0                                                                                                                                |
| 2026-09 | Código e banco em **inglês**; interface em **português**      | Padrão do ecossistema e dos tipos gerados pelo Supabase                                                                                                                                                              |
| 2026-09 | Usuário comum vê **apenas os próprios chamados**              | Padrão mais seguro; pode ser revisto                                                                                                                                                                                 |
| 2026-09 | **Interface primeiro (com mocks), backend na Etapa 6**        | O foco de aprendizado é React Native; o banco é desenhado antes (`docs/data-model.md`) e os mocks seguem o mesmo formato, para que a troca afete só `src/services/`                                                  |
| 2026-09 | Botões primários em **`orange-700`**                          | `orange-600` com texto branco não tem contraste suficiente para texto de tamanho normal                                                                                                                              |
| 2026-09 | Mapa de locais **adiado**; painel com barras feitas em `View` | Reduz dependências nativas e complexidade na primeira versão                                                                                                                                                         |
| 2026-09 | Fluxo Git: **branch por tarefa → PR → squash merge**          | `main` sempre funcional; histórico limpo e legível                                                                                                                                                                   |
| 2026-09 | Repositório **público** no GitHub (`infradesk`)               | Portfólio. Licença ainda a definir                                                                                                                                                                                   |
| 2026-09 | **ESLint (`eslint-config-expo`) + Prettier**; Prettier não formata `.md` | Padrão oficial do Expo; a documentação é escrita à mão e não deve ser reformatada automaticamente |
| 2026-09 | **NativeWind v4** (Tailwind CSS 3), não a v5 | A v4 é a versão estável indicada no guia oficial; no Expo 57 ela usa Reanimated 4 + `react-native-worklets` |
| 2026-09 | Tema escuro do NativeWind com `darkMode: 'class'` | Permite a troca manual de tema no Perfil; o modo padrão `media` lança erro na web ("Cannot manually set color scheme") |

## Pendências de decisão

- Licença do projeto (confirmar vínculo com a universidade).
- Conta de publicação nas lojas: pessoal ou institucional.
