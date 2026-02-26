/**
 * Centralized article lookup from individual article JSON files.
 * Used by the article detail page for content, metadata, and static params.
 */

import { t, type Locale } from "@/lib/i18n"

import beginiCara from "@/data/articles/begini-cara-mengoperasikan-mesin-laser-cutting.json"
import inilahAlasan from "@/data/articles/inilah-alasan-mesin-laser-cutting-jadi-pilihan-populer-di-berbagai-industri.json"
import inginMembeli from "@/data/articles/ingin-membeli-mesin-laser-cutting-perhatikan-dulu-hal-hal-berikut-ini.json"
import teknologi from "@/data/articles/teknologi-yang-digunakan-di-mesin-laser-pemotong-logam.json"
import deretan from "@/data/articles/deretan-keuntungan-menggunakan-mesin-laser-pemotong-logam.json"
import tips from "@/data/articles/tips-perawatan-mesin-laser-cutting-yang-wajib-diketahui.json"
import sepertiApa from "@/data/articles/seperti-apa-cara-kerja-mesin-laser-cutting-simak-penjelasannya-berikut-ini.json"
import mengenal from "@/data/articles/mengenal-apa-itu-mesin-laser-pemotong-logam.json"
import understanding from "@/data/articles/understanding-the-technical-specifications-of-fiber-laser-cutting-machines-key-specs-and-what-they-mean.json"
import maintenance from "@/data/articles/maintenance-tips-for-fiber-laser-cutting-machines-best-practices-for-keeping-your-machine-in-top-condition.json"
import threeKwVsSixKw from "@/data/articles/3kw-vs-6kw-panduan-memilih-mesin-laser-cutting-fiber.json"

interface LocalizedString { en: string; id: string }

interface ArticleProductShowcase {
  image: string
  title: LocalizedString
  subtitle: LocalizedString
  points: LocalizedString[]
  buttonLabel: LocalizedString
  href: string
}

interface ArticleCta {
  heading: LocalizedString
  whatsappLabel: LocalizedString
  whatsappUrl: string
  contactLabel: LocalizedString
  contactHref: string
}

interface ArticleJSON {
  slug: string
  title: LocalizedString
  description: LocalizedString
  category: string
  image: string
  content: LocalizedString
  productShowcase?: ArticleProductShowcase
  cta?: ArticleCta
}

const articleFiles: Record<string, ArticleJSON> = {
  "how-to-operate-a-laser-cutting-machine": beginiCara as unknown as ArticleJSON,
  "why-laser-cutting-machines-are-popular-in-various-industries": inilahAlasan as unknown as ArticleJSON,
  "buying-a-laser-cutting-machine-factors-to-consider": inginMembeli as unknown as ArticleJSON,
  "technology-used-in-laser-cutting-machines": teknologi as unknown as ArticleJSON,
  "advantages-of-using-a-laser-cutting-machine": deretan as unknown as ArticleJSON,
  "laser-cutting-machine-maintenance-tips": tips as unknown as ArticleJSON,
  "how-does-a-laser-cutting-machine-work": sepertiApa as unknown as ArticleJSON,
  "what-is-a-metal-laser-cutting-machine": mengenal as unknown as ArticleJSON,
  "understanding-the-technical-specifications-of-fiber-laser-cutting-machines-key-specs-and-what-they-mean": understanding as unknown as ArticleJSON,
  "maintenance-tips-for-fiber-laser-cutting-machines-best-practices-for-keeping-your-machine-in-top-condition": maintenance as unknown as ArticleJSON,
  "3kw-vs-6kw-fiber-laser-cutting-machine-guide": threeKwVsSixKw as unknown as ArticleJSON,
}

export function getArticle(slug: string, locale: Locale) {
  const data = articleFiles[slug]
  if (!data) return null
  return {
    slug: data.slug,
    title: t(data.title, locale),
    description: t(data.description, locale),
    category: data.category,
    image: data.image,
    content: t(data.content, locale),
    productShowcase: data.productShowcase
      ? {
          image: data.productShowcase.image,
          title: t(data.productShowcase.title, locale),
          subtitle: t(data.productShowcase.subtitle, locale),
          points: data.productShowcase.points.map((p) => t(p, locale)),
          buttonLabel: t(data.productShowcase.buttonLabel, locale),
          href: data.productShowcase.href,
        }
      : undefined,
    cta: data.cta
      ? {
          heading: t(data.cta.heading, locale),
          whatsappLabel: t(data.cta.whatsappLabel, locale),
          whatsappUrl: data.cta.whatsappUrl,
          contactLabel: t(data.cta.contactLabel, locale),
          contactHref: data.cta.contactHref,
        }
      : undefined,
  }
}

export function getAllArticleSlugs() {
  return Object.keys(articleFiles)
}
