/**
 * Configuração central da DestinoCasal: marca, contatos e mensagens prontas.
 *
 * >>> Para trocar o número de WhatsApp, altere apenas WHATSAPP_NUMBER aqui. <<<
 * Todos os botões do site, o formulário da agenda e as mensagens pré-preenchidas
 * são derivados deste valor — nenhum componente guarda número de telefone.
 */
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const BRAND = {
  /** Nome exibido no topo, no rodapé e nos títulos de página. */
  name: "DestinoCasal",
  /** Assinatura curta do rodapé. */
  tagline: "Roteiros românticos sob medida · Itália, França e Grécia",
  /** Descrição usada nos metadados (Google, WhatsApp, redes sociais). */
  description:
    "Consultoria de viagens especializada em roteiros personalizados para casais. Itália, França e Grécia planejados nos mínimos detalhes. Fale conosco pelo WhatsApp.",
  /** Aviso exibido no site: é um mostruário, com números ilustrativos. */
  demoNotice: "Site demonstrativo — números e depoimentos são ilustrativos.",
} as const;

/**
 * Número oficial no formato internacional, só dígitos: +55 48 99192-0743.
 * O wa.me exige o código do país (55) sem "+", espaços ou traços.
 */
export const WHATSAPP_NUMBER = "5548991920743";

/** Texto que já sai escrito quando alguém clica em "Falar no WhatsApp". */
export const CONTACT_MESSAGE = "Olá! Quero planejar uma viagem a dois com a DestinoCasal.";

/** Link definitivo usado por todos os botões de contato do site. */
export const WHATSAPP_URL = buildWhatsAppUrl(WHATSAPP_NUMBER, CONTACT_MESSAGE);
