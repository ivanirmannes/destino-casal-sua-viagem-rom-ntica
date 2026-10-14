/**
 * Seção "Nossos destinos": um cartão por país (foto, texto e regiões).
 * O conteúdo vem de src/data/destinations.ts — aqui só a apresentação.
 */
import { MapPin } from "lucide-react";

import { destinations } from "@/data/destinations";

export function DestinationsSection() {
  return (
    <section id="destinos" className="bg-secondary/60 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Nossos destinos
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            Três países, infinitas formas de se apaixonar
          </h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {destinations.map((dest) => (
            <article
              key={dest.name}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.alt}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20">
                  <h3 className="font-display text-3xl font-semibold text-white">{dest.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="leading-relaxed text-muted-foreground">{dest.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {dest.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      <MapPin className="h-3 w-3" /> {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
