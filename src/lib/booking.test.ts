import { describe, expect, it } from 'vitest'
import {
  addDays, addMonths, formatLong, formatWithWeekday, monthGrid, parseISO, todayISO, isSelectable,
} from './dates'
import { buildBookingMessage, buildWhatsAppUrl, isValidWhatsAppNumber, prepareBookingRequest } from './whatsapp'

describe('datas', () => {
  it('formata por extenso em pt-BR com ano completo', () => {
    expect(formatLong('2027-07-16')).toBe('16 de julho de 2027')
    expect(formatLong('2026-12-05')).toBe('5 de dezembro de 2026')
    expect(formatLong('2026-10-23')).toBe('23 de outubro de 2026')
    expect(formatLong('2027-03-01')).toBe('1 de março de 2027')
  })

  it('inclui o dia da semana correto (úteis e fim de semana)', () => {
    expect(formatWithWeekday('2027-07-16')).toBe('sexta-feira, 16 de julho de 2027')
    expect(formatWithWeekday('2026-10-24')).toBe('sábado, 24 de outubro de 2026')
    expect(formatWithWeekday('2026-10-25')).toBe('domingo, 25 de outubro de 2026')
    expect(formatWithWeekday('2026-10-26')).toBe('segunda-feira, 26 de outubro de 2026')
  })

  it('calcula hoje no fuso de Brasília, sem deslocamento por UTC', () => {
    // 02:30 UTC de 24/10 ainda é 23/10 em Brasília (UTC-3)
    expect(todayISO('America/Sao_Paulo', new Date('2026-10-24T02:30:00Z'))).toBe('2026-10-23')
    expect(todayISO('America/Sao_Paulo', new Date('2026-10-24T03:30:00Z'))).toBe('2026-10-24')
  })

  it('bloqueia datas passadas e libera hoje e futuras', () => {
    expect(isSelectable('2026-10-22', '2026-10-23')).toBe(false)
    expect(isSelectable('2026-10-23', '2026-10-23')).toBe(true)
    expect(isSelectable('2027-01-01', '2026-10-23')).toBe(true)
    expect(isSelectable('2026-02-30', '2026-01-01')).toBe(false)
  })

  it('navega entre meses e anos', () => {
    expect(addMonths('2026-12-15', 1)).toBe('2027-01-15')
    expect(addMonths('2027-01-31', 1)).toBe('2027-02-28')
    expect(addMonths('2027-01-10', -1)).toBe('2026-12-10')
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
    expect(addDays('2028-03-01', -1)).toBe('2028-02-29')
  })

  it('monta a grade do mês começando no domingo', () => {
    const grid = monthGrid(2026, 11) // 1/11/2026 é domingo
    expect(grid[0]).toBe('2026-11-01')
    expect(grid.length % 7).toBe(0)
    expect(monthGrid(2026, 10).indexOf('2026-10-01')).toBe(4) // quinta-feira
    expect(parseISO('2026-13-01')).toBeNull()
  })
})

describe('WhatsApp', () => {
  it('gera exatamente a mensagem padrão', () => {
    expect(buildBookingMessage({ date: '2027-07-16' })).toBe(
      'Olá! Tudo bem? Gostaria de consultar a disponibilidade e os valores para alugar a Chácara Vista da Serra, em Congonhas - MG, no dia 16 de julho de 2027. Poderia me informar as condições da locação? Obrigado(a)!',
    )
  })

  it('ignora campos opcionais vazios e inclui os preenchidos', () => {
    expect(buildBookingMessage({ date: '2027-07-16', name: '  ', occasion: '', notes: '' })).not.toContain('\n')
    const msg = buildBookingMessage({ date: '2026-12-05', name: 'João', occasion: 'Celebração particular', notes: 'Somos em família & amigos' })
    expect(msg).toContain('no dia 5 de dezembro de 2026')
    expect(msg).toContain('\n\nNome: João\nOcasião: Celebração particular\nMensagem: Somos em família & amigos')
  })

  it('codifica acentos e caracteres especiais na URL', () => {
    const url = buildWhatsAppUrl('Olá & ação? #1', '5531988690602')!
    expect(url).toBe('https://wa.me/5531988690602?text=Ol%C3%A1%20%26%20a%C3%A7%C3%A3o%3F%20%231')
    expect(decodeURIComponent(url.split('text=')[1])).toBe('Olá & ação? #1')
  })

  it('valida o número', () => {
    expect(isValidWhatsAppNumber('5531988690602')).toBe(true)
    expect(isValidWhatsAppNumber('31988690602')).toBe(false)
    expect(isValidWhatsAppNumber('55319886906')).toBe(false)
    expect(isValidWhatsAppNumber('')).toBe(false)
    expect(buildWhatsAppUrl('oi', 'PENDENTE')).toBeNull()
  })

  it('valida a solicitação antes de montar o link', () => {
    const today = '2026-10-23'
    expect(prepareBookingRequest({ date: '' }, today).ok).toBe(false)
    expect(prepareBookingRequest({ date: '2026-10-01' }, today).ok).toBe(false)
    expect(prepareBookingRequest({ date: '2026-11-01' }, today, '000').ok).toBe(false)
    const ok = prepareBookingRequest({ date: '2026-10-24' }, today)
    expect(ok.ok && ok.url.startsWith('https://wa.me/5531988690602?text=')).toBe(true)
  })
})
