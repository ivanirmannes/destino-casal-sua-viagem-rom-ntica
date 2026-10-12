/**
 * Conteúdo da seção "Nossos destinos".
 *
 * Para trocar uma foto, substitua o arquivo em `src/assets` e atualize o import
 * correspondente — o texto fica aqui, sem precisar mexer no componente.
 */
import france from "@/assets/france.jpg";
import greece from "@/assets/greece.jpg";
import italy from "@/assets/italy.jpg";

export type Destination = {
  name: string;
  /** URL da imagem, resolvida pelo Vite a partir do import. */
  image: string;
  /** Descrição da foto para leitores de tela e para o Google. */
  alt: string;
  description: string;
  /** Regiões exibidas nas "etiquetas" abaixo do texto. */
  highlights: string[];
};

export const destinations: Destination[] = [
  {
    name: "Itália",
    image: italy,
    alt: "Casal de vespa pelas colinas da Toscana",
    description:
      "Toscana, Costa Amalfitana e Veneza: vinícolas, vilarejos históricos e jantares à luz de velas em um país feito para apaixonados.",
    highlights: ["Costa Amalfitana", "Toscana", "Veneza"],
  },
  {
    name: "França",
    image: france,
    alt: "Casal brindando em café parisiense com a Torre Eiffel ao fundo",
    description:
      "Paris, Provence e a Riviera Francesa: charme, gastronomia e cenários que transformam qualquer viagem em uma declaração de amor.",
    highlights: ["Paris", "Provence", "Côte d'Azur"],
  },
  {
    name: "Grécia",
    image: greece,
    alt: "Casal admirando o pôr do sol em Santorini",
    description:
      "Santorini, Mykonos e Atenas: pores do sol inesquecíveis, mar azul-turquesa e o ritmo perfeito para celebrar a dois.",
    highlights: ["Santorini", "Mykonos", "Atenas"],
  },
];
