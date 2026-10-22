/** Rodapé: logotipo, assinatura e o ano corrente no aviso de direitos. */
import { Logo } from "@/components/logo";
import { BRAND } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <p className="text-xl text-foreground">
          <Logo />
        </p>
        <p>{BRAND.tagline}</p>
        <p>
          © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
        </p>
      </div>
      {/* Aviso de mostruário: o site é demonstrativo. */}
      <p className="mx-auto mt-6 max-w-6xl px-6 text-center text-xs text-muted-foreground">
        {BRAND.demoNotice}
      </p>
    </footer>
  );
}
