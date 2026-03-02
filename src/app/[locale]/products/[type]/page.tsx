import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CategoryPage } from "@/components/category-page"
import { findCategory, productHref } from "@/data/product-registry"
import { getProductInfo, getProductBrand } from "@/data/product-info"
import { t, isLocale, localePath, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/site"

interface PageProps {
  params: Promise<{ locale: string; type: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, type } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const category = findCategory(type)
  if (!category) return { title: "Category Not Found" }

  const title = `${t(category.label, locale)} - PT Synergis Industrial Utama`
  const description = category.description
    ? t(category.description, locale)
    : `Browse our range of ${t(category.label, "en").toLowerCase()}.`
  const currentUrl = `${SITE_URL}${localePath(`/products/${type}`, locale)}`

  return {
    title,
    description,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/products/${type}`,
        id: `${SITE_URL}/id/products/${type}`,
        "x-default": `${SITE_URL}/products/${type}`,
      },
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: "PT Synergis Industrial Utama",
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
      name: "PT Synergis Industrial Utama",
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

  const allProductSlugs = category.subCategories.flatMap((sub) => sub.productSlugs)
  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: allProductSlugs.length,
    itemListElement: allProductSlugs.map((slug, i) => {
      const info = getProductInfo(slug, locale)
      const prodUrl = `${SITE_URL}${localePath(productHref(slug), locale)}`
      const imageUrl = info.image.startsWith("http") ? info.image : `${SITE_URL}${info.image}`
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: info.name,
          description: info.description,
          image: imageUrl,
          url: prodUrl,
          brand: {
            "@type": "Brand",
            name: getProductBrand(slug),
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            bestRating: "5",
            worstRating: "1",
            reviewCount: "11",
          },
        },
      }
    }),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />
      <CategoryPage category={category} locale={locale} />
    </>
  )
}
