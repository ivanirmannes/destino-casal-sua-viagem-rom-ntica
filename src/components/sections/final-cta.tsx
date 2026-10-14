/**
 * Chamada final antes do rodapé: foto de Santorini escurecida ao fundo e o
 * último convite para falar no WhatsApp.
 */
import greece from "@/assets/greece.jpg";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <img
        src={greece}
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-balance font-display text-4xl font-semibold text-white md:text-6xl">
          Prontos para começar a planejar?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
          Conte para a gente no WhatsApp quando e para onde vocês querem ir. Respondemos rapidinho e
          sem compromisso.
        </p>
        <WhatsAppButton className="mt-10">Chamar no WhatsApp</WhatsAppButton>
      </div>
    </section>
  );
}
