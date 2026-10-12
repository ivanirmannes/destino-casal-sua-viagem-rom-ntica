/**
 * Regras da agenda automatizada: horários oferecidos, texto do agendamento e
 * montagem do link que abre o WhatsApp da DestinoCasal com tudo preenchido.
 *
 * Funções puras — o componente `AgendaSection` só guarda o que foi digitado e
 * pergunta a estas funções se já pode liberar o botão de confirmação.
 */
import { WHATSAPP_NUMBER } from "@/config/site";
import { buildWhatsAppUrl, extractDigits, isWhatsAppPhoneValid } from "@/lib/whatsapp";

/** Dados de um pedido de conversa coletados pelo formulário. */
export type Appointment = {
  name: string;
  phone: string;
  destination: string;
  /** Data no formato do input nativo, ex.: "2026-10-15". */
  date: string;
  /** Hora no formato "14:00". */
  time: string;
};

/** Destinos que o visitante pode escolher na agenda. */
export const AGENDA_DESTINATION_OPTIONS = [
  "Itália",
  "França",
  "Grécia",
  "Ainda não decidiu",
] as const;

/**
 * Horários com vaga na agenda (09h às 19h, com pausa no almoço).
 * Segunda a sábado; domingo fica fora da lista.
 */
export const AGENDA_TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "19:00",
] as const;

/**
 * "2026-10-15" → "15/10/2026".
 *
 * O meio-dia (T12:00:00) é proposital: sem ele o fuso horário pode jogar a data
 * para o dia anterior em algumas regiões.
 */
export function formatAppointmentDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("pt-BR");
}

/**
 * O agendamento ainda não pode ser confirmado enquanto faltar nome, WhatsApp
 * válido, data ou horário.
 */
export function isAppointmentReady(appointment: Appointment): boolean {
  return Boolean(
    appointment.name.trim() &&
      isWhatsAppPhoneValid(appointment.phone) &&
      appointment.date &&
      appointment.time,
  );
}

/** Texto que chega no WhatsApp: nome, contato, destino, data e hora. */
export function buildScheduleMessage(appointment: Appointment): string {
  const { name, phone, destination, date, time } = appointment;
  return (
    "Olá! Quero agendar uma conversa com a DestinoCasal.\n\n" +
    `Nome: ${name.trim()}\n` +
    `WhatsApp: ${extractDigits(phone)}\n` +
    `Destino de interesse: ${destination}\n` +
    `Data: ${date ? formatAppointmentDate(date) : ""}\n` +
    `Horário: ${time}\n\n` +
    "Aguardo a confirmação!"
  );
}

/** Link wa.me com o agendamento pronto para o visitante só apertar "enviar". */
export function buildScheduleUrl(appointment: Appointment): string {
  return buildWhatsAppUrl(WHATSAPP_NUMBER, buildScheduleMessage(appointment));
}
