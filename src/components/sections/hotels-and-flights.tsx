/**
 * Seção "Hotéis & passagens aéreas": dois cartões (hospedagem e voos).
 * O conteúdo vem de src/data/services.ts.
 */
import { Heart } from "lucide-react";

import { services } from "@/data/services";

export function HotelsAndFlightsSection() {
  return (
    <section id="hoteis-passagens" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Hotéis &amp; passagens aéreas
        </p>
        <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
          Hospedagem e voos resolvidos em um só lugar
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Além do roteiro, cuidamos das duas partes mais trabalhosas da viagem: onde dormir e como chegar.
        </p>
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.title} className="rounded-3xl border border-border bg-card p-10 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <service.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mt-6 font-display text-3xl font-semibold">{service.title}</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">{service.text}</p>
            <ul className="mt-6 space-y-3">
              {service.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
