/**
 * Barra fixa do topo: logotipo, navegação por âncoras e botão de contato.
 *
 * Os links apontam para o `id` de cada seção (ex.: "#agenda" → seção Agenda).
 * Para renomear um item do menu, altere `NAV_LINKS` — o `href` precisa bater com
 * o `id` da seção correspondente.
 */
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Logo } from "@/components/logo";
import { BRAND } from "@/config/site";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#destinos", label: "Destinos" },
  { href: "#hoteis-passagens", label: "Hotéis & Voos" },
  { href: "#agenda", label: "Agendar" },
  { href: "#como-funciona", label: "Como funciona" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-2xl" aria-label={`${BRAND.name} — início`}>
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>
        <WhatsAppButton className="!px-5 !py-2.5 text-xs">Falar no WhatsApp</WhatsAppButton>
      </div>
    </header>
  );
}
