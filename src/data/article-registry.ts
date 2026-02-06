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

interface ArticleJSON {
  slug: string
  title: { en: string; id: string }
  description: { en: string; id: string }
  category: string
  image: string
  content: { en: string; id: string }
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
  }
}

export function getAllArticleSlugs() {
  return Object.keys(articleFiles)
}
