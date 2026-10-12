/**
 * Logotipo tipográfico: "Destino" na cor do texto e "Casal" em terracota.
 * Usado no topo e no rodapé. `className` ajusta apenas o tamanho/cor do bloco.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-semibold tracking-wide ${className}`}>
      Destino<span className="text-primary">Casal</span>
    </span>
  );
}
