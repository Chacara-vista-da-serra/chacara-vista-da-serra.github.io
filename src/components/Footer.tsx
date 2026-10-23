import { PHONE_DISPLAY, SITE, TEXTS } from '../config/site'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { Logo, WhatsAppIcon } from './Brand'

const YEAR = new Date().getFullYear()

export function Footer() {
  const waUrl = buildWhatsAppUrl(TEXTS.genericMessage)

  return (
    <footer className="footer">
      <div className="container footer__cta">
        <h2 className="display display--light">Tem uma data em mente?</h2>
        <a href="#locacao" className="btn btn--light">Consultar uma data</a>
      </div>

      <div className="container footer__grid">
        <div>
          <Logo className="logo--light" />
          <p className="footer__place">{SITE.city}, {SITE.state}</p>
        </div>

        <nav aria-label="Rodapé" className="footer__nav">
          <a href="#inicio">Início</a>
          <a href="#a-chacara">A Chácara</a>
          <a href="#galeria">Galeria</a>
          <a href="#experiencias">Experiência</a>
          <a href="#locacao">Solicitar Locação</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>

        <div className="footer__contact">
          <span className="footer__label">Atendimento direto com a proprietária</span>
          {waUrl && (
            <a className="btn btn--whatsapp" href={waUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon width={18} height={18} /> WhatsApp {PHONE_DISPLAY}
            </a>
          )}
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {YEAR} {SITE.name}. Todos os direitos reservados.</span>
        <span>Toda solicitação de locação depende de confirmação da proprietária.</span>
      </div>
    </footer>
  )
}
