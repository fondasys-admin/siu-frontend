import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProductCard } from "@/components/ui/product-card"
import { BrandCTA } from "@/components/brand-cta"
import { productHref } from "@/data/product-registry"
import { t, isLocale, localePath, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/site"
import brandsData from "@/data/pages/brands.json"

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

type BrandKey = keyof typeof brandsData.brands

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const brand = brandsData.brands[slug as BrandKey]

  if (!brand) return { title: "Brand Not Found" }

  const title = `${brand.name} Products - PT Synergis Utama Indonesia`
  const description = t(brand.description, locale)
  const canonicalUrl = `${SITE_URL}/brands/${slug}`
  const currentUrl = `${SITE_URL}${localePath(`/brands/${slug}`, locale)}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/brands/${slug}`,
        id: `${SITE_URL}/id/brands/${slug}`,
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

export default async function BrandPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const brand = brandsData.brands[slug as BrandKey]

  if (!brand) notFound()

  return (
    <main className="max-w-[1200px] mx-auto py-20 flex flex-col gap-10">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={localePath("/products", locale)}>{locale === "id" ? "Merek" : "Brands"}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{brand.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Brand Name */}
      <h1 className="sr-only">{brand.name} - {locale === "id" ? "Produk & Solusi" : "Products & Solutions"}</h1>

      {/* Brand Info */}
      <section className="flex gap-10 items-center pb-10">
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            width={418}
            height={137}
            className="object-contain"
          />
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <p className="text-sm text-[#3c4043] leading-[22.4px]">
            {t(brand.description, locale)}
          </p>
          {brand.stats.length > 0 && (
            <div className="flex">
              {brand.stats.map((stat) => (
                <div key={t(stat.label, "en")} className="flex flex-col gap-2 w-[248px]">
                  <span className="text-base text-[#5e6166] uppercase">
                    {t(stat.label, locale)}
                  </span>
                  <span className="text-2xl font-medium text-[#ff5b00] capitalize">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products */}
      <h2 className="text-4xl font-bold text-[#3c4043] leading-10">
        {locale === "id" ? "Produk" : "Products"}
      </h2>

      <div className="flex flex-col gap-12 pb-20">
        {brand.productCategories.map((category) => (
          <section key={t(category.title, "en")} className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold text-[#3c4043] leading-[30px] capitalize">
              {t(category.title, locale)}
            </h3>
            <div className="grid grid-cols-3 gap-[25px]">
              {category.products.map((product) => (
                <ProductCard
                  key={product.slug}
                  name={product.name}
                  description={t(product.description, locale)}
                  image={product.image}
                  href={localePath(productHref(product.slug), locale)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <BrandCTA locale={locale} />
    </main>
  )
}
