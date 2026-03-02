import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { isLocale, localePath, t, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/site"
import { ArticleGrid } from "@/components/article-grid"
import data from "@/data/pages/articles.json"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const title = t(data.title, locale)
  const description = locale === "id"
    ? "Baca artikel, studi kasus, dan wawasan dari Synergis Industrial Utama."
    : "Read articles, case studies, testimonials and insights from Synergis Industrial Utama."
  const currentUrl = `${SITE_URL}${localePath("/articles", locale)}`

  return {
    title: `${title} - Synergis Industrial Utama`,
    description,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/articles`,
        id: `${SITE_URL}/id/articles`,
        "x-default": `${SITE_URL}/articles`,
      },
    },
    openGraph: {
      title: `${title} - Synergis Industrial Utama`,
      description,
      url: currentUrl,
      siteName: "PT Synergis Industrial Utama",
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
    },
    twitter: {
      card: "summary",
      title: `${title} - Synergis Industrial Utama`,
      description,
    },
  }
}

export default async function ArticlesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const allArticles = [...data.articles].reverse()
  const featured = allArticles[0]
  const articles = allArticles.slice(1)

  return (
    <main className="flex flex-col items-center">
      {/* Title */}
      <section className="max-w-[1600px] w-full px-4 sm:px-6 pt-10 sm:pt-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#3c4043] tracking-tight leading-[36px] sm:leading-[41px] capitalize">
          {t(data.title, locale)}
        </h1>
      </section>

      {/* Featured Article */}
      <section className="max-w-[1600px] w-full px-4 sm:px-6 pt-10 sm:pt-20">
        <Link href={localePath(`/articles/${featured.slug}`, locale)} className="bg-[#faf7f5] flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 group">
          <div className="flex flex-col gap-3 sm:gap-4 justify-center sm:max-w-[551px] order-2 sm:order-1">
            <p className="text-sm text-[#3c4043] leading-[22px] sm:leading-[26px]">
              {t(featured.category, locale)}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-[#3c4043] leading-[24px] sm:leading-[27px] capitalize">
              {t(featured.title, locale)}
            </h2>
            <p className="text-sm sm:text-base text-[#3c4043] leading-[22px] sm:leading-[26px]">
              {t(featured.description, locale)}
            </p>
            <span className="text-[#ff5b00] text-sm sm:text-base font-medium leading-[22px] sm:leading-[26px] inline-flex items-center">
              {locale === "id" ? "Baca Selengkapnya" : "Read More"} <ChevronRight className="size-4 sm:size-5" />
            </span>
          </div>
          <div className="relative w-full sm:w-[551px] h-[200px] sm:h-[288px] shrink-0 order-1 sm:order-2 mb-4 sm:mb-0">
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
      <section className="max-w-[1600px] w-full px-4 sm:px-6 pt-5 pb-10 sm:pb-20">
        <ArticleGrid
          articles={articles.map((article) => ({
            category: t(article.category, locale),
            title: t(article.title, locale),
            description: t(article.description, locale),
            image: article.image,
            slug: article.slug,
            href: localePath(`/articles/${article.slug}`, locale),
          }))}
          readMoreLabel={locale === "id" ? "Baca Selengkapnya" : "Read More"}
          viewMoreLabel={locale === "id" ? "Lihat Artikel Lainnya" : "View More Articles"}
        />
      </section>

      <Separator className="max-w-[1400px] w-full" />
    </main>
  )
}

