import { useState } from "react";

const services = [
  {
    icon: BedDouble,
    title: "Hotéis selecionados a dedo",
    text: "Curadoria de hospedagens românticas: boutique hotels, masserias na Toscana, suítes com vista para a caldeira em Santorini e charmosos hotéis parisienses. Reservamos tudo com as melhores tarifas e benefícios exclusivos para casais.",
    items: ["Boutique hotels e suítes românticas", "Upgrades e mimos de lua de mel", "Cancelamento flexível sempre que possível"],
  },
  {
    icon: Plane,
    title: "Passagens aéreas sem dor de cabeça",
    text: "Pesquisamos e emitimos as passagens ideais para o roteiro de vocês: melhores horários, conexões curtas e assentos juntos. Monitoramos promoções e remarcamos em caso de imprevistos.",
    items: ["Voos com as melhores conexões", "Assentos juntos e franquias conferidas", "Monitoramento de preços e remarcações"],
  },
];

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "19:00"];

function AgendaSection() {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("Itália");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const isComplete = name.trim() && date && time;

  const scheduleUrl =
    `https://wa.me/${WHATSAPP_NUMBER}?text=` +
    encodeURIComponent(
      `Olá! Quero agendar uma conversa com a DestinoCasal.\n\n` +
        `Nome: ${name.trim()}\n` +
        `Destino de interesse: ${destination}\n` +
        `Data: ${date ? new Date(date + "T12:00:00").toLocaleDateString("pt-BR") : ""}\n` +
        `Horário: ${time}\n\n` +
        `Aguardo a confirmação!`,
    );

  return (
    <section id="agenda" className="bg-secondary/60 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Agenda automatizada</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
              Escolha o melhor momento para conversarmos
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Selecione a data e o horário que funcionam para vocês. O agendamento chega
              automaticamente no nosso WhatsApp e confirmamos em instantes — sem formulários
              complicados, sem espera.
            </p>
            <ul className="mt-8 space-y-3 text-muted-foreground">
              {[
                "Atendimento de segunda a sábado",
                "Conversa de 30 minutos, sem compromisso",
                "Confirmação rápida pelo WhatsApp",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CalendarCheck className="h-5 w-5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
            <h3 className="font-display text-2xl font-semibold">Agende sua conversa</h3>
            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="agenda-nome" className="text-sm font-medium">Seu nome</label>
                <input
                  id="agenda-nome"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como podemos te chamar?"
                  className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="agenda-destino" className="text-sm font-medium">Destino de interesse</label>
                <select
                  id="agenda-destino"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                >
                  <option>Itália</option>
                  <option>França</option>
                  <option>Grécia</option>
                  <option>Ainda não decidi</option>
                </select>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="agenda-data" className="text-sm font-medium">Data</label>
                  <input
                    id="agenda-data"
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="agenda-hora" className="text-sm font-medium">Horário</label>
                  <select
                    id="agenda-hora"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  >
                    <option value="">Escolha</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
              <a
                href={isComplete ? scheduleUrl : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!isComplete}
                className={`flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold shadow-lg transition-transform ${
                  isComplete
                    ? "bg-whatsapp text-whatsapp-foreground hover:scale-[1.02]"
                    : "cursor-not-allowed bg-muted text-muted-foreground"
                }`}
                onClick={(e) => {
                  if (!isComplete) e.preventDefault();
                }}
              >
                <MessageCircle className="h-5 w-5" />
                Confirmar agendamento no WhatsApp
              </a>
              <p className="text-center text-xs text-muted-foreground">
                Ao confirmar, o WhatsApp abre com o agendamento pronto para envio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { createFileRoute } from "@tanstack/react-router";
import {
  Heart,
  MapPin,
  MessageCircle,
  Sparkles,
  CalendarHeart,
  Compass,
  BedDouble,
  Plane,
  CalendarCheck,
} from "lucide-react";
import heroItaly from "@/assets/hero-italy.jpg";
import italy from "@/assets/italy.jpg";
import france from "@/assets/france.jpg";
import greece from "@/assets/greece.jpg";

const WHATSAPP_NUMBER = "5548991920743";
const WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent("Olá! Quero planejar uma viagem a dois com a DestinoCasal.");

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "DestinoCasal — Roteiros românticos sob medida na Itália, França e Grécia" },
      {
        name: "description",
        content:
          "Consultoria de viagens especializada em roteiros personalizados para casais. Itália, França e Grécia planejados nos mínimos detalhes. Fale conosco pelo WhatsApp.",
      },
      { property: "og:title", content: "DestinoCasal — Viagens românticas sob medida" },
      {
        property: "og:description",
        content:
          "Roteiros personalizados para casais na Itália, França e Grécia. Planejamento completo e atendimento pelo WhatsApp.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const destinations = [
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

const steps = [
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

function WhatsAppButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-semibold text-whatsapp-foreground shadow-lg transition-transform hover:scale-[1.03] ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      {children}
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="font-display text-2xl font-semibold tracking-wide">
            Destino<span className="text-primary">Casal</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#sobre" className="transition-colors hover:text-foreground">Sobre</a>
            <a href="#destinos" className="transition-colors hover:text-foreground">Destinos</a>
            <a href="#hoteis-passagens" className="transition-colors hover:text-foreground">Hotéis & Voos</a>
            <a href="#agenda" className="transition-colors hover:text-foreground">Agendar</a>
            <a href="#como-funciona" className="transition-colors hover:text-foreground">Como funciona</a>
          </nav>
          <WhatsAppButton className="!px-5 !py-2.5 text-xs">Falar no WhatsApp</WhatsAppButton>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-end">
        <img
          src={heroItaly}
          alt="Casal caminhando de mãos dadas na Costa Amalfitana ao pôr do sol"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1088}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-40">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            <Heart className="h-4 w-4" /> Consultoria de viagens para casais
          </p>
          <h1 className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.05] text-white md:text-7xl">
            A viagem dos sonhos de vocês, desenhada a quatro mãos
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            Roteiros personalizados na Itália, França e Grécia — cada detalhe planejado para que vocês
            vivam momentos inesquecíveis a dois.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <WhatsAppButton>Planejar nossa viagem</WhatsAppButton>
            <a
              href="#destinos"
              className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Conhecer destinos
            </a>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Quem somos</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
              Especialistas em transformar viagens a dois em memórias para a vida inteira
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A DestinoCasal nasceu da paixão por viajar em casal. Somos uma consultoria boutique que
              planeja cada roteiro como se fosse o nosso: conhecemos pessoalmente os hotéis,
              restaurantes e experiências que recomendamos.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Nada de pacotes prontos. Cada casal recebe um itinerário único, pensado para o ritmo,
              os gostos e o orçamento de vocês.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "+200", label: "casais atendidos" },
              { value: "3", label: "destinos dominados a fundo" },
              { value: "100%", label: "roteiros personalizados" },
              { value: "24h", label: "de suporte durante a viagem" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-card p-6 text-center">
                <p className="font-display text-4xl font-semibold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinos */}
      <section id="destinos" className="bg-secondary/60 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Nossos destinos</p>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
              Três países, infinitas formas de se apaixonar
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {destinations.map((dest) => (
              <article
                key={dest.name}
                className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.alt}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20">
                    <h3 className="font-display text-3xl font-semibold text-white">{dest.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="leading-relaxed text-muted-foreground">{dest.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {dest.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        <MapPin className="h-3 w-3" /> {h}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Como funciona</p>
          <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            Do primeiro olá ao embarque, sem estresse
          </h2>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border border-border bg-card p-8">
              <span className="absolute right-6 top-6 font-display text-5xl font-semibold text-primary/15">
                {i + 1}
              </span>
              <step.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-5 font-display text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
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
            Conte para a gente no WhatsApp quando e para onde vocês querem ir. Respondemos rapidinho
            e sem compromisso.
          </p>
          <WhatsAppButton className="mt-10">Chamar no WhatsApp</WhatsAppButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
          <p className="font-display text-xl font-semibold text-foreground">
            Destino<span className="text-primary">Casal</span>
          </p>
          <p>Roteiros românticos sob medida · Itália, França e Grécia</p>
          <p>© {new Date().getFullYear()} DestinoCasal. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
