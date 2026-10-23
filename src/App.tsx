import { useEffect } from 'react'
import { TEXTS } from './config/site'
import { buildWhatsAppUrl } from './lib/whatsapp'
import { WhatsAppIcon } from './components/Brand'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Gallery } from './components/Gallery'
import { Experiences } from './components/Experiences'
import { Booking } from './components/Booking'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'

/** Revela suavemente os blocos marcados com data-reveal ao entrarem na tela. */
function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'))
      return
    }
    document.documentElement.classList.add('js-reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useReveal()
  const waUrl = buildWhatsAppUrl(TEXTS.genericMessage)

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Gallery />
        <Experiences />
        <Booking />
        <Faq />
      </main>
      <Footer />
      {waUrl && (
        <a className="wa-float" href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar com a proprietária pelo WhatsApp (abre em nova aba)">
          <WhatsAppIcon width={28} height={28} />
        </a>
      )}
    </>
  )
}
