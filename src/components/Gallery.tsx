import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { PHOTOS } from '../config/site'
import { SmartImage } from './SmartImage'

const INITIAL = 10

export function Gallery() {
  const [showAll, setShowAll] = useState(false)
  const [index, setIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const visible = showAll ? PHOTOS : PHOTOS.slice(0, INITIAL)

  const open = (i: number, el: HTMLElement) => {
    triggerRef.current = el
    setIndex(i)
  }

  const step = useCallback((dir: number) => {
    setIndex((i) => (i === null ? i : (i + dir + PHOTOS.length) % PHOTOS.length))
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (index !== null && !dialog.open) dialog.showModal()
    if (index === null && dialog.open) dialog.close()
  }, [index])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  }

  const current = index !== null ? PHOTOS[index] : null

  return (
    <section id="galeria" className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Galeria</p>
          <h2 id="gallery-title" className="display">Cada canto, do jeito que é.</h2>
          <p className="section-head__note">Fotos reais da chácara. Toque em uma imagem para ampliar.</p>
        </div>

        <ul className="gallery__grid">
          {visible.map((photo, i) => (
            <li key={photo.file} className={`gallery__item gallery__item--${photo.orientation} ${i === 0 ? 'gallery__item--feature' : ''}`}>
              <button type="button" onClick={(e) => open(i, e.currentTarget)} aria-label={`Ampliar foto: ${photo.caption}`}>
                <SmartImage file={photo.file} alt={photo.alt} orientation={photo.orientation} sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw" />
                <span className="gallery__caption">{photo.caption}</span>
              </button>
            </li>
          ))}
        </ul>

        {!showAll && PHOTOS.length > INITIAL && (
          <div className="gallery__more">
            <button type="button" className="btn btn--outline" onClick={() => setShowAll(true)}>
              Ver todas as fotos ({PHOTOS.length})
            </button>
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Visualização ampliada da foto"
        onClose={() => {
          setIndex(null)
          triggerRef.current?.focus()
        }}
        onKeyDown={onKeyDown}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
      >
        {current && (
          <div className="lightbox__inner">
            <figure className="lightbox__figure">
              <SmartImage key={current.file} file={current.file} alt={current.alt} orientation={current.orientation} sizes="100vw" priority />
              <figcaption>
                <span>{current.caption}</span>
                <span className="lightbox__count">{(index ?? 0) + 1} / {PHOTOS.length}</span>
              </figcaption>
            </figure>
            <button type="button" className="lightbox__btn lightbox__close" onClick={() => setIndex(null)} aria-label="Fechar">
              <X size={22} aria-hidden="true" />
            </button>
            <button type="button" className="lightbox__btn lightbox__prev" onClick={() => step(-1)} aria-label="Foto anterior">
              <ChevronLeft size={26} aria-hidden="true" />
            </button>
            <button type="button" className="lightbox__btn lightbox__next" onClick={() => step(1)} aria-label="Próxima foto">
              <ChevronRight size={26} aria-hidden="true" />
            </button>
          </div>
        )}
      </dialog>
    </section>
  )
}
