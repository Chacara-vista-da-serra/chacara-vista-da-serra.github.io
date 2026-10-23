import { EXPERIENCES, FEATURE_PHOTOS, TEXTS } from '../config/site'
import { SmartImage } from './SmartImage'

export function Experiences() {
  return (
    <section id="experiencias" className="section experiences" aria-labelledby="exp-title">
      <div className="container experiences__grid">
        <figure className="experiences__image" data-reveal>
          <SmartImage file={FEATURE_PHOTOS.experiences} orientation="portrait" alt="Gramado, piscina iluminada e pergolado com luzes ao entardecer" sizes="(max-width: 900px) 100vw, 42vw" />
          <figcaption>Fim de tarde na chácara.</figcaption>
        </figure>

        <div className="experiences__content">
          <div data-reveal>
            <p className="eyebrow eyebrow--light">Experiência</p>
            <h2 id="exp-title" className="display display--light">{TEXTS.experiencesTitle}</h2>
            <p className="experiences__intro">Algumas ideias de como aproveitar o espaço. O formato do seu dia é combinado diretamente com a proprietária.</p>
          </div>

          <ol className="experiences__list">
            {EXPERIENCES.map((exp, i) => (
              <li key={exp.title} data-reveal>
                <span className="experiences__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{exp.title}</h3>
                  <p>{exp.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <a href="#locacao" className="btn btn--light" data-reveal>Consultar condições de locação</a>
        </div>
      </div>
    </section>
  )
}
