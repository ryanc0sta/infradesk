/**
 * FONTE ÚNICA dos tokens de cor (docs/design.md, seção 3).
 *
 * Cada valor são os canais "R G B" da cor. Este arquivo é lido por:
 * - tailwind.config.js, que gera as variáveis CSS `--color-*` (claro em `:root`, escuro em
 *   `.dark:root`) e as classes (`bg-surface`, `text-brand`...);
 * - src/theme/useThemeColors.ts, para o que precisa da cor em JavaScript (ícones, placeholder,
 *   navegação).
 *
 * A paleta é uma rampa quente única (creme → areia → laranja → marrom), tirada do protótipo,
 * com duas exceções de significado: verde-azulado para sucesso e vermelho para erro. Há ajustes
 * mínimos onde o contraste não chegava a 4,5:1 para texto. O hexadecimal ao lado de cada valor
 * é a mesma cor, para conferência.
 *
 * É CommonJS (`module.exports`) porque o tailwind.config.js roda no Node, fora do app.
 */
module.exports = {
  light: {
    // Superfícies e texto
    background: '250 243 224', // #FAF3E0 creme: fundo das telas
    surface: '255 255 255', // #FFFFFF: cards, campos, barra de abas
    'surface-muted': '242 232 207', // #F2E8CF areia: caixas de aviso, fundo de ícones
    border: '217 207 184', // #D9CFB8
    foreground: '92 64 51', // #5C4033 marrom: texto principal
    'muted-foreground': '117 99 90', // #75635A: texto secundário (protótipo: #8C786D, 3,8:1)

    // Marca (laranja queimado)
    primary: '194 83 10', // #C2530A: botões com texto branco (protótipo: #CC5803, 4,2:1)
    'primary-foreground': '255 255 255',
    accent: '204 88 3', // #CC5803: FAB, ícones e aba ativa (laranja exato do protótipo)
    'accent-soft': '253 237 221', // #FDEDDD: fundos de destaque
    brand: '168 72 10', // #A8480A: texto na cor da marca (links, botão fantasma)

    // Sucesso (verde-azulado): a única cor fora da rampa quente, só para "concluído" e sucesso
    success: '42 157 143', // #2A9D8F: ícones, barras e pontos (teal do protótipo)
    'success-soft': '238 247 243', // #EEF7F3: fundos de destaque
    'success-text': '27 110 100', // #1B6E64: texto (o teal do protótipo dá só 3,3:1)

    // Sobre fotos: fundo escuro translúcido (usar com opacidade, ex.: bg-overlay/60) e texto claro
    overlay: '28 22 18', // #1C1612
    'overlay-foreground': '255 255 255',

    // Ações destrutivas e erros
    danger: '185 28 28', // #B91C1C
    'danger-foreground': '255 255 255',
    error: '185 28 28', // #B91C1C: texto e borda de erro (mensagens de validação)

    // Status: fundo e texto do selo. Seguem a rampa quente, ficando mais intensos conforme o
    // chamado avança (areia → laranja claro → laranja); "concluído" usa o sucesso e "rejeitado",
    // o vermelho. "Cancelado" não tem fundo: é um selo só com contorno (ver StatusBadge).
    'status-open': '242 232 207', // #F2E8CF areia
    'status-open-foreground': '92 64 51', // #5C4033
    'status-in-review': '253 237 221', // #FDEDDD
    'status-in-review-foreground': '168 72 10', // #A8480A
    'status-in-progress': '247 207 165', // #F7CFA5
    'status-in-progress-foreground': '122 51 6', // #7A3306
    'status-done': '221 240 234', // #DDF0EA
    'status-done-foreground': '27 110 100', // #1B6E64
    'status-rejected': '251 228 225', // #FBE4E1
    'status-rejected-foreground': '185 28 28', // #B91C1C

    // Prioridade: mesma rampa, da mais suave (baixa) à mais intensa (crítica).
    // Fundo do selo sólido, texto sobre ele, e cor de ícone/texto sem fundo.
    'priority-low': '233 224 200', // #E9E0C8 areia
    'priority-low-foreground': '92 64 51', // #5C4033
    'priority-low-text': '117 99 90', // #75635A
    'priority-medium': '242 183 124', // #F2B77C laranja claro
    'priority-medium-foreground': '90 46 8', // #5A2E08
    'priority-medium-text': '92 64 51', // #5C4033
    'priority-high': '194 83 10', // #C2530A laranja da marca
    'priority-high-foreground': '255 255 255',
    'priority-high-text': '168 72 10', // #A8480A
    'priority-critical': '185 28 28', // #B91C1C vermelho
    'priority-critical-foreground': '255 255 255',
    'priority-critical-text': '185 28 28', // #B91C1C
  },
  dark: {
    background: '28 22 18', // #1C1612 marrom bem escuro (no lugar do preto)
    surface: '42 33 27', // #2A211B
    'surface-muted': '56 45 37', // #382D25
    border: '82 67 56', // #524338
    foreground: '245 235 221', // #F5EBDD creme
    'muted-foreground': '181 164 152', // #B5A498

    primary: '194 83 10', // #C2530A
    'primary-foreground': '255 255 255',
    accent: '224 108 31', // #E06C1F
    'accent-soft': '74 40 18', // #4A2812
    brand: '245 150 72', // #F59648

    success: '52 172 157', // #34AC9D
    'success-soft': '24 54 49', // #183631
    'success-text': '94 205 190', // #5ECDBE

    overlay: '28 22 18', // igual ao claro: a foto não muda com o tema
    'overlay-foreground': '255 255 255',

    danger: '220 38 38', // #DC2626
    'danger-foreground': '255 255 255',
    error: '248 113 113', // #F87171: o vermelho do botão não tem contraste como texto no escuro

    'status-open': '56 45 37', // #382D25
    'status-open-foreground': '222 207 193', // #DECFC1
    'status-in-review': '74 40 18', // #4A2812
    'status-in-review-foreground': '245 178 122', // #F5B27A
    'status-in-progress': '122 58 12', // #7A3A0C
    'status-in-progress-foreground': '255 217 176', // #FFD9B0
    'status-done': '24 54 49', // #183631
    'status-done-foreground': '94 205 190', // #5ECDBE
    'status-rejected': '74 21 18', // #4A1512
    'status-rejected-foreground': '249 168 160', // #F9A8A0

    // Os selos sólidos têm fundo e texto próprios, então são iguais nos dois temas.
    'priority-low': '233 224 200',
    'priority-low-foreground': '92 64 51',
    'priority-low-text': '181 164 152', // #B5A498
    'priority-medium': '242 183 124',
    'priority-medium-foreground': '90 46 8',
    'priority-medium-text': '245 235 221', // #F5EBDD
    'priority-high': '194 83 10',
    'priority-high-foreground': '255 255 255',
    'priority-high-text': '245 150 72', // #F59648
    'priority-critical': '185 28 28',
    'priority-critical-foreground': '255 255 255',
    'priority-critical-text': '248 113 113', // #F87171
  },
};
