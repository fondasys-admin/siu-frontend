import NewsCarousel from '@/components/layout/news-carousel'
import { newsItems } from '@/data/news-carousel-demo'

export default function NewsCarouselDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">News Carousel Demo</h1>
        <NewsCarousel items={newsItems} />
      </div>
    </div>
  )
}
