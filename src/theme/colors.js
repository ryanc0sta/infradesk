/**
 * FONTE ÚNICA dos tokens de cor (docs/design.md, seção 3).
 *
 * Cada valor são os canais "R G B" da cor. Este arquivo é lido por:
 * - tailwind.config.js, que gera as variáveis CSS `--color-*` (claro em `:root`, escuro em
 *   `.dark:root`) e as classes (`bg-surface`, `text-brand`...);
 * - src/theme/useThemeColors.ts, para o que precisa da cor em JavaScript (ícones, placeholder,
 *   navegação).
 *
 * Princípio: superfícies em cinza neutro (escala `zinc` do Tailwind); a cor aparece em pouca
 * quantidade e só onde informa algo. O laranja da marca fica na ação principal; as cores
 * semânticas (azul, âmbar, verde, vermelho) ficam em elementos pequenos: o ponto do status e o
 * indicador de prioridade.
 *
 * É CommonJS (`module.exports`) porque o tailwind.config.js roda no Node, fora do app.
 */
module.exports = {
  light: {
    // Superfícies e texto (zinc)
    background: '250 250 250', // zinc-50: fundo das telas
    surface: '255 255 255', // white: cards, campos, barra de abas
    'surface-muted': '244 244 245', // zinc-100: selos, fundo de ícones, estado pressionado
    border: '228 228 231', // zinc-200: bordas de 1 px e divisórias
    foreground: '24 24 27', // zinc-900: texto principal
    'muted-foreground': '82 82 91', // zinc-600: metadados e texto secundário

    // Marca (laranja queimado): só na ação principal e na aba ativa
    primary: '194 83 10', // #C2530A: botões com texto branco
    'primary-foreground': '255 255 255',
    accent: '204 88 3', // #CC5803: ícones de destaque
    'accent-soft': '255 247 237', // orange-50: fundos de destaque
    brand: '168 72 10', // #A8480A: texto na cor da marca (links, aba ativa)

    // Sucesso (verde): "concluído" e confirmações
    success: '5 150 105', // emerald-600 (o emerald-500 dá só 2,5:1 sobre branco)
    'success-soft': '236 253 245', // emerald-50
    'success-text': '4 120 87', // emerald-700

    // Sobre fotos: fundo escuro translúcido (usar com opacidade, ex.: bg-overlay/60) e texto claro
    overlay: '9 9 11', // zinc-950
    'overlay-foreground': '255 255 255',

    // Ações destrutivas e erros
    danger: '185 28 28', // red-700
    'danger-foreground': '255 255 255',
    'danger-soft': '254 242 242', // red-50: fundo do botão destrutivo
    error: '185 28 28', // red-700: texto e borda de erro

    // Status: o selo é neutro e só um ponto leva cor.
    'status-open-dot': '100 116 139', // slate-500
    'status-in-review-dot': '59 130 246', // blue-500
    'status-in-progress-dot': '245 158 11', // amber-500
    'status-done-dot': '16 185 129', // emerald-500
    'status-rejected-dot': '220 38 38', // red-600
    'status-cancelled-dot': '161 161 170', // zinc-400

    // Prioridade: fundo do selo sólido, texto sobre ele, e cor de ícone/texto sem fundo.
    'priority-low': '226 232 240', // slate-200
    'priority-low-foreground': '30 41 59', // slate-800
    'priority-low-text': '71 85 105', // slate-600
    'priority-medium': '253 230 138', // amber-200
    'priority-medium-foreground': '120 53 15', // amber-900
    'priority-medium-text': '180 83 9', // amber-700
    'priority-high': '194 65 12', // orange-700
    'priority-high-foreground': '255 255 255',
    'priority-high-text': '194 65 12', // orange-700
    'priority-critical': '185 28 28', // red-700
    'priority-critical-foreground': '255 255 255',
    'priority-critical-text': '185 28 28', // red-700
  },
  dark: {
    background: '9 9 11', // zinc-950
    surface: '24 24 27', // zinc-900
    'surface-muted': '39 39 42', // zinc-800
    border: '63 63 70', // zinc-700
    foreground: '250 250 250', // zinc-50
    'muted-foreground': '161 161 170', // zinc-400

    primary: '194 83 10', // #C2530A
    'primary-foreground': '255 255 255',
    accent: '234 88 12', // orange-600
    'accent-soft': '67 20 7', // orange-950
    brand: '251 146 60', // orange-400

    success: '16 185 129', // emerald-500
    'success-soft': '6 46 34', // #062E22
    'success-text': '110 231 183', // emerald-300

    overlay: '9 9 11', // igual ao claro: a foto não muda com o tema
    'overlay-foreground': '255 255 255',

    danger: '220 38 38', // red-600
    'danger-foreground': '255 255 255',
    'danger-soft': '60 20 20', // #3C1414
    error: '248 113 113', // red-400

    'status-open-dot': '148 163 184', // slate-400
    'status-in-review-dot': '96 165 250', // blue-400
    'status-in-progress-dot': '251 191 36', // amber-400
    'status-done-dot': '52 211 153', // emerald-400
    'status-rejected-dot': '248 113 113', // red-400
    'status-cancelled-dot': '82 82 91', // zinc-600

    // Os selos sólidos têm fundo e texto próprios, então são iguais nos dois temas.
    'priority-low': '226 232 240',
    'priority-low-foreground': '30 41 59',
    'priority-low-text': '148 163 184', // slate-400
    'priority-medium': '253 230 138',
    'priority-medium-foreground': '120 53 15',
    'priority-medium-text': '251 191 36', // amber-400
    'priority-high': '194 65 12',
    'priority-high-foreground': '255 255 255',
    'priority-high-text': '251 146 60', // orange-400
    'priority-critical': '185 28 28',
    'priority-critical-foreground': '255 255 255',
    'priority-critical-text': '248 113 113', // red-400
  },
};
