import { AMENITIES, FEATURE_PHOTOS, TEXTS } from '../config/site'
import { SmartImage } from './SmartImage'

export function About() {
  return (
    <section id="a-chacara" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__text" data-reveal>
          <p className="eyebrow">A Chácara</p>
          <h2 id="about-title" className="display">{TEXTS.aboutTitle}</h2>
          {TEXTS.aboutParagraphs.map((p) => <p key={p} className="lead">{p}</p>)}
          <a href="#galeria" className="text-link">Ver as fotos do espaço</a>
        </div>

        <div className="about__images" data-reveal>
          <figure className="about__main">
            <SmartImage file={FEATURE_PHOTOS.aboutMain} orientation="portrait" alt="Varanda de madeira com vista para a piscina e para a serra" sizes="(max-width: 900px) 80vw, 34vw" />
            <figcaption>Da varanda, a vista que dá nome à chácara.</figcaption>
          </figure>
          <figure className="about__secondary">
            <SmartImage file={FEATURE_PHOTOS.aboutSecondary} orientation="portrait" alt="Casa principal vista do campo, com árvore florida" sizes="(max-width: 900px) 50vw, 22vw" />
            <figcaption>A casa vista do campo.</figcaption>
          </figure>
        </div>
      </div>

      <div className="container amenities" data-reveal>
        <div className="amenities__head">
          <h3 className="amenities__title">Estrutura do espaço</h3>
          <p>O que você vê nas fotos. Detalhes e condições de uso são confirmados no atendimento.</p>
        </div>
        <ul className="amenities__list">
          {AMENITIES.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </div>
    </section>
  )
}
