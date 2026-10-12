/**
 * Botão verde de WhatsApp, usado no topo, no hero e no CTA final.
 *
 * O link vem de `WHATSAPP_URL` (src/config/site.ts), que já carrega a mensagem
 * de contato pronta. `className` só ajusta tamanho/posição em cada uso.
 */
import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

import { WHATSAPP_URL } from "@/config/site";

type WhatsAppButtonProps = {
  children: ReactNode;
  className?: string;
};

export function WhatsAppButton({ children, className = "" }: WhatsAppButtonProps) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-semibold text-whatsapp-foreground shadow-lg transition-transform hover:scale-[1.03] ${className}`}
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      {children}
    </a>
  );
}
