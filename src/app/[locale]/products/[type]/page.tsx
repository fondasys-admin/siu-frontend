import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CategoryPage } from "@/components/category-page"
import { findCategory } from "@/data/product-registry"
import { t, isLocale, localePath, type Locale } from "@/lib/i18n"

const SITE_URL = "https://siu-indo.com"

interface PageProps {
  params: Promise<{ locale: string; type: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, type } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const category = findCategory(type)
  if (!category) return { title: "Category Not Found" }

  const title = `${t(category.label, locale)} - PT Synergis Utama Indonesia`
  const description = category.description
    ? t(category.description, locale)
    : `Browse our range of ${t(category.label, "en").toLowerCase()}.`
  const canonicalUrl = `${SITE_URL}/products/${type}`
  const currentUrl = `${SITE_URL}${localePath(`/products/${type}`, locale)}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/products/${type}`,
        id: `${SITE_URL}/id/products/${type}`,
      },
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: "PT Synergis Utama Indonesia",
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  }
}

export default async function TypePage({ params }: PageProps) {
  const { locale: rawLocale, type } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const category = findCategory(type)
  if (!category) notFound()

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "id" ? "Produk" : "Products",
        item: `${SITE_URL}${localePath("/products", locale)}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t(category.label, locale),
        item: `${SITE_URL}${localePath(`/products/${type}`, locale)}`,
      },
    ],
  }

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t(category.label, locale),
    description: category.description ? t(category.description, locale) : undefined,
    url: `${SITE_URL}${localePath(`/products/${type}`, locale)}`,
    isPartOf: {
      "@type": "WebSite",
      name: "PT Synergis Utama Indonesia",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: category.subCategories.length,
      itemListElement: category.subCategories.map((sub, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t(sub.label, locale),
        url: `${SITE_URL}${localePath(`/products/${type}/${sub.slug}`, locale)}`,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <CategoryPage category={category} locale={locale} />
    </>
  )
}
