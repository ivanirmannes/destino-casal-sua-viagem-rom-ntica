/**
 * Regras de telefone brasileiro e de link do WhatsApp.
 * Cada teste abaixo corresponde a uma regra que o site precisa manter.
 */
import { describe, expect, it } from "vitest";

import {
  buildWhatsAppUrl,
  extractDigits,
  formatWhatsAppPhone,
  isWhatsAppPhoneValid,
  phoneValidationError,
  toNationalDigits,
} from "@/lib/whatsapp";

describe("validação de WhatsApp", () => {
  it("aceita o número oficial completo", () => {
    expect(isWhatsAppPhoneValid("(48) 99192-0743")).toBe(true);
  });

  it("aceita o mesmo número com código do país", () => {
    expect(isWhatsAppPhoneValid("+55 48 99192-0743")).toBe(true);
  });

  it("aceita número de 8 dígitos (sem o 9 extra)", () => {
    expect(isWhatsAppPhoneValid("(48) 3025-1234")).toBe(true);
  });

  it("rejeita número incompleto", () => {
    expect(isWhatsAppPhoneValid("(48) 99192")).toBe(false);
  });

  it("rejeita campo vazio", () => {
    expect(isWhatsAppPhoneValid("")).toBe(false);
  });

  it("rejeita dígito a mais", () => {
    expect(isWhatsAppPhoneValid("(48) 99192-07431")).toBe(false);
  });
});

describe("máscara do campo de WhatsApp", () => {
  it("mantém só os dígitos nos dois primeiros lugares (DDD)", () => {
    expect(formatWhatsAppPhone("48")).toBe("48");
  });

  it("abre o parênteses depois do DDD", () => {
    expect(formatWhatsAppPhone("(48) 9")).toBe("(48) 9");
  });

  it("insere o traço nos números de 8 dígitos", () => {
    expect(formatWhatsAppPhone("4899192074")).toBe("(48) 9919-2074");
  });

  it("insere o traço nos números de 9 dígitos", () => {
    expect(formatWhatsAppPhone("48991920743")).toBe("(48) 99192-0743");
  });

  it("descarta o 55 digitado antes do DDD", () => {
    expect(formatWhatsAppPhone("5548991920743")).toBe("(48) 99192-0743");
  });

  it("não deixa digitar mais que um telefone brasileiro", () => {
    expect(formatWhatsAppPhone("489919207431234")).toBe("(48) 99192-0743");
  });
});

describe("mensagem de erro do campo", () => {
  it("pede o número quando nada foi digitado", () => {
    expect(phoneValidationError("")).toBe("Informe seu número de WhatsApp.");
  });

  it("explica o formato quando o número está incompleto", () => {
    expect(phoneValidationError("(48) 99192")).toBe(
      "Número incompleto. Use DDD + número, ex.: (48) 99999-0743.",
    );
  });

  it("não mostra erro quando o número está certo", () => {
    expect(phoneValidationError("(48) 99192-0743")).toBeNull();
  });
});

describe("links de WhatsApp", () => {
  it("usa apenas dígitos no destino do link", () => {
    expect(extractDigits("+55 (48) 99192-0743")).toBe("5548991920743");
  });

  it("remove o código do país dos dígitos nacionais", () => {
    expect(toNationalDigits("5548991920743")).toBe("48991920743");
  });

  it("codifica a mensagem no link wa.me", () => {
    const url = buildWhatsAppUrl("5548991920743", "Olá! Quero planejar.");
    expect(url).toBe("https://wa.me/5548991920743?text=Ol%C3%A1!%20Quero%20planejar.");
  });
});
