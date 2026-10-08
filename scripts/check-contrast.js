// Confere o contraste (WCAG) dos pares de tokens de src/theme/colors.js nos dois temas.
// Uso: npm run contrast
// Texto precisa de 4,5:1; ícones e elementos gráficos, de 3:1.
const colors = require('../src/theme/colors');

const luminance = (rgb) => {
  const channel = (value) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = rgb.split(' ').map(Number);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const contrast = (a, b) => {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
};

const statuses = ['open', 'in-review', 'in-progress', 'done', 'rejected', 'cancelled'];
const priorities = ['low', 'medium', 'high', 'critical'];
const TEXT = 4.5;
const GRAPHIC = 3;
// O ponto do status acompanha um rótulo escrito, então não carrega a informação sozinho:
// basta ser distinguível do fundo do selo.
const DECORATIVE = 1.3;

// [cor da frente, cor de fundo, mínimo]
const pairs = [
  ...['background', 'surface', 'surface-muted'].flatMap((background) =>
    ['foreground', 'muted-foreground', 'brand', 'success-text', 'error'].map((text) => [
      text,
      background,
      TEXT,
    ]),
  ),
  ['brand', 'accent-soft', TEXT],
  ['foreground', 'accent-soft', TEXT],
  ['success-text', 'success-soft', TEXT],
  ['error', 'danger-soft', TEXT],
  ['primary-foreground', 'primary', TEXT],
  ['danger-foreground', 'danger', TEXT],
  ['overlay-foreground', 'overlay', TEXT],
  // Chip selecionado: fundo na cor do texto, texto na cor do fundo.
  ['background', 'foreground', TEXT],
  ['primary-foreground', 'accent', GRAPHIC],
  ['accent', 'surface', GRAPHIC],
  ['accent', 'background', GRAPHIC],
  ['success', 'surface', GRAPHIC],
  ['success', 'success-soft', GRAPHIC],
  ...statuses.map((status) => [`status-${status}-dot`, 'surface-muted', DECORATIVE]),
  ...priorities.flatMap((priority) => [
    [`priority-${priority}-foreground`, `priority-${priority}`, TEXT],
    [`priority-${priority}-text`, 'surface', TEXT],
    [`priority-${priority}-text`, 'background', TEXT],
  ]),
];

let failures = 0;
for (const theme of ['light', 'dark']) {
  const palette = colors[theme];
  const failed = pairs
    .map(([front, back, minimum]) => ({
      front,
      back,
      minimum,
      ratio: contrast(palette[front], palette[back]),
    }))
    .filter(({ ratio, minimum }) => ratio < minimum);
  failures += failed.length;
  console.log(
    failed.length
      ? `${theme}: ${failed.length} par(es) abaixo do mínimo`
      : `${theme}: OK (${pairs.length} pares)`,
  );
  for (const { front, back, minimum, ratio } of failed) {
    console.log(`  ${front} sobre ${back}: ${ratio.toFixed(2)} (mínimo ${minimum})`);
  }
}
process.exit(failures ? 1 : 0);
