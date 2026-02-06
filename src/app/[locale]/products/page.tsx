import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/ui/product-card"
import { ScrollFadeUp } from "@/components/ui/scroll-fade-up"
import { productHref } from "@/data/product-registry"
import { t, isLocale, localePath, type Locale } from "@/lib/i18n"
import data from "@/data/pages/products-overview.json"
import { getProductInfo } from "@/data/product-info"
import { BrandCTA } from "@/components/brand-cta"

const SITE_URL = "https://siu-indo.com"

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"

  const title = locale === "id"
    ? "Produk - PT Synergis Utama Indonesia"
    : "Products - PT Synergis Utama Indonesia"
  const description = locale === "id"
    ? "Jelajahi rangkaian mesin laser cutting, mesin las, dan aksesoris industri kami."
    : "Browse our range of laser cutting machines, welding machines, and industrial accessories."
  const canonicalUrl = `${SITE_URL}${localePath("/products", locale)}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/products`,
        id: `${SITE_URL}/id/products`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ProductsOverviewPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t(data.pageTitle, locale),
    url: `${SITE_URL}${localePath("/products", locale)}`,
    numberOfItems: data.bestSelling.length,
    itemListElement: data.bestSelling.map((product, i) => {
      const info = getProductInfo(product.slug, locale)
      return {
        "@type": "ListItem",
        position: i + 1,
        name: info.name,
        url: `${SITE_URL}${localePath(productHref(product.slug), locale)}`,
      }
    }),
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
        name: t(data.pageTitle, locale),
        item: `${SITE_URL}${localePath("/products", locale)}`,
      },
    ],
  }

  const brandsJsonLd = data.brands.map((brand) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: `${SITE_URL}${localePath(`/brands/${brand.slug}`, locale)}`,
    logo: `${SITE_URL}${brand.logo}`,
    description: t(brand.description, locale),
  }))

  return (
    <main className="max-w-[1600px] mx-auto py-10 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {brandsJsonLd.map((brand) => (
        <script
          key={brand.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brand) }}
        />
      ))}
      {/* Page Title */}
      <ScrollFadeUp>
        <h1 className="text-5xl font-bold text-[#3c4043] tracking-[-0.5px] leading-[56px] capitalize">
          {t(data.pageTitle, locale)}
        </h1>
      </ScrollFadeUp>

      <div className="flex flex-col gap-10 pt-10">
        {/* Category Cards */}
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4 sm:gap-[25px]">
          {data.categories.map((category, i) => {
            const bg = (category as { backgroundImage?: string }).backgroundImage
            return (
              <ScrollFadeUp key={category.slug} style={{ transitionDelay: `${i * 100}ms` }}>
                <Link
                  href={localePath(`/products/${category.slug}`, locale)}
                  className={`group rounded-md p-6 flex flex-col gap-1 justify-end h-[240px] overflow-hidden ${
                    bg
                      ? "relative"
                      : "bg-[#faf7f5] hover:bg-[#f5f1ee] transition-colors"
                  }`}
                >
                  {bg && (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${bg})` }}
                      />
                      <div className="absolute inset-0 bg-[#331200]/56" />
                    </>
                  )}
                  <h2 className={`text-lg font-bold leading-[21.6px] relative z-10 ${bg ? "text-white" : "text-[#ff5b00]"}`}>
                    {t(category.title, locale)}
                  </h2>
                  <p className={`text-sm leading-[22.4px] relative z-10 ${bg ? "font-semibold text-white/90" : "font-normal text-[#3c4043]"}`}>
                    {t(category.description, locale)}
                  </p>
                </Link>
              </ScrollFadeUp>
            )
          })}
        </div>

        {/* Best Selling Products */}
        <section className="flex flex-col gap-6">
          <ScrollFadeUp>
            <h2 className="text-2xl font-bold text-[#3c4043] leading-[30px] capitalize">
              {t(data.bestSellingTitle, locale)}
            </h2>
          </ScrollFadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-[25px]">
            {data.bestSelling.map((product, i) => {
              const info = getProductInfo(product.slug, locale)
              return (
                <ScrollFadeUp key={product.slug} style={{ transitionDelay: `${i * 80}ms` }}>
                  <ProductCard
                    name={info.name}
                    description={info.description}
                    image={info.image}
                    href={localePath(productHref(product.slug), locale)}
                  />
                </ScrollFadeUp>
              )
            })}
          </div>
        </section>

        {/* Brands */}
        <section className="flex flex-col gap-6">
          <ScrollFadeUp>
            <h2 className="text-2xl font-bold text-[#3c4043] leading-[30px] capitalize">
              {t(data.brandsTitle, locale)}
            </h2>
          </ScrollFadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-[25px]">
            {data.brands.map((brand, i) => (
              <ScrollFadeUp key={brand.name} style={{ transitionDelay: `${i * 100}ms` }}>
                <Link
                  href={localePath(`/brands/${brand.slug}`, locale)}
                  className="bg-[#faf7f5] rounded-md p-6 flex flex-col justify-between h-[308px] hover:bg-[#f5f1ee] transition-colors"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[#ff5b00] text-lg font-bold leading-[21.6px]">
                      {brand.name}
                    </h3>
                    <p className="text-[#3c4043] text-sm font-normal leading-[22.4px] max-w-[493px] whitespace-pre-line">
                      {t(brand.description, locale)}
                    </p>
                  </div>
                  <div className="relative h-[108px] w-full max-w-[420px] mx-auto">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>
              </ScrollFadeUp>
            ))}
          </div>
        </section>

        {/* CTA */}
        <ScrollFadeUp>
          <BrandCTA locale={locale} />
        </ScrollFadeUp>
      </div>
    </main>
  )
}
