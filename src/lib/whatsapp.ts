import { LOCATION_LABEL, SITE, WHATSAPP_NUMBER } from '../config/site'
import { formatLong, isSelectable, todayISO } from './dates'

/** 55 + DDD (2 dígitos, sem zero) + 8 ou 9 dígitos. */
export function isValidWhatsAppNumber(number: string) {
  return /^55[1-9][1-9]9?\d{8}$/.test(number)
}

export function buildWhatsAppUrl(message: string, number: string = WHATSAPP_NUMBER) {
  if (!isValidWhatsAppNumber(number)) return null
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export type BookingDetails = {
  date: string
  name?: string
  occasion?: string
  notes?: string
}

export function buildBookingMessage({ date, name, occasion, notes }: BookingDetails) {
  const base =
    `Olá! Tudo bem? Gostaria de consultar a disponibilidade e os valores para alugar a ` +
    `${SITE.name}, em ${LOCATION_LABEL}, no dia ${formatLong(date)}. ` +
    `Poderia me informar as condições da locação? Obrigado(a)!`

  const extras = [
    name?.trim() && `Nome: ${name.trim()}`,
    occasion?.trim() && `Ocasião: ${occasion.trim()}`,
    notes?.trim() && `Mensagem: ${notes.trim()}`,
  ].filter(Boolean)

  return extras.length ? `${base}\n\n${extras.join('\n')}` : base
}

export type BookingResult =
  | { ok: true; url: string; message: string }
  | { ok: false; error: string }

/** Valida a data e o número antes de montar o link de conversa. */
export function prepareBookingRequest(
  details: BookingDetails,
  today: string = todayISO(SITE.timeZone),
  number: string = WHATSAPP_NUMBER,
): BookingResult {
  if (!details.date) return { ok: false, error: 'Selecione uma data no calendário para continuar.' }
  if (!isSelectable(details.date, today))
    return { ok: false, error: 'Essa data já passou. Escolha hoje ou uma data futura.' }
  const message = buildBookingMessage(details)
  const url = buildWhatsAppUrl(message, number)
  if (!url)
    return { ok: false, error: 'O contato de WhatsApp não está configurado. Tente novamente mais tarde.' }
  return { ok: true, url, message }
}

/** Abre o link em nova aba/aplicativo dentro do gesto do usuário. */
export function openExternal(url: string) {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.rel = 'noopener noreferrer'
  document.body.appendChild(a)
  a.click()
  a.remove()
}
