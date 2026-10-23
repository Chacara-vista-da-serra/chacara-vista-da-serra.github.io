/**
 * Datas de calendário representadas como texto ISO "AAAA-MM-DD".
 * Nenhuma conversão passa por horário local ou UTC com hora,
 * o que evita o deslocamento de um dia entre fusos.
 */

export const MONTHS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

export const WEEKDAYS = [
  'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira',
  'quinta-feira', 'sexta-feira', 'sábado',
]

export const WEEKDAYS_SHORT = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export type YMD = { y: number; m: number; d: number }

const pad = (n: number) => String(n).padStart(2, '0')

export function toISO({ y, m, d }: YMD) {
  return `${y}-${pad(m)}-${pad(d)}`
}

export function parseISO(iso: string): YMD | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return null
  const [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])]
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null
  return { y, m, d }
}

/** Data de hoje no fuso informado (padrão: Brasília). */
export function todayISO(timeZone = 'America/Sao_Paulo', now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return `${get('year')}-${get('month')}-${get('day')}`
}

export function daysInMonth(y: number, m: number) {
  return new Date(Date.UTC(y, m, 0)).getUTCDate()
}

/** 0 = domingo. */
export function weekdayOf({ y, m, d }: YMD) {
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay()
}

export function addDays(iso: string, days: number) {
  const p = parseISO(iso)
  if (!p) return iso
  const t = new Date(Date.UTC(p.y, p.m - 1, p.d + days))
  return toISO({ y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() })
}

/** Soma meses mantendo o dia dentro do limite do mês de destino. */
export function addMonths(iso: string, months: number) {
  const p = parseISO(iso)
  if (!p) return iso
  const total = p.y * 12 + (p.m - 1) + months
  const y = Math.floor(total / 12)
  const m = (total % 12) + 1
  return toISO({ y, m, d: Math.min(p.d, daysInMonth(y, m)) })
}

/** Datas ISO podem ser comparadas como texto. */
export function isBefore(a: string, b: string) {
  return a < b
}

export function isSelectable(iso: string, today: string) {
  return parseISO(iso) !== null && !isBefore(iso, today)
}

/** "16 de julho de 2027" */
export function formatLong(iso: string) {
  const p = parseISO(iso)
  if (!p) return ''
  return `${p.d} de ${MONTHS[p.m - 1]} de ${p.y}`
}

/** "sexta-feira, 16 de julho de 2027" */
export function formatWithWeekday(iso: string) {
  const p = parseISO(iso)
  if (!p) return ''
  return `${WEEKDAYS[weekdayOf(p)]}, ${formatLong(iso)}`
}

export function monthLabel(y: number, m: number) {
  const name = MONTHS[m - 1]
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} de ${y}`
}

/** Matriz do mês: células nulas antes do dia 1 para alinhar com domingo. */
export function monthGrid(y: number, m: number): (string | null)[] {
  const offset = weekdayOf({ y, m, d: 1 })
  const cells: (string | null)[] = Array.from({ length: offset }, () => null)
  for (let d = 1; d <= daysInMonth(y, m); d++) cells.push(toISO({ y, m, d }))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}
