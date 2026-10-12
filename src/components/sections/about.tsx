/**
 * Seção "Quem somos": apresentação da consultoria + quatro números de vitrine.
 *
 * Atenção: os números abaixo são de demonstração. Confirme cada um com a
 * DestinoCasal antes de publicar — eles aparecem como informação real.
 */
const STATS = [
  { value: "+200", label: "casais atendidos" },
  { value: "3", label: "destinos dominados a fundo" },
  { value: "100%", label: "roteiros personalizados" },
  { value: "24h", label: "de suporte durante a viagem" },
];

export function AboutSection() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Quem somos</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
            Especialistas em transformar viagens a dois em memórias para a vida inteira
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            A DestinoCasal nasceu da paixão por viajar em casal. Somos uma consultoria boutique que
            planeja cada roteiro como se fosse o nosso: conhecemos pessoalmente os hotéis,
            restaurantes e experiências que recomendamos.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Nada de pacotes prontos. Cada casal recebe um itinerário único, pensado para o ritmo,
            os gostos e o orçamento de vocês.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-6 text-center">
              <p className="font-display text-4xl font-semibold text-primary">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
