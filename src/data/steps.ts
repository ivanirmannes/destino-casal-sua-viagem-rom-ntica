/**
 * Conteúdo da seção "Como funciona": as quatro etapas do atendimento, na ordem.
 * A numeração exibida no card vem da posição no array, então a ordem importa.
 */
import { CalendarHeart, Compass, MessageCircle, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Step = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const steps: Step[] = [
  {
    icon: MessageCircle,
    title: "Conversa inicial",
    text: "Vocês nos contam pelo WhatsApp o estilo de viagem dos sonhos, datas e orçamento.",
  },
  {
    icon: Compass,
    title: "Roteiro sob medida",
    text: "Desenhamos um itinerário exclusivo com hospedagens, experiências e momentos românticos.",
  },
  {
    icon: CalendarHeart,
    title: "Tudo reservado",
    text: "Cuidamos de hotéis, passagens aéreas, passeios, restaurantes e traslados. Vocês só fazem as malas.",
  },
  {
    icon: Sparkles,
    title: "Suporte na viagem",
    text: "Acompanhamento em tempo real durante toda a viagem, para qualquer imprevisto ou desejo novo.",
  },
];
