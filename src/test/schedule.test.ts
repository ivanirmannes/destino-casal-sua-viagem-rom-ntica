/**
 * Regras da agenda: quando o botão libera, o que chega no WhatsApp e como a
 * data é escrita.
 */
import { describe, expect, it } from "vitest";

import {
  AGENDA_DESTINATION_OPTIONS,
  AGENDA_TIME_SLOTS,
  buildScheduleMessage,
  buildScheduleUrl,
  formatAppointmentDate,
  isAppointmentReady,
} from "@/lib/schedule";

const complete = {
  name: "Ivanir Mannes",
  phone: "(48) 99192-0743",
  destination: "Itália",
  date: "2026-10-15",
  time: "14:00",
};

describe("liberação do botão de confirmação", () => {
  it("libera quando tudo foi preenchido", () => {
    expect(isAppointmentReady(complete)).toBe(true);
  });

  it("bloqueia sem nome", () => {
    expect(isAppointmentReady({ ...complete, name: "   " })).toBe(false);
  });

  it("bloqueia sem WhatsApp válido", () => {
    expect(isAppointmentReady({ ...complete, phone: "(48) 9919" })).toBe(false);
  });

  it("bloqueia sem data", () => {
    expect(isAppointmentReady({ ...complete, date: "" })).toBe(false);
  });

  it("bloqueia sem horário", () => {
    expect(isAppointmentReady({ ...complete, time: "" })).toBe(false);
  });
});

describe("mensagem que chega no WhatsApp", () => {
  it("traz nome, contato, destino, data e horário", () => {
    expect(buildScheduleMessage(complete)).toBe(
      "Olá! Quero agendar uma conversa com a DestinoCasal.\n\n" +
        "Nome: Ivanir Mannes\n" +
        "WhatsApp: 48991920743\n" +
        "Destino de interesse: Itália\n" +
        "Data: 15/10/2026\n" +
        "Horário: 14:00\n\n" +
        "Aguardo a confirmação!",
    );
  });

  it("o link aponta para o número oficial da DestinoCasal", () => {
    expect(buildScheduleUrl(complete)).toContain("https://wa.me/5548991920743?text=");
  });
});

describe("apresentação da data", () => {
  it("converte a data do formulário para o formato brasileiro", () => {
    expect(formatAppointmentDate("2026-10-15")).toBe("15/10/2026");
  });
});

describe("opções oferecidas na agenda", () => {
  it("oferece os três destinos e a indecisão", () => {
    expect([...AGENDA_DESTINATION_OPTIONS]).toEqual([
      "Itália",
      "França",
      "Grécia",
      "Ainda não decidi",
    ]);
  });

  it("oferece horários apenas em dia, sem repetição", () => {
    expect(new Set(AGENDA_TIME_SLOTS).size).toBe(AGENDA_TIME_SLOTS.length);
    expect(AGENDA_TIME_SLOTS.every((slot) => /^\d{2}:\d{2}$/.test(slot))).toBe(true);
  });
});
