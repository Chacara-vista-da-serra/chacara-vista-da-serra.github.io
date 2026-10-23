import { useState } from 'react'
import { photoSrc } from '../config/site'
import { Mark } from './Brand'

type Props = {
  file: string
  alt: string
  orientation?: 'landscape' | 'portrait'
  sizes?: string
  priority?: boolean
  className?: string
}

/** Foto responsiva com fallback visual caso o arquivo não carregue. */
export function SmartImage({ file, alt, orientation = 'landscape', sizes = '100vw', priority = false, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  const [w, h] = orientation === 'landscape' ? [1600, 1200] : [1200, 1600]

  if (failed) {
    return (
      <span className={`img-fallback ${className}`} role="img" aria-label={alt}>
        <Mark className="img-fallback__mark" />
        <span>Foto indisponível no momento</span>
      </span>
    )
  }

  return (
    <img
      className={className}
      src={photoSrc(file)}
      srcSet={`${photoSrc(file, 'sm')} 800w, ${photoSrc(file)} 1600w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
    />
  )
}
