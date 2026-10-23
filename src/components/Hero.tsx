import { FEATURE_PHOTOS, TEXTS, photoSrc } from '../config/site'

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <picture className="hero__media">
        <source media="(max-width: 700px)" srcSet={photoSrc(FEATURE_PHOTOS.heroMobile, 'sm')} />
        <img
          src={photoSrc(FEATURE_PHOTOS.heroDesktop)}
          alt="Piscina com deck de pedra e área coberta da Chácara Vista da Serra"
          width={1280}
          height={960}
          fetchPriority="high"
          decoding="sync"
        />
      </picture>
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__content container">
        <p className="eyebrow eyebrow--light">{TEXTS.heroEyebrow}</p>
        <h1 id="hero-title" className="hero__title">
          Seu próximo momento <em>especial</em> começa aqui.
        </h1>
        <p className="hero__lead">{TEXTS.heroLead}</p>
        <div className="hero__ctas">
          <a href="#a-chacara" className="btn btn--light">Conheça a chácara</a>
          <a href="#locacao" className="btn btn--ghost-light">Consultar uma data</a>
        </div>
      </div>

      <div className="hero__foot container" aria-hidden="true">
        <span>Locação em qualquer dia da semana</span>
        <span className="hero__scroll">Role para conhecer</span>
      </div>

      <svg className="hero__ridge" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 90 L0 62 L160 30 L300 58 L470 12 L640 54 L790 34 L960 66 L1130 22 L1290 52 L1440 36 L1440 90 Z" />
      </svg>
    </section>
  )
}
