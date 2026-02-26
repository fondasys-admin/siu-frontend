import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { isLocale, localePath, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/site"
import { getArticle, getAllArticleSlugs } from "@/data/article-registry"
import { parseMarkdown, collectFaq, renderInline, type Block } from "@/lib/parse-markdown"
import { ArticleTable } from "@/components/article-table"
import { ArticleChecklist } from "@/components/article-checklist"
import { ArticleFaq } from "@/components/article-faq"
import { ArticleProductShowcase } from "@/components/article-product-showcase"
import { ArticleCta } from "@/components/article-cta"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const article = getArticle(slug, locale)
  if (!article) return {}

  const title = `${article.title} - Synergis Industrial Utama`
  const description = article.description
  const currentUrl = `${SITE_URL}${localePath(`/articles/${slug}`, locale)}`

  return {
    title,
    description,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/articles/${slug}`,
        id: `${SITE_URL}/id/articles/${slug}`,
        "x-default": `${SITE_URL}/articles/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: "PT Synergis Utama Indonesia",
      type: "article",
      locale: locale === "id" ? "id_ID" : "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const article = getArticle(slug, locale)

  if (!article) notFound()

  const blocks = collectFaq(parseMarkdown(article.content))

  // Split: first paragraph becomes intro, rest are content blocks
  const introBlock = blocks.find((b) => b.type === "paragraph")
  const contentBlocks = introBlock ? blocks.slice(blocks.indexOf(introBlock) + 1) : blocks

  const categoryLabel = article.category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())

  const articleUrl = `${SITE_URL}${localePath(`/articles/${slug}`, locale)}`

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image.startsWith("http")
      ? article.image
      : `${SITE_URL}${article.image}`,
    url: articleUrl,
    author: {
      "@type": "Organization",
      name: "PT Synergis Utama Indonesia",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PT Synergis Utama Indonesia",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: categoryLabel,
    inLanguage: locale === "id" ? "id-ID" : "en-US",
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "id" ? "Beranda" : "Home",
        item: `${SITE_URL}${localePath("/", locale)}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "id" ? "Artikel" : "Articles",
        item: `${SITE_URL}${localePath("/articles", locale)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <main className="flex flex-col items-center pb-20">
      {/* Hero Image */}
      <div className="w-[1400px] max-w-full h-[437px] relative">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Breadcrumbs + Intro */}
      <section className="max-w-[800px] w-full flex flex-col gap-4 px-6 mt-12">
        <Breadcrumb className="pb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={localePath("/", locale)}>
                  {locale === "id" ? "Beranda" : "Home"}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={localePath("/articles", locale)}>
                  {locale === "id" ? "Artikel" : "Articles"}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{article.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <p className="text-sm text-[#3c4043] leading-[26px] capitalize">
          {categoryLabel}
        </p>
        <h1 className="text-4xl font-bold tracking-[-0.5px] leading-[41px] text-[#3c4043]">
          {article.title}
        </h1>
        {introBlock && (
          <p className="text-base leading-[26px] text-[#3c4043]">
            {renderInline(introBlock.text)}
          </p>
        )}
      </section>

      {/* Content blocks */}
      <div className="max-w-[800px] w-full flex flex-col gap-4 px-6 mt-6">
        {contentBlocks.map((block, i) => (
          <BlockRenderer
            key={i}
            block={block}
            productShowcase={article.productShowcase}
            locale={locale}
          />
        ))}
      </div>

      {article.cta && (
        <div className="w-full px-6">
          <ArticleCta
            heading={article.cta.heading}
            whatsappLabel={article.cta.whatsappLabel}
            whatsappUrl={article.cta.whatsappUrl}
            contactLabel={article.cta.contactLabel}
            contactHref={localePath(article.cta.contactHref, locale)}
          />
        </div>
      )}
    </main>
    </>
  )
}

interface BlockRendererProps {
  block: Block
  productShowcase?: {
    image: string
    title: string
    subtitle: string
    points: string[]
    buttonLabel: string
    href: string
  }
  locale: Locale
}

function BlockRenderer({ block, productShowcase, locale }: BlockRendererProps) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base leading-[26px] text-[#3c4043]">
          {renderInline(block.text)}
        </p>
      )
    case "heading":
      if (block.level === 2) {
        return (
          <h2 className="mt-8 text-4xl font-bold tracking-[-0.5px] leading-[41px] text-[#3c4043]">
            {block.text}
          </h2>
        )
      }
      return (
        <h3 className="mt-4 text-2xl font-bold leading-[27px] text-[#3c4043]">
          {block.text}
        </h3>
      )
    case "list":
      return (
        <ul className="list-disc pl-6 flex flex-col gap-2 text-base leading-[26px] text-[#3c4043]">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      )
    case "checklist":
      return <ArticleChecklist items={block.items} />
    case "table":
      return <ArticleTable headers={block.headers} rows={block.rows} />
    case "faq":
      return <ArticleFaq items={block.items} />
    case "product-showcase":
      if (!productShowcase) return null
      return (
        <ArticleProductShowcase
          image={productShowcase.image}
          title={productShowcase.title}
          subtitle={productShowcase.subtitle}
          points={productShowcase.points}
          buttonLabel={productShowcase.buttonLabel}
          href={localePath(productShowcase.href, locale)}
        />
      )
  }
}
