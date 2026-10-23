import { FAQ } from '../config/site'

export function Faq() {
  return (
    <section id="duvidas" className="section faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div data-reveal>
          <p className="eyebrow">Dúvidas frequentes</p>
          <h2 id="faq-title" className="display">Antes de escolher a sua data.</h2>
        </div>
        <div className="faq__list" data-reveal>
          {FAQ.map((item) => (
            <details key={item.q} className="faq__item">
              <summary>
                <span>{item.q}</span>
                <i className="faq__icon" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
