import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { TEXTS } from '../config/site'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { Logo, WhatsAppIcon } from './Brand'

const NAV = [
  { href: '#inicio', label: 'Início' },
  { href: '#a-chacara', label: 'A Chácara' },
  { href: '#experiencias', label: 'Experiência' },
  { href: '#locacao', label: 'Solicitar Locação' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const waUrl = buildWhatsAppUrl(TEXTS.genericMessage)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`header ${scrolled || open ? 'header--solid' : ''}`}>
      <div className="header__inner container">
        <a href="#inicio" className="header__brand" aria-label="Chácara Vista da Serra, voltar ao início" onClick={close}>
          <Logo />
        </a>

        <nav className="header__nav" aria-label="Principal">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="header__actions">
          {waUrl && (
            <a className="icon-link" href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp (abre em nova aba)">
              <WhatsAppIcon width={20} height={20} />
            </a>
          )}
          <a href="#locacao" className="btn btn--small btn--header">Consultar disponibilidade</a>
          <button
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="menu-mobile" className={`mobile-menu ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav aria-label="Menu móvel" className="container">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={close}>{item.label}</a>
          ))}
          <a href="#locacao" className="btn btn--primary" onClick={close}>Consultar disponibilidade</a>
        </nav>
      </div>
    </header>
  )
}
