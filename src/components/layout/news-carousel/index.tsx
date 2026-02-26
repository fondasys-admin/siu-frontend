'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import posthog from 'posthog-js'

interface NewsItem {
  id: string
  category: string
  title: string
  tag: string
  image: string
  description: string
  link: string
}

interface NewsCarouselProps {
  items: NewsItem[]
}

export default function NewsCarousel({ items }: NewsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const scrollToActive = useCallback((index: number) => {
    const el = itemRefs.current[index]
    if (!el) return
    const container = el.parentElement
    if (!container) return
    const scrollLeft = el.offsetLeft - container.offsetLeft - (container.clientWidth - el.offsetWidth) / 2
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => {
        const next = (i + 1) % items.length
        scrollToActive(next)
        return next
      })
      setAnimKey((k) => k + 1)
    }, 5000)
    return () => clearInterval(timer)
  }, [items.length, resetKey, scrollToActive])

  const handleNewsItemClick = (index: number) => {
    const item = items[index]
    posthog.capture('news_carousel_item_clicked', {
      news_id: item.id,
      news_title: item.title,
      news_category: item.category,
      slide_index: index,
    })
    setActiveIndex(index)
    setAnimKey((k) => k + 1)
    setResetKey((k) => k + 1)
    scrollToActive(index)
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    const next = direction === 'left'
      ? (activeIndex + 1) % items.length
      : (activeIndex - 1 + items.length) % items.length
    setActiveIndex(next)
    setAnimKey((k) => k + 1)
    setResetKey((k) => k + 1)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      handleSwipe(diff > 0 ? 'left' : 'right')
    }
  }

  const activeItem = items[activeIndex]

  return (
    <div className="flex flex-col lg:flex-row gap-7 w-full mx-auto overflow-hidden">
      {/* Carousel Slide */}
      <div
        className="w-full lg:flex-1 relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-sm overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={activeItem.image}
          alt={activeItem.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#331200]/48" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div key={animKey} className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col gap-2 sm:gap-4">
            <div>
              <div className="animate-fade-up text-[#FF5B00] text-sm sm:text-base font-bold leading-6" style={{ animationDelay: '0ms' }}>
                {activeItem.tag}
              </div>
              <h2 className="animate-fade-up text-white text-2xl sm:text-4xl md:text-5xl font-bold leading-tight  tracking-[-0.5px] capitalize" style={{ animationDelay: '80ms' }}>
                {activeItem.title}
              </h2>
            </div>
            <p className="animate-fade-up text-white text-sm sm:text-base leading-6" style={{ animationDelay: '160ms' }}>
              {activeItem.description}
            </p>
          </div>
          <a
            href={activeItem.link}
            className="animate-fade-up bg-white text-[#3C4043] text-sm capitalize px-6 py-2 rounded inline-flex items-center justify-center w-fit hover:bg-gray-100 transition-colors"
            style={{ animationDelay: '240ms' }}
            onClick={() => posthog.capture('news_carousel_cta_clicked', {
              news_id: activeItem.id,
              news_title: activeItem.title,
              news_link: activeItem.link,
            })}
          >
            Learn More
          </a>
        </div>

        {/* Timer progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20">
          <div
            key={animKey}
            className="h-full bg-[#FF5B00] animate-slide-timer"
          />
        </div>
      </div>

      {/* Latest News List - hidden below sm, horizontal below md, vertical on md+ */}
      <div className="max-sm:hidden lg:w-[271px] flex flex-col gap-4 shrink-0">
        <h3 className="text-[#3C4043] text-2xl font-bold capitalize leading-[27.36px] max-lg:hidden">
          Latest News
        </h3>

        <div className="flex lg:gap-4">
          {/* Progress Indicator - vertical, lg+ only */}
          <div className="max-lg:hidden w-[4px] relative">
            <div className="absolute inset-0 bg-gray-200 rounded-full" />
            <div
              className="absolute top-0 left-0 w-full bg-[#FF5B00] rounded-full transition-all duration-300 ease-in-out"
              style={{
                height: `${((activeIndex + 1) / items.length) * 100}%`,
              }}
            />
          </div>

          {/* News Items */}
          <div className="flex-1 flex max-lg:flex-row max-lg:overflow-x-auto max-lg:gap-6 lg:flex-col lg:gap-6 py-3 max-lg:scroll-smooth">
            {items.map((item, index) => (
              <button
                key={item.id}
                ref={(el) => { itemRefs.current[index] = el }}
                onClick={() => handleNewsItemClick(index)}
                className={`flex flex-col items-start text-left transition-all duration-500 max-lg:shrink-0 max-lg:min-w-[180px] ${
                  index === activeIndex ? 'text-[#FF5B00]' : 'text-[#9e9e9e] hover:text-[#3C4043]'
                }`}
              >
                <div>
                  <div className="text-sm capitalize leading-[14px]">
                    {item.category}
                  </div>
                  <div className="text-base font-bold leading-[1.14rem]">
                    {item.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
