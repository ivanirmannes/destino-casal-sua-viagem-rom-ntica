/**
 * Conteúdo da seção "Hotéis & passagens aéreas".
 * `icon` recebe o componente do ícone (lucide-react) que aparece no card.
 */
import { BedDouble, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  text: string;
  /** Itens listados com o ícone de coração abaixo do texto. */
  items: string[];
};

export const services: Service[] = [
  {
    icon: BedDouble,
    title: "Hotéis selecionados a dedo",
    text: "Curadoria de hospedagens românticas: boutique hotels, masserias na Toscana, suítes com vista para a caldeira em Santorini e charmosos hotéis parisienses. Reservamos tudo com as melhores tarifas e benefícios exclusivos para casais.",
    items: [
      "Boutique hotels e suítes românticas",
      "Upgrades e mimos de lua de mel",
      "Cancelamento flexível sempre que possível",
    ],
  },
  {
    icon: Plane,
    title: "Passagens aéreas sem dor de cabeça",
    text: "Pesquisamos e emitimos as passagens ideais para o roteiro de vocês: melhores horários, conexões curtas e assentos juntos. Monitoramos promoções e remarcamos em caso de imprevistos.",
    items: [
      "Voos com as melhores conexões",
      "Assentos juntos e franquias conferidas",
      "Monitoramento de preços e remarcações",
    ],
  },
];
