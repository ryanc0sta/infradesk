/**
 * Junta classes do NativeWind ignorando valores falsos:
 * `cn('p-4', isActive && 'bg-accent-soft', className)`.
 * Não resolve conflitos: quando duas classes definem a mesma propriedade, vale a regra do
 * Tailwind (ordem no CSS gerado), não a ordem aqui. Por isso os componentes evitam receber
 * classes que conflitem com as suas variantes.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
