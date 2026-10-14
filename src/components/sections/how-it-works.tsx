/**
 * Seção "Como funciona": as quatro etapas do atendimento, numeradas.
 * O conteúdo vem de src/data/steps.ts; o número do canto é a posição da etapa.
 */
import { steps } from "@/data/steps";

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Como funciona
        </p>
        <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
          Do primeiro olá ao embarque, sem estresse
        </h2>
      </div>
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.title} className="relative rounded-2xl border border-border bg-card p-8">
            <span className="absolute right-6 top-6 font-display text-5xl font-semibold text-primary/15">
              {index + 1}
            </span>
            <step.icon className="h-8 w-8 text-primary" />
            <h3 className="mt-5 font-display text-2xl font-semibold">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
