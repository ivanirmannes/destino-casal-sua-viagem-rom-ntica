/**
 * Primeira tela do site: foto de fundo (Costa Amalfitana), chamada principal e
 * os dois caminhos de entrada — falar no WhatsApp ou descer para os destinos.
 *
 * A imagem de capa é um arquivo local em src/assets; a camada escura sobre ela
 * existe só para o texto branco continuar legível.
 */
import { Heart } from "lucide-react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import heroItaly from "@/assets/hero-italy.jpg";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end">
      <img
        src={heroItaly}
        alt="Casal caminhando de mãos dadas na Costa Amalfitana ao pôr do sol"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1088}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-40">
        <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
          <Heart className="h-4 w-4" /> Consultoria de viagens para casais
        </p>
        <h1 className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.05] text-white md:text-7xl">
          A viagem dos sonhos de vocês, desenhada a quatro mãos
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/85">
          Roteiros personalizados na Itália, França e Grécia — cada detalhe planejado para que vocês
          vivam momentos inesquecíveis a dois.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <WhatsAppButton>Planejar nossa viagem</WhatsAppButton>
          <a
            href="#destinos"
            className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Conhecer destinos
          </a>
        </div>
      </div>
    </section>
  );
}
