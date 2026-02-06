import Link from "next/link"
import { Zap } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProductCard } from "@/components/ui/product-card"
import { ScrollFadeUp } from "@/components/ui/scroll-fade-up"
import {
  type CategoryEntry,
  type SubCategory,
  productHref,
} from "@/data/product-registry"
import { t, localePath, type Locale } from "@/lib/i18n"
import { getProductInfo } from "@/data/product-info"
import { BrandCTA } from "@/components/brand-cta"

export function CategoryPage({ category, locale }: { category: CategoryEntry; locale: Locale }) {
  return (
    <main className="max-w-[1600px] mx-auto w-full py-20 max-lg:py-10 px-6 flex flex-col gap-10 max-lg:gap-6">
      {/* Title + Breadcrumbs */}
      <ScrollFadeUp>
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl max-lg:text-3xl font-bold text-[#3c4043] capitalize tracking-tight leading-[56px] max-lg:leading-[40px]">
            {t(category.label, locale)}
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={localePath("/products", locale)}>{locale === "id" ? "Produk" : "Products"}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t(category.label, locale)}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </ScrollFadeUp>

      {/* Sub-category filter bar */}
      <ScrollFadeUp style={{ transitionDelay: "100ms" }}>
        <div className="bg-[#faf7f5] flex items-center justify-center gap-8 max-lg:gap-4 py-6 max-lg:py-4 rounded-md w-full max-lg:flex-wrap max-lg:px-4">
          {category.subCategories.map((sub) => (
            <Link
              key={sub.slug}
              href={localePath(`/products/${category.slug}/${sub.slug}`, locale)}
              className="flex flex-col gap-2 items-center w-[216px] max-lg:w-[calc(50%-0.5rem)] h-16 text-center"
            >
              <Zap className="size-7 max-lg:size-5 text-[#3c4043]" />
              <span className="text-sm text-[#3c4043] capitalize leading-[14px]">
                {t(sub.label, locale)}
              </span>
            </Link>
          ))}
        </div>
      </ScrollFadeUp>

      {/* Category description */}
      {category.description && (
        <ScrollFadeUp style={{ transitionDelay: "150ms" }}>
          <p className="text-base text-[#5f6368] leading-7">
            {t(category.description, locale)}
          </p>
        </ScrollFadeUp>
      )}

      {/* Sub-category sections */}
      {category.subCategories.map((sub, i) => (
        <SubCategorySection key={sub.slug} sub={sub} categorySlug={category.slug} locale={locale} index={i} />
      ))}

      {/* CTA */}
      <ScrollFadeUp>
        <BrandCTA locale={locale} />
      </ScrollFadeUp>
    </main>
  )
}

function SubCategorySection({
  sub,
  categorySlug,
  locale,
  index,
}: {
  sub: SubCategory
  categorySlug: string
  locale: Locale
  index: number
}) {
  const cols = sub.productSlugs.length <= 2 ? "grid-cols-2" : "grid-cols-3"

  return (
    <section id={sub.slug} className="flex flex-col gap-6 scroll-mt-20">
      <ScrollFadeUp style={{ transitionDelay: `${(index + 2) * 100}ms` }}>
        <h2 className="text-2xl max-lg:text-xl font-bold text-[#3c4043] leading-[30px] capitalize">
          {t(sub.label, locale)}
        </h2>
      </ScrollFadeUp>
      <div className={`grid ${cols} max-lg:grid-cols-1 sm:max-lg:grid-cols-2 gap-[25px] max-lg:gap-4`}>
        {sub.productSlugs.map((slug, i) => {
          const product = getProductInfo(slug, locale)
          return (
            <ScrollFadeUp key={slug} style={{ transitionDelay: `${i * 80}ms` }}>
              <ProductCard
                name={product.name}
                description={product.description}
                image={product.image}
                href={localePath(productHref(slug), locale)}
              />
            </ScrollFadeUp>
          )
        })}
      </div>
    </section>
  )
}
