/**
 * FONTE ÚNICA dos tokens de cor (docs/design.md, seção 3).
 *
 * Cada valor são os canais "R G B" de uma cor da paleta do Tailwind. Este arquivo é lido por:
 * - tailwind.config.js, que gera as variáveis CSS `--color-*` (claro em `:root`, escuro em
 *   `.dark:root`) e as classes (`bg-surface`, `text-brand`...);
 * - src/theme/useThemeColors.ts, para o que precisa da cor em JavaScript (ícones, placeholder,
 *   navegação).
 *
 * É CommonJS (`module.exports`) porque o tailwind.config.js roda no Node, fora do app.
 */
module.exports = {
  light: {
    background: '250 250 250', // zinc-50
    surface: '255 255 255', // white
    'surface-muted': '244 244 245', // zinc-100
    border: '228 228 231', // zinc-200
    foreground: '24 24 27', // zinc-900
    'muted-foreground': '82 82 91', // zinc-600
    primary: '194 65 12', // orange-700: botões com texto branco
    'primary-foreground': '255 255 255',
    accent: '234 88 12', // orange-600: ícones ativos, FAB, destaques sem texto pequeno
    'accent-soft': '255 247 237', // orange-50: fundos de destaque
    brand: '194 65 12', // orange-700: texto na cor da marca (títulos, links, botão fantasma)
    danger: '185 28 28', // red-700
    'danger-foreground': '255 255 255',
    error: '185 28 28', // red-700: texto e borda de erro (mensagens de validação)
    'status-open': '219 234 254', // blue-100
    'status-open-foreground': '29 78 216', // blue-700
    'status-in-review': '237 233 254', // violet-100
    'status-in-review-foreground': '109 40 217', // violet-700
    'status-in-progress': '254 243 199', // amber-100
    'status-in-progress-foreground': '146 64 14', // amber-800
    'status-done': '220 252 231', // green-100
    'status-done-foreground': '21 128 61', // green-700
    'status-rejected': '254 226 226', // red-100
    'status-rejected-foreground': '185 28 28', // red-700
    'status-cancelled': '244 244 245', // zinc-100
    'status-cancelled-foreground': '63 63 70', // zinc-700
    'priority-low': '82 82 91', // zinc-600
    'priority-medium': '180 83 9', // amber-700
    'priority-high': '194 65 12', // orange-700
    'priority-critical': '185 28 28', // red-700
  },
  dark: {
    background: '9 9 11', // zinc-950
    surface: '24 24 27', // zinc-900
    'surface-muted': '39 39 42', // zinc-800
    border: '63 63 70', // zinc-700
    foreground: '250 250 250', // zinc-50
    'muted-foreground': '161 161 170', // zinc-400
    primary: '194 65 12', // orange-700
    'primary-foreground': '255 255 255',
    accent: '249 115 22', // orange-500
    'accent-soft': '67 20 7', // orange-950
    brand: '251 146 60', // orange-400: o orange-700 não tem contraste como texto no escuro
    danger: '220 38 38', // red-600
    'danger-foreground': '255 255 255',
    error: '248 113 113', // red-400: o red-600 do botão não tem contraste como texto no escuro
    'status-open': '23 37 84', // blue-950
    'status-open-foreground': '147 197 253', // blue-300
    'status-in-review': '46 16 101', // violet-950
    'status-in-review-foreground': '196 181 253', // violet-300
    'status-in-progress': '69 26 3', // amber-950
    'status-in-progress-foreground': '252 211 77', // amber-300
    'status-done': '5 46 22', // green-950
    'status-done-foreground': '134 239 172', // green-300
    'status-rejected': '69 10 10', // red-950
    'status-rejected-foreground': '252 165 165', // red-300
    'status-cancelled': '39 39 42', // zinc-800
    'status-cancelled-foreground': '212 212 216', // zinc-300
    'priority-low': '161 161 170', // zinc-400
    'priority-medium': '251 191 36', // amber-400
    'priority-high': '251 146 60', // orange-400
    'priority-critical': '248 113 113', // red-400
  },
};
