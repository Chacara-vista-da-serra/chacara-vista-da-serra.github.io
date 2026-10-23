import { useEffect, useRef, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  WEEKDAYS, WEEKDAYS_SHORT, addDays, addMonths, formatWithWeekday, isSelectable, monthGrid, monthLabel, parseISO, toISO,
} from '../lib/dates'

export type MonthView = { y: number; m: number }

type Props = {
  today: string
  selected: string | null
  view: MonthView
  onViewChange: (view: MonthView) => void
  onSelect: (iso: string) => void
}

const viewOf = (iso: string): MonthView => {
  const p = parseISO(iso)!
  return { y: p.y, m: p.m }
}

const sameView = (a: MonthView, b: MonthView) => a.y === b.y && a.m === b.m

export function Calendar({ today, selected, view, onViewChange, onSelect }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)
  const pendingFocus = useRef<string | null>(null)
  const cells = monthGrid(view.y, view.m)
  const todayView = viewOf(today)
  const atFirstMonth = sameView(view, todayView) || view.y * 12 + view.m < todayView.y * 12 + todayView.m

  // Dia que recebe o foco do teclado (tabindex 0) dentro do mês exibido.
  const inView = (iso: string | null) => !!iso && sameView(viewOf(iso), view)
  const firstSelectable = cells.find((c): c is string => !!c && isSelectable(c, today)) ?? null
  const focusable = inView(selected) ? selected : inView(today) ? today : firstSelectable

  useEffect(() => {
    if (!pendingFocus.current) return
    const btn = gridRef.current?.querySelector<HTMLButtonElement>(`[data-iso="${pendingFocus.current}"]`)
    pendingFocus.current = null
    btn?.focus()
  })

  const moveFocus = (iso: string) => {
    if (!isSelectable(iso, today)) return
    pendingFocus.current = iso
    const target = viewOf(iso)
    if (!sameView(target, view)) onViewChange(target)
    else gridRef.current?.querySelector<HTMLButtonElement>(`[data-iso="${iso}"]`)?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, iso: string) => {
    const weekday = new Date(`${iso}T12:00:00Z`).getUTCDay()
    const moves: Record<string, () => string> = {
      ArrowRight: () => addDays(iso, 1),
      ArrowLeft: () => addDays(iso, -1),
      ArrowDown: () => addDays(iso, 7),
      ArrowUp: () => addDays(iso, -7),
      Home: () => addDays(iso, -weekday),
      End: () => addDays(iso, 6 - weekday),
      PageDown: () => addMonths(iso, e.shiftKey ? 12 : 1),
      PageUp: () => addMonths(iso, e.shiftKey ? -12 : -1),
    }
    const move = moves[e.key]
    if (!move) return
    e.preventDefault()
    moveFocus(move())
  }

  const goMonth = (delta: number) => {
    const next = viewOf(addMonths(toISO({ ...view, d: 1 }), delta))
    onViewChange(next)
  }

  const label = monthLabel(view.y, view.m)
  const rows: (string | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))

  return (
    <div className="calendar">
      <div className="calendar__head">
        <button type="button" className="calendar__nav" onClick={() => goMonth(-1)} disabled={atFirstMonth} aria-label="Mês anterior">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <h3 className="calendar__month" id="calendar-label" aria-live="polite">{label}</h3>
        <button type="button" className="calendar__nav" onClick={() => goMonth(1)} aria-label="Próximo mês">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div ref={gridRef} role="grid" aria-labelledby="calendar-label" className="calendar__grid">
        <div role="row" className="calendar__row calendar__row--head">
          {WEEKDAYS_SHORT.map((d, i) => (
            <span role="columnheader" key={i} className="calendar__weekday">
              <abbr title={WEEKDAYS[i]}>{d}</abbr>
            </span>
          ))}
        </div>
        {rows.map((row, r) => (
          <div role="row" className="calendar__row" key={r}>
            {row.map((iso, c) => {
              if (!iso) return <span role="gridcell" key={c} className="calendar__cell" />
              const disabled = !isSelectable(iso, today)
              const isSelected = iso === selected
              const isToday = iso === today
              return (
                <span role="gridcell" key={iso} className="calendar__cell" aria-selected={isSelected}>
                  <button
                    type="button"
                    data-iso={iso}
                    className={`calendar__day ${isSelected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}`}
                    disabled={disabled}
                    tabIndex={iso === focusable ? 0 : -1}
                    aria-current={isToday ? 'date' : undefined}
                    aria-label={`${formatWithWeekday(iso)}${isToday ? ' (hoje)' : ''}${disabled ? ', data passada' : ''}`}
                    onClick={() => onSelect(iso)}
                    onKeyDown={(e) => onKeyDown(e, iso)}
                  >
                    {Number(iso.slice(8))}
                  </button>
                </span>
              )
            })}
          </div>
        ))}
      </div>

      <p className="calendar__legend">
        <span><i className="dot dot--today" aria-hidden="true" /> Hoje</span>
        <span><i className="dot dot--selected" aria-hidden="true" /> Data escolhida</span>
      </p>
    </div>
  )
}
