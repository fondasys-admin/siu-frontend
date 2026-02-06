import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { isLocale, localePath, t, type Locale } from "@/lib/i18n"
import data from "@/data/pages/articles.json"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const title = t(data.title, locale)
  return {
    title: `${title} - Synergis Industrial Utama`,
    description: locale === "id"
      ? "Baca artikel, studi kasus, dan wawasan dari Synergis Industrial Utama."
      : "Read articles, case studies, testimonials and insights from Synergis Industrial Utama.",
  }
}

export default async function ArticlesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const { featured, articles } = data

  return (
    <main className="flex flex-col items-center">
      {/* Title */}
      <section className="max-w-[1600px] w-full px-6 pt-20">
        <h1 className="text-4xl font-bold text-[#3c4043] tracking-tight leading-[41px] capitalize">
          {t(data.title, locale)}
        </h1>
      </section>

      {/* Featured Article */}
      <section className="max-w-[1600px] w-full px-6 pt-20">
        <Link href={localePath(`/articles/${featured.slug}`, locale)} className="bg-[#faf7f5] flex items-center justify-between p-4 group">
          <div className="flex flex-col gap-4 justify-center max-w-[551px]">
            <p className="text-sm text-[#3c4043] leading-[26px]">
              {t(featured.category, locale)}
            </p>
            <h2 className="text-2xl font-bold text-[#3c4043] leading-[27px] capitalize">
              {t(featured.title, locale)}
            </h2>
            <p className="text-base text-[#3c4043] leading-[26px]">
              {t(featured.description, locale)}
            </p>
            <span className="text-[#ff5b00] text-base font-medium leading-[26px] inline-flex items-center">
              {locale === "id" ? "Baca Selengkapnya" : "Read More"} <ChevronRight className="size-5" />
            </span>
          </div>
          <div className="relative w-[551px] h-[288px] shrink-0">
            <Image
              src={featured.image}
              alt={t(featured.title, locale)}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </section>

      {/* Article Grid */}
      <section className="max-w-[1600px] w-full px-6 pt-5 pb-20">
        <div className="flex flex-col gap-5">
          {chunk(articles, 3).map((row, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-3 gap-5">
              {row.map((article) => (
                <ArticleCard key={article.slug} article={article} locale={locale} />
              ))}
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="flex justify-center pt-20">
          <Button variant="secondary" className="bg-[#3c4043] text-white hover:bg-[#3c4043]/90">
            {locale === "id" ? "Lihat Artikel Lainnya" : "View More Articles"}
          </Button>
        </div>
      </section>

      <Separator className="max-w-[1400px] w-full" />
    </main>
  )
}

interface Article {
  category: { en: string; id: string }
  title: { en: string; id: string }
  description: { en: string; id: string }
  image: string
  slug: string
}

function ArticleCard({ article, locale }: { article: Article; locale: Locale }) {
  return (
    <Link href={localePath(`/articles/${article.slug}`, locale)} className="bg-[#faf7f5] flex flex-col pt-4 px-4 pb-6 group">
      <div className="relative w-full h-[224px] mb-6">
        <Image
          src={article.image}
          alt={t(article.title, locale)}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-[#3c4043] leading-[26px]">
          {t(article.category, locale)}
        </p>
        <h3 className="text-2xl font-bold text-[#3c4043] leading-[27px] capitalize">
          {t(article.title, locale)}
        </h3>
        <p className="text-base text-[#3c4043] leading-[26px]">
          {t(article.description, locale)}
        </p>
        <span className="text-[#ff5b00] text-base font-medium leading-[26px] inline-flex items-center">
          {locale === "id" ? "Baca Selengkapnya" : "Read More"} <ChevronRight className="size-5" />
        </span>
      </div>
    </Link>
  )
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}
