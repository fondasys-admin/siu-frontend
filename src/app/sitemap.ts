import type { MetadataRoute } from "next"
import { locales, localePath } from "@/lib/i18n"
import { productRegistry, productPath, categoryRegistry } from "@/data/product-registry"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Static pages per locale
  const staticPages = ["/", "/products", "/story", "/articles", "/inquiry"]

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${SITE_URL}${localePath(page, locale)}`,
        lastModified: new Date(),
        changeFrequency: page === "/" ? "weekly" : "monthly",
        priority: page === "/" ? 1.0 : 0.8,
      })
    }

    // Category pages
    for (const category of categoryRegistry) {
      entries.push({
        url: `${SITE_URL}${localePath(`/products/${category.slug}`, locale)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      })

      // Sub-category pages
      for (const sub of category.subCategories) {
        entries.push({
          url: `${SITE_URL}${localePath(`/products/${category.slug}/${sub.slug}`, locale)}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        })
      }
    }

    // Product detail pages
    for (const product of productRegistry) {
      entries.push({
        url: `${SITE_URL}${localePath(productPath(product), locale)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      })
    }

    // Brand pages
    for (const brand of ["bodor", "megmeet"]) {
      entries.push({
        url: `${SITE_URL}${localePath(`/brands/${brand}`, locale)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      })
    }
  }

  return entries
}
