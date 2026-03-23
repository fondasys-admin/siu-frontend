'use client'

import { useEffect, useRef } from 'react'

type Direction = 'up' | 'right' | 'left' | 'none'

interface ScrollFadeUpProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  /** Delay in ms before the transition starts */
  delay?: number
  /** Direction the element slides in from */
  direction?: Direction
  /** Custom transition duration in ms */
  duration?: number
  /** IntersectionObserver threshold (0–1) */
  threshold?: number
  /** HTML tag to render */
  as?: 'div' | 'section' | 'header' | 'footer'
}

const directionClass: Record<Direction, string> = {
  up: 'scroll-fade-up',
  right: 'scroll-fade-right',
  left: 'scroll-fade-left',
  none: 'scroll-fade-in',
}

export function ScrollFadeUp({
  children,
  className = '',
  style,
  delay = 0,
  direction = 'up',
  duration,
  threshold = 0.1,
  as: Tag = 'div',
}: ScrollFadeUpProps) {
  const ref = useRef<HTMLElement>(null)

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
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(delay > 0 && { transitionDelay: `${delay}ms` }),
    ...(duration && { transitionDuration: `${duration}ms` }),
  }

  return (
    <Tag ref={ref as React.RefObject<never>} className={`${directionClass[direction]} ${className}`} style={mergedStyle}>
      {children}
    </Tag>
  )
}
