'use client'

import { useEffect, useRef } from 'react'

interface ScrollFadeUpProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function ScrollFadeUp({ children, className = '', style }: ScrollFadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`scroll-fade-up ${className}`} style={style}>
      {children}
    </div>
  )
}
