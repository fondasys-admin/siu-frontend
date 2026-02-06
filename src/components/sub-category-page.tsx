import Link from "next/link"
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

export function SubCategoryPage({
  category,
  subCategory,
  locale,
}: {
  category: CategoryEntry
  subCategory: SubCategory
  locale: Locale
}) {
  return (
    <main className="max-w-[1600px] mx-auto w-full py-20 max-lg:py-10 px-6 flex flex-col gap-10 max-lg:gap-6">
      {/* Title + Breadcrumbs */}
      <ScrollFadeUp>
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl max-lg:text-3xl font-bold text-[#3c4043] capitalize tracking-tight leading-[56px] max-lg:leading-[40px]">
            {t(subCategory.label, locale)}
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
                <BreadcrumbLink asChild>
                  <Link href={localePath(`/products/${category.slug}`, locale)}>{t(category.label, locale)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t(subCategory.label, locale)}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </ScrollFadeUp>

      {/* Description */}
      {subCategory.description && (
        <ScrollFadeUp style={{ transitionDelay: "100ms" }}>
          <p className="text-base text-[#3c4043] leading-[22.4px]  max-lg:max-w-full whitespace-pre-line">
            {t(subCategory.description, locale)}
          </p>
        </ScrollFadeUp>
      )}

      {/* Products */}
      <div className="flex flex-col gap-6">
        <ScrollFadeUp style={{ transitionDelay: "200ms" }}>
          <h2 className="text-2xl max-lg:text-xl font-bold text-[#3c4043] leading-[30px] capitalize">
            {locale === "id" ? "Produk" : "Products"}
          </h2>
        </ScrollFadeUp>
        <div className="grid grid-cols-3 max-lg:grid-cols-1 sm:max-lg:grid-cols-2 gap-[25px] max-lg:gap-4">
          {subCategory.productSlugs.map((slug, i) => {
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
      </div>

      {/* CTA */}
      <ScrollFadeUp>
        <BrandCTA locale={locale} />
      </ScrollFadeUp>
    </main>
  )
}
