import type { MetadataRoute } from "next"
import { locales } from "@/lib/i18n"
import { productRegistry, productPath, categoryRegistry } from "@/data/product-registry"

const BASE_URL = "https://www.siu.co.id"

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Static pages per locale
  const staticPages = ["/", "/products", "/story", "/brands", "/articles"]

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page === "/" ? "" : page}`,
        lastModified: new Date(),
        changeFrequency: page === "/" ? "weekly" : "monthly",
        priority: page === "/" ? 1.0 : 0.8,
      })
    }

    // Category pages: /products/laser-cutting-machines, /products/welding-machines
    for (const category of categoryRegistry) {
      entries.push({
        url: `${BASE_URL}/${locale}/products/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      })

      // Sub-category pages
      for (const sub of category.subCategories) {
        entries.push({
          url: `${BASE_URL}/${locale}/products/${category.slug}/${sub.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        })
      }
    }

    // Product detail pages
    for (const product of productRegistry) {
      entries.push({
        url: `${BASE_URL}/${locale}${productPath(product)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      })
    }

    // Brand pages
    for (const brand of ["bodor", "megmeet"]) {
      entries.push({
        url: `${BASE_URL}/${locale}/brands/${brand}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      })
    }
  }

  return entries
}
