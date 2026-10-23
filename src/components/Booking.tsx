import { useId, useMemo, useState, type FormEvent } from 'react'
import { CalendarCheck, X } from 'lucide-react'
import { OCCASIONS, SITE, TEXTS } from '../config/site'
import { formatWithWeekday, isSelectable, parseISO, todayISO } from '../lib/dates'
import { buildBookingMessage, openExternal, prepareBookingRequest } from '../lib/whatsapp'
import { Calendar, type MonthView } from './Calendar'
import { WhatsAppIcon } from './Brand'

type Status = { kind: 'error' | 'success'; text: string } | null

export function Booking() {
  const [today, setToday] = useState(() => todayISO(SITE.timeZone))
  const [selected, setSelected] = useState<string | null>(null)
  const [view, setView] = useState<MonthView>(() => {
    const p = parseISO(today)!
    return { y: p.y, m: p.m }
  })
  const [name, setName] = useState('')
  const [occasion, setOccasion] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<Status>(null)
  const ids = { name: useId(), date: useId(), occasion: useId(), notes: useId() }

  const select = (iso: string) => {
    setSelected(iso)
    setStatus(null)
  }

  const onDateInput = (value: string) => {
    if (!value) return clear()
    const p = parseISO(value)
    if (!p) return
    if (!isSelectable(value, today)) {
      setStatus({ kind: 'error', text: 'Essa data já passou. Escolha hoje ou uma data futura.' })
      return
    }
    setView({ y: p.y, m: p.m })
    select(value)
  }

  const clear = () => {
    setSelected(null)
    setStatus(null)
  }

  const preview = useMemo(
    () => (selected ? buildBookingMessage({ date: selected, name, occasion, notes }) : null),
    [selected, name, occasion, notes],
  )

  const submit = (e: FormEvent) => {
    e.preventDefault()
    // Revalida com a data atual no momento do clique (a página pode ter ficado aberta de um dia para o outro).
    const now = todayISO(SITE.timeZone)
    if (now !== today) setToday(now)
    const result = prepareBookingRequest({ date: selected ?? '', name, occasion, notes }, now)
    if (!result.ok) {
      setStatus({ kind: 'error', text: result.error })
      return
    }
    openExternal(result.url)
    setStatus({
      kind: 'success',
      text: 'Abrimos o WhatsApp com a sua mensagem pronta. É só enviar: a proprietária confirma a disponibilidade e os valores no atendimento.',
    })
  }

  return (
    <section id="locacao" className="section booking" aria-labelledby="booking-title">
      <div className="container booking__grid">
        <div className="booking__intro" data-reveal>
          <p className="eyebrow">Solicitar locação</p>
          <h2 id="booking-title" className="display">{TEXTS.bookingTitle}</h2>
          <p className="lead">
            Você pode consultar qualquer data: durante a semana, aos finais de semana e em feriados. Escolha o dia no
            calendário e envie a solicitação diretamente para a proprietária pelo WhatsApp.
          </p>
          <ul className="booking__facts">
            <li><strong>Datas sujeitas à confirmação.</strong> A disponibilidade é verificada pela proprietária.</li>
            <li><strong>Valores tratados diretamente com a proprietária</strong>, de acordo com a data e a sua necessidade.</li>
            <li><strong>Condições específicas</strong> da locação são confirmadas no atendimento.</li>
          </ul>
        </div>

        <form className="booking__panel" onSubmit={submit} noValidate data-reveal>
          <div className="booking__calendar">
            <Calendar today={today} selected={selected} view={view} onViewChange={setView} onSelect={select} />
          </div>

          <div className="booking__form">
            <div className="booking__chosen" aria-live="polite">
              <CalendarCheck size={20} aria-hidden="true" />
              {selected ? (
                <div>
                  <span className="booking__chosen-label">Data escolhida</span>
                  <strong>{formatWithWeekday(selected)}</strong>
                </div>
              ) : (
                <div>
                  <span className="booking__chosen-label">Nenhuma data selecionada</span>
                  <strong>Escolha um dia no calendário</strong>
                </div>
              )}
              {selected && (
                <button type="button" className="booking__clear" onClick={clear} aria-label="Limpar data selecionada">
                  <X size={16} aria-hidden="true" /> Limpar
                </button>
              )}
            </div>

            <div className="field">
              <label htmlFor={ids.date}>Data pretendida</label>
              <input id={ids.date} type="date" min={today} value={selected ?? ''} onChange={(e) => onDateInput(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor={ids.name}>Seu nome <span className="optional">(opcional)</span></label>
              <input id={ids.name} type="text" autoComplete="name" maxLength={80} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor={ids.occasion}>Tipo de ocasião <span className="optional">(opcional)</span></label>
              <select id={ids.occasion} value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                <option value="">Selecione, se quiser</option>
                {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor={ids.notes}>Mensagem adicional <span className="optional">(opcional)</span></label>
              <textarea id={ids.notes} rows={3} maxLength={500} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            {preview && (
              <details className="booking__preview">
                <summary>Ver a mensagem que será enviada</summary>
                <p>{preview}</p>
              </details>
            )}

            <button type="submit" className="btn btn--whatsapp btn--block">
              <WhatsAppIcon width={20} height={20} /> Solicitar locação pelo WhatsApp
            </button>

            <div className="booking__status" role="status" aria-live="polite">
              {status && <p className={`status status--${status.kind}`}>{status.text}</p>}
            </div>

            <p className="booking__notice">{TEXTS.bookingNotice}</p>
          </div>
        </form>
      </div>
    </section>
  )
}
