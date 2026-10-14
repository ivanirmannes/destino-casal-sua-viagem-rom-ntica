/**
 * Primeira tela do site: foto de fundo (Costa Amalfitana), chamada principal e
 * os dois caminhos de entrada — falar no WhatsApp ou descer para os destinos.
 *
 * A imagem de capa é um arquivo local em src/assets; a camada escura sobre ela
 * existe só para o texto branco continuar legível. Recorte e altura estável
 * no celular são definidos em src/styles.css.
 */
import { Heart } from "lucide-react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import heroItaly from "@/assets/hero-italy.jpg";

export function Hero() {
  return (
    <section className="travel-cover relative isolate flex items-end overflow-hidden">
      <img
        src={heroItaly}
        alt="Casal caminhando de mãos dadas na Costa Amalfitana ao pôr do sol"
        className="travel-cover-image absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1088}
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-cover-shade/80 via-cover-shade/45 to-cover-shade/10"
        aria-hidden="true"
      />
      {/* Menos espaço e texto menor no celular evitam uma capa maior que a tela.
          A altura continua livre para crescer com zoom ou textos maiores. */}
      <div className="relative mx-auto w-full min-w-0 max-w-6xl px-6 pb-12 pt-32 sm:pb-16 md:pb-24 md:pt-40">
        <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase text-cover-foreground/80 sm:text-sm">
          <Heart className="h-4 w-4 shrink-0" aria-hidden="true" /> Consultoria de viagens para
          casais
        </p>
        <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] text-cover-foreground sm:text-5xl md:text-7xl">
          A viagem dos sonhos de vocês, desenhada a quatro mãos
        </h1>
        <p className="mt-5 max-w-xl text-base text-cover-foreground/85 sm:mt-6 sm:text-lg">
          Roteiros personalizados na Itália, França e Grécia — cada detalhe planejado para que vocês
          vivam momentos inesquecíveis a dois.
        </p>
        <div className="mt-7 grid justify-items-start gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
          <WhatsAppButton>Planejar nossa viagem</WhatsAppButton>
          <Button
            asChild
            variant="ghost"
            className="h-auto rounded-full border border-cover-foreground/40 px-7 py-3.5 text-sm font-semibold text-cover-foreground hover:bg-cover-foreground/10 hover:text-cover-foreground"
          >
            <a href="#destinos">Conhecer destinos</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
