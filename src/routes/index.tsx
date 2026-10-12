/**
 * Página única da DestinoCasal.
 *
 * Este arquivo faz só duas coisas: declara os metadados da página (o título e a
 * descrição que aparecem no Google e no zap Zap ao compartilhar o link) e monta
 * as seções na ordem em que são vistas. Conteúdo e aparência vivem em
 * src/components/sections; dados de texto em src/data.
 */
import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "@/components/sections/about";
import { AgendaSection } from "@/components/sections/agenda";
import { DestinationsSection } from "@/components/sections/destinations";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer as _unusedFooter } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { HotelsAndFlightsSection } from "@/components/sections/hotels-and-flights";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { BRAND } from "@/config/site";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "DestinoCasal — Roteiros românticos sob medida na Itália, França e Grécia" },
      { name: "description", content: BRAND.description },
      { property: "og:title", content: "DestinoCasal — Viagens românticas sob medida" },
      { property: "og:description", content: BRAND.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <AboutSection />
      <DestinationsSection />
      <HotelsAndFlightsSection />
      <AgendaSection />
      <HowItWorksSection />
      <FinalCta />
      <SiteFooter />
    </div>
  );
}
