const plugin = require('tailwindcss/plugin');

const themeColors = require('./src/theme/colors');

/** Cria uma cor que lê a variável CSS `--color-<name>` e aceita opacidade (`bg-primary/50`). */
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

/** Gera o par `<nome>` (fundo) e `<nome>-foreground` (texto) para cada chave. */
const pairs = (prefix, keys) =>
  Object.fromEntries(
    keys.flatMap((key) => [
      [key, token(`${prefix}-${key}`)],
      [`${key}-foreground`, token(`${prefix}-${key}-foreground`)],
    ]),
  );

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Arquivos onde o Tailwind procura classes usadas em `className`.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  // 'class' permite trocar o tema manualmente (opção no Perfil) além de seguir o sistema.
  // Com o padrão 'media', o NativeWind lança erro na web ao definir o esquema de cores.
  darkMode: 'class',
  theme: {
    extend: {
      // Inter: um nome de família por peso (ver src/theme/fonts.ts). Use font-sans-bold, não font-bold.
      fontFamily: {
        sans: ['Inter_400Regular'],
        'sans-medium': ['Inter_500Medium'],
        'sans-semibold': ['Inter_600SemiBold'],
        'sans-bold': ['Inter_700Bold'],
      },
      // Cantos dos cards do protótipo (28 px); botões e chips usam rounded-full (pílula).
      borderRadius: {
        '4xl': '28px',
      },
      // Tokens semânticos (docs/design.md, seção 3). Use estes nomes em vez de cores da paleta.
      colors: {
        background: token('background'),
        surface: {
          DEFAULT: token('surface'),
          muted: token('surface-muted'),
        },
        border: token('border'),
        foreground: token('foreground'),
        'muted-foreground': token('muted-foreground'),
        primary: {
          DEFAULT: token('primary'),
          foreground: token('primary-foreground'),
        },
        brand: token('brand'),
        accent: {
          DEFAULT: token('accent'),
          soft: token('accent-soft'),
        },
        // Verde-azulado: só para "concluído" e sucesso. bg-success (ícones, barras),
        // bg-success-soft (fundos) e text-success-text (texto).
        success: {
          DEFAULT: token('success'),
          soft: token('success-soft'),
          text: token('success-text'),
        },
        // Fundo escuro translúcido para elementos sobre fotos (bg-overlay/60).
        overlay: {
          DEFAULT: token('overlay'),
          foreground: token('overlay-foreground'),
        },
        danger: {
          DEFAULT: token('danger'),
          foreground: token('danger-foreground'),
        },
        error: token('error'),
        // bg-status-open + text-status-open-foreground, etc. (nomes do enum ticket_status)
        status: pairs('status', ['open', 'in-review', 'in-progress', 'done', 'rejected']),
        // Selo sólido: bg-priority-high + text-priority-high-foreground.
        // Sem fundo: text-priority-high-text. (nomes do enum ticket_priority)
        priority: Object.fromEntries(
          ['low', 'medium', 'high', 'critical'].flatMap((key) => [
            [key, token(`priority-${key}`)],
            [`${key}-foreground`, token(`priority-${key}-foreground`)],
            [`${key}-text`, token(`priority-${key}-text`)],
          ]),
        ),
      },
    },
  },
  plugins: [
    // Gera as variáveis `--color-*` a partir de src/theme/colors.js (fonte única dos tokens).
    plugin(({ addBase }) => {
      const toVars = (palette) =>
        Object.fromEntries(Object.entries(palette).map(([name, rgb]) => [`--color-${name}`, rgb]));
      addBase({
        ':root': toVars(themeColors.light),
        '.dark:root': toVars(themeColors.dark),
      });
    }),
  ],
};
