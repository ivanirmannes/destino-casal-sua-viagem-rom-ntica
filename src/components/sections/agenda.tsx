/**
 * Seção "Agenda automatizada".
 *
 * O formulário não envia nada para um servidor nem guarda nada: ele monta um
 * link do WhatsApp com o pedido de conversa já escrito (ver src/lib/schedule.ts)
 * e abre o app do visitante. O botão de confirmação só fica ativo quando nome,
 * WhatsApp válido, data e horário estão preenchidos.
 */
import { CalendarCheck, MessageCircle } from "lucide-react";
import { useState } from "react";

import {
  AGENDA_DESTINATION_OPTIONS,
  AGENDA_TIME_SLOTS,
  buildScheduleUrl,
  isAppointmentReady,
} from "@/lib/schedule";
import { formatWhatsAppPhone, phoneValidationError } from "@/lib/whatsapp";

/** Diferenciais listados ao lado do formulário. */
const BENEFITS = [
  "Atendimento de segunda a sábado",
  "Conversa de 30 minutos, sem compromisso",
  "Confirmação rápida pelo WhatsApp",
];

/** Estilo comum dos campos de texto, data e seleção. */
const FIELD_CLASS =
  "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

export function AgendaSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState<string>("Itália"); // destino pré-selecionado
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // O aviso de número inválido só aparece depois que a pessoa sai do campo.
  const [phoneTouched, setPhoneTouched] = useState(false);

  // Data de hoje em AAAA-MM-DD — usada como "data mínima" para impedir marcar no passado.
  const today = new Date().toISOString().slice(0, 10);

  const appointment = { name, phone, destination, date, time };
  const isComplete = isAppointmentReady(appointment);
  const scheduleUrl = buildScheduleUrl(appointment);
  const phoneError = phoneTouched ? phoneValidationError(phone) : null;

  return (
    <section id="agenda" className="bg-secondary/60 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Agenda automatizada
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
              Escolha o melhor momento para conversarmos
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Selecione a data e o horário que funcionam para vocês. O agendamento chega
              automaticamente no nosso WhatsApp e confirmamos em instantes — sem formulários
              complicados, sem espera.
            </p>
            <ul className="mt-8 space-y-3 text-muted-foreground">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CalendarCheck className="h-5 w-5 shrink-0 text-primary" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
            <h3 className="font-display text-2xl font-semibold">Agende sua conversa</h3>
            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="agenda-nome" className="text-sm font-medium">
                  Seu nome
                </label>
                <input
                  id="agenda-nome"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Como podemos te chamar?"
                  className={FIELD_CLASS}
                />
              </div>

              <div>
                <label htmlFor="agenda-whatsapp" className="text-sm font-medium">
                  Seu WhatsApp
                </label>
                <input
                  id="agenda-whatsapp"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(event) => setPhone(formatWhatsAppPhone(event.target.value))}
                  onBlur={() => setPhoneTouched(true)}
                  placeholder="(48) 99999-0743"
                  aria-invalid={Boolean(phoneError)}
                  className={`mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary ${
                    phoneError ? "border-destructive" : "border-input"
                  }`}
                />
                {phoneError ? (
                  <p className="mt-1.5 text-xs text-destructive">{phoneError}</p>
                ) : (
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Com DDD, ex.: (48) 99999-0743. É por aqui que confirmamos.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="agenda-destino" className="text-sm font-medium">
                  Destino de interesse
                </label>
                <select
                  id="agenda-destino"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  className={FIELD_CLASS}
                >
                  {AGENDA_DESTINATION_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="agenda-data" className="text-sm font-medium">
                    Data
                  </label>
                  <input
                    id="agenda-data"
                    type="date"
                    min={today}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label htmlFor="agenda-hora" className="text-sm font-medium">
                    Horário
                  </label>
                  <select
                    id="agenda-hora"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    className={FIELD_CLASS}
                  >
                    <option value="">Escolha</option>
                    {AGENDA_TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
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
                onClick={(event) => {
                  if (!isComplete) event.preventDefault();
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
