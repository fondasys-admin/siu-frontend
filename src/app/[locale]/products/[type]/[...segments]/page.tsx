import React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Zap } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProductSidebar, MobileQuoteBar } from "@/components/product-sidebar"
import { BrandCTA } from "@/components/brand-cta"
import { ContactForm } from "@/components/contact-form"
import { SubCategoryPage } from "@/components/sub-category-page"
import { findProduct, findSubCategory, productPath, productHref, type ProductEntry } from "@/data/product-registry"
import { getProductInfo } from "@/data/product-info"
import { t, localePath, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/site"

import pSeries from "@/data/products/p-series.json"
import aSeries from "@/data/products/a-series.json"
import atSeries from "@/data/products/at-series.json"
import cSeries from "@/data/products/c-series.json"
import ctSeries from "@/data/products/ct-series.json"
import gSeries from "@/data/products/g-series.json"
import hSeries from "@/data/products/h-series.json"
import iSeries from "@/data/products/i-series.json"
import kSeries from "@/data/products/k-series.json"
import q0ProSeries from "@/data/products/q0-pro-series.json"
import tSeries from "@/data/products/t-series.json"
import iloaderEco from "@/data/products/iloader-eco.json"
import iloader from "@/data/products/iloader.json"
import kLoader from "@/data/products/k-loader.json"
import kLoaderPro from "@/data/products/k-loader-pro.json"
import mLoader from "@/data/products/m-loader.json"
import tLoader from "@/data/products/t-loader.json"
import dex2MSeries from "@/data/products/dex2-m-series.json"
import ehave2CmSeries from "@/data/products/ehave2-cm-series.json"
import luxSeries from "@/data/products/lux-series.json"
import metatigAcdcSeries from "@/data/products/metatig-acdc-series.json"
import metatigDcSeries from "@/data/products/metatig-dc-series.json"
import saSeries from "@/data/products/sa-series.json"
import stSeries from "@/data/products/st-series.json"
import smarc from "@/data/products/smarc.json"

interface ProductData {
  title: string
  brand?: string
  media?: { type: string; url: string }
  description: { en: string; id: string }
  banSubtitle: { en: string; id: string }
  banDescription: { en: string; id: string }
  highlights?: Array<{
    title: { en: string; id: string }
    content: { en: string; id: string }
    icon?: string
  }>
  body: Array<{
    title: { en: string; id?: string }
    content: { en: string; id?: string }
    media?: { type: string; url: string }
    blockType?: string
    hero?: Record<string, unknown>
  }>
  specs?: Array<{
    title: string
    data: Array<{ dTitle: string; dValue: string }>
  }>
}

const productFiles: Record<string, ProductData> = {
  "p-series": pSeries as unknown as ProductData,
  "a-series": aSeries as unknown as ProductData,
  "at-series": atSeries as unknown as ProductData,
  "c-series": cSeries as unknown as ProductData,
  "ct-series": ctSeries as unknown as ProductData,
  "g-series": gSeries as unknown as ProductData,
  "h-series": hSeries as unknown as ProductData,
  "i-series": iSeries as unknown as ProductData,
  "k-series": kSeries as unknown as ProductData,
  "q0-pro-series": q0ProSeries as unknown as ProductData,
  "t-series": tSeries as unknown as ProductData,
  "iloader-eco": iloaderEco as unknown as ProductData,
  "iloader": iloader as unknown as ProductData,
  "k-loader": kLoader as unknown as ProductData,
  "k-loader-pro": kLoaderPro as unknown as ProductData,
  "m-loader": mLoader as unknown as ProductData,
  "t-loader": tLoader as unknown as ProductData,
  "dex2-m-series": dex2MSeries as unknown as ProductData,
  "ehave2-cm-series": ehave2CmSeries as unknown as ProductData,
  "lux-series": luxSeries as unknown as ProductData,
  "metatig-acdc-series": metatigAcdcSeries as unknown as ProductData,
  "metatig-dc-series": metatigDcSeries as unknown as ProductData,
  "sa-series": saSeries as unknown as ProductData,
  "st-series": stSeries as unknown as ProductData,
  "smarc": smarc as unknown as ProductData,
}

function getProductData(slug: string): ProductData | null {
  return productFiles[slug] ?? null
}

interface PageProps {
  params: Promise<{ locale: Locale; type: string; segments: string[] }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, type, segments } = await params

  // Subcategory page
  const subMatch = findSubCategory(type, segments)
  if (subMatch) {
    const title = `${t(subMatch.subCategory.label, locale)} - PT Synergis Industrial Utama`
    const description = subMatch.subCategory.description
      ? t(subMatch.subCategory.description, locale)
      : `Browse our range of ${t(subMatch.subCategory.label, "en").toLowerCase()}.`
    const subPath = `/products/${type}/${segments.join("/")}`
    const currentUrl = `${SITE_URL}${localePath(subPath, locale)}`

    return {
      title,
      description,
      alternates: {
        canonical: currentUrl,
        languages: {
          en: `${SITE_URL}${subPath}`,
          id: `${SITE_URL}/id${subPath}`,
          "x-default": `${SITE_URL}${subPath}`,
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

  // Product detail page
  const entry = findProduct(type, segments)
  if (!entry) return { title: "Product Not Found" }

  const data = getProductData(entry.slug)
  if (!data) return { title: "Product Not Found" }

  const title = `${data.title} - PT Synergis Industrial Utama`
  const description = t(data.description, locale)
  const currentUrl = `${SITE_URL}${localePath(productPath(entry), locale)}`
  const imageUrl = data.media?.url
    ? data.media.url.startsWith("http")
      ? data.media.url
      : `${SITE_URL}${data.media.url}`
    : undefined

  return {
    title,
    description,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}${productPath(entry)}`,
        id: `${SITE_URL}/id${productPath(entry)}`,
        "x-default": `${SITE_URL}${productPath(entry)}`,
      },
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: "PT Synergis Industrial Utama",
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      ...(imageUrl && {
        images: [{ url: imageUrl, alt: data.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, type, segments } = await params

  // Subcategory page
  const subMatch = findSubCategory(type, segments)
  if (subMatch) {
    const subPath = `/products/${type}/${segments.join("/")}`
    const subCanonicalUrl = `${SITE_URL}${localePath(subPath, locale)}`

    const subBreadcrumbJsonLd = {
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
          name: t(subMatch.category.label, locale),
          item: `${SITE_URL}${localePath(`/products/${type}`, locale)}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: t(subMatch.subCategory.label, locale),
          item: subCanonicalUrl,
        },
      ],
    }

    const subCollectionJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: t(subMatch.subCategory.label, locale),
      description: subMatch.subCategory.description ? t(subMatch.subCategory.description, locale) : undefined,
      url: subCanonicalUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "PT Synergis Industrial Utama",
        url: SITE_URL,
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: subMatch.subCategory.productSlugs.length,
        itemListElement: subMatch.subCategory.productSlugs.map((slug, i) => {
          const info = getProductInfo(slug, locale)
          const prodData = getProductData(slug)
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
                name: prodData?.brand ?? "Bodor",
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
      },
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(subBreadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(subCollectionJsonLd) }}
        />
        <SubCategoryPage category={subMatch.category} subCategory={subMatch.subCategory} locale={locale} />
      </>
    )
  }

  // Product detail page
  const entry = findProduct(type, segments)
  if (!entry) notFound()

  const data = getProductData(entry.slug)
  if (!data) notFound()

  const highlights = data.highlights ?? []
  const features = data.body.filter((b) => !b.blockType && b.content?.en)
  const specs = (data.specs ?? []).filter((s) => s.data && s.data.length > 0)
  const canonicalUrl = `${SITE_URL}${localePath(productPath(entry), locale)}`
  const imageUrl = data.media?.url
    ? data.media.url.startsWith("http")
      ? data.media.url
      : `${SITE_URL}${data.media.url}`
    : undefined

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.title,
    description: t(data.description, locale),
    ...(imageUrl && { image: imageUrl }),
    url: canonicalUrl,
    brand: {
      "@type": "Brand",
      name: data.brand ?? "Bodor",
    },
    manufacturer: {
      "@type": "Organization",
      name: "PT Synergis Industrial Utama",
      url: SITE_URL,
    },
    ...(specs.length > 0 && {
      additionalProperty: specs[0].data.slice(0, 6).map((spec) => ({
        "@type": "PropertyValue",
        name: spec.dTitle.trim(),
        value: spec.dValue,
      })),
    }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "11",
    },
  }

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
      ...entry.categories.map((cat, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: t(cat.label, locale),
        item: `${SITE_URL}${localePath(`/products/${entry.categories.slice(0, i + 1).map((c) => c.slug).join("/")}`, locale)}`,
      })),
      {
        "@type": "ListItem",
        position: entry.categories.length + 2,
        name: data.title,
        item: canonicalUrl,
      },
    ],
  }

  return (
    <main className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero Banner */}
      <section className="relative w-full">
        <div className="relative max-lg:h-auto h-[880px] w-full bg-[#f5f5f5] overflow-hidden">
          <div className="max-w-[1400px] mx-auto flex flex-col items-center justify-center pt-[104px] max-lg:pt-16 max-lg:px-5 text-center relative z-10">
            <p className="text-base font-bold text-[#3c4043] leading-6">
              {t(data.banSubtitle, locale)}
            </p>
            <h1 className="text-[60px] max-lg:text-[32px] font-bold text-[#ff5b00] capitalize tracking-tight leading-[68px] max-lg:leading-[38px] mt-4">
              {data.title}
            </h1>
            <p className="text-base text-[#3c4043] leading-6 max-w-[1144px] mt-4 text-center max-lg:hidden">
              {t(data.banDescription, locale)}
            </p>
          </div>

          {data.media?.url && (
            <div className="relative max-w-[600px] max-lg:max-w-[300px] h-[400px] max-lg:h-[240px] mx-auto z-10 -mt-4">
              <Image
                src={data.media.url}
                alt={data.title}
                fill
                sizes="(max-width: 1024px) 300px, 600px"
                quality={90}
                className="object-contain"
              />
            </div>
          )}

          {highlights.length > 0 && (
          <div className="max-w-[1400px] mx-auto bg-[#faf7f5] rounded-md px-20 max-lg:px-5 py-8 max-lg:py-5 flex max-lg:flex-col justify-between gap-8 max-lg:gap-4 relative z-10 max-lg:mx-4">
            {highlights.slice(0, 3).map((highlight) => (
              <div key={t(highlight.title, locale)} className="flex flex-col gap-2 flex-1 max-w-[378px] max-lg:max-w-full">
                <div className="size-7 rounded-lg flex items-center justify-center">
                  <Zap className="size-7 text-[#ff5b00]" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-bold text-[#ff5b00] leading-6">
                    {t(highlight.title, locale)}
                  </h4>
                  <p className="text-base text-[#3c4043] leading-6 max-lg:hidden">
                    {t(highlight.content, locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </section>

      {/* Features & Enhancements + Sidebar */}
      <section className="max-w-[1200px] mx-auto w-full py-20 max-lg:py-10 px-6">
        <div className="flex flex-col gap-2 pb-7">
          <Breadcrumbs entry={entry} productTitle={data.title} locale={locale} />
          <h2 className="text-[40px] max-lg:text-2xl font-semibold text-[#3c4043] tracking-tight leading-[46px] max-lg:leading-[30px]">
            Features &amp; Enhancements
          </h2>
        </div>

        <div className="flex gap-8 items-start">
          <div className="flex-1 flex flex-col gap-7 max-lg:gap-4">
            {features.map((feature) => (
              <article key={t(feature.title, locale)} className="flex flex-col gap-4 max-lg:gap-3 mb-8 max-lg:mb-4">
                <div className="relative w-full aspect-video bg-[#e8e8e8] rounded overflow-hidden">
                  {feature.media?.url && (
                    <img
                      src={feature.media.url}
                      alt={t(feature.title, locale)}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-4 max-lg:gap-2">
                  <h4 className="text-[28px] max-lg:text-xl font-semibold text-[#ff5b00] leading-8 max-lg:leading-6 tracking-tight">
                    {t(feature.title, locale)}
                  </h4>
                  <p className="text-base max-lg:text-sm text-[#3c4043] leading-[25.6px] max-lg:leading-[22px]">
                    {t(feature.content, locale)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {specs.length > 0 && (
            <ProductSidebar
              productTitle={data.title}
              description={t(data.description, locale)}
              specs={specs}
            />
          )}
        </div>
      </section>

      {/* Specifications & Parameters */}
      {specs.length > 0 && (
        <section className="max-w-[1600px] mx-auto w-full py-10 px-6">
          <Separator className="mb-10 max-lg:mb-6" />
          <h2 className="text-[40px] max-lg:text-2xl font-semibold text-[#3c4043] capitalize tracking-tight leading-[46px] max-lg:leading-[30px] mb-4">
            Specifications &amp; parameters
          </h2>

          <Tabs defaultValue={specs[0].title}>
            <TabsList variant="underline" className="justify-start w-full mb-8 max-lg:mb-4 max-lg:overflow-x-auto max-lg:flex-nowrap">
              {specs.map((spec) => (
                <TabsTrigger key={spec.title} value={spec.title} className="max-lg:text-sm max-lg:shrink-0">
                  {spec.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {specs.map((spec) => (
              <TabsContent key={spec.title} value={spec.title}>
                <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-x-16 gap-y-6 max-lg:gap-y-4">
                  {spec.data.map((row) => (
                    <div key={row.dTitle} className="flex flex-col gap-1">
                      <span className="text-sm text-[#5e6166]">{row.dTitle.trim()}</span>
                      <span className="text-base font-medium text-[#3c4043]">{row.dValue}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      )}

      {/* Request for Samples */}
      <section className="max-w-[1600px] mx-auto w-full py-20 max-lg:py-10 px-6">
        <Separator className="mb-10 max-lg:mb-6" />
        <ContactForm
          title="Request For Samples"
          description="Fill out the form below to get customized laser cutting samples and professional service support from our regional sales managers."
        />
      </section>

      {/* CTA */}
      <section className="max-w-[1600px] mx-auto w-full pb-20 max-lg:pb-24 px-6">
        <BrandCTA locale={locale} />
      </section>

      {/* Mobile sticky quote button */}
      <MobileQuoteBar productTitle={data.title} />
    </main>
  )
}

function Breadcrumbs({ entry, productTitle, locale }: { entry: ProductEntry; productTitle: string; locale: Locale }) {
  let href = "/products"

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={localePath("/products", locale)}>{locale === "id" ? "Produk" : "Products"}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {entry.categories.map((cat) => {
          href += `/${cat.slug}`
          return (
            <React.Fragment key={cat.slug}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={localePath(href, locale)}>{t(cat.label, locale)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{productTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
