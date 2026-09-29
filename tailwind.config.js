/** Cria uma cor que lê a variável CSS `--color-<name>` (valores em global.css) e aceita opacidade. */
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
        danger: {
          DEFAULT: token('danger'),
          foreground: token('danger-foreground'),
        },
        // bg-status-open + text-status-open-foreground, etc. (nomes do enum ticket_status)
        status: pairs('status', [
          'open',
          'in-review',
          'in-progress',
          'done',
          'rejected',
          'cancelled',
        ]),
        // text-priority-critical, etc. (nomes do enum ticket_priority)
        priority: {
          low: token('priority-low'),
          medium: token('priority-medium'),
          high: token('priority-high'),
          critical: token('priority-critical'),
        },
      },
    },
  },
  plugins: [],
};
