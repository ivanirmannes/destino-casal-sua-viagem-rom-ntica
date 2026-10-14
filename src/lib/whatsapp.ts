/**
 * Helpers de WhatsApp — regras de telefone brasileiro e montagem de links wa.me.
 *
 * Tudo aqui é função pura (sem React e sem DOM): dá para testar isolado com
 * `npm test`. Este arquivo é o único lugar onde mora a regra "que número é um
 * WhatsApp válido"; as telas apenas consomem.
 */

/** Devolve apenas os dígitos do que o usuário digitou (remove espaços, parênteses, traços, +). */
export function extractDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Converte o texto digitado em dígitos nacionais (DDD + número).
 *
 * O "55" inicial é descartado quando o conjunto tem cara de número
 * internacional (12 ou 13 dígitos). Assim "(48) 99192-0743" e
 * "+55 48 99192-0743" valem a mesma coisa.
 */
export function toNationalDigits(value: string): string {
  const digits = extractDigits(value);
  const looksInternational = digits.length === 12 || digits.length === 13;
  if (digits.startsWith("55") && looksInternational) return digits.slice(2);
  return digits;
}

/**
 * Um WhatsApp brasileiro é válido quando tem DDD (2 dígitos) + número de 8 ou 9
 * dígitos — ou seja, 10 ou 11 dígitos depois de tirar o código do país.
 */
export function isWhatsAppPhoneValid(value: string): boolean {
  const national = toNationalDigits(value);
  return national.length === 10 || national.length === 11;
}

/**
 * Máscara progressiva de telefone brasileiro, aplicada a cada tecla:
 * "4" → "4", "48" → "48", "489" → "(48) 9", "4899192074" → "(48) 9919-2074",
 * "48991920743" → "(48) 99192-0743".
 *
 * Quem digita "55" antes não quebra a máscara: o prefixo sai quando o número já
 * passou de 11 dígitos.
 */
export function formatWhatsAppPhone(value: string): string {
  let digits = extractDigits(value);
  if (digits.startsWith("55") && digits.length > 11) digits = digits.slice(2);
  digits = digits.slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/**
 * Mensagem de erro amigável para o campo de WhatsApp, ou `null` quando o número
 * está completo. Só deve ser mostrada depois que o usuário saiu do campo.
 */
export function phoneValidationError(value: string): string | null {
  if (isWhatsAppPhoneValid(value)) return null;
  return extractDigits(value).length === 0
    ? "Informe seu número de WhatsApp."
    : "Número incompleto. Use DDD + número, ex.: (48) 99999-0743.";
}

/** Monta um link wa.me apontando para `number` com a mensagem já escrita e codificada. */
export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${extractDigits(number)}?text=${encodeURIComponent(message)}`;
}
