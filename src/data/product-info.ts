/**
 * Centralized product info lookup from actual product JSON files.
 * Used by category and sub-category pages for accurate names, descriptions, and images.
 */

import { t, type Locale } from "@/lib/i18n"

import pSeries from "@/data/products/p-series.json"
import aSeries from "@/data/products/a-series.json"
import cSeries from "@/data/products/c-series.json"
import gSeries from "@/data/products/g-series.json"
import iSeries from "@/data/products/i-series.json"
import hSeries from "@/data/products/h-series.json"
import kSeries from "@/data/products/k-series.json"
import tSeries from "@/data/products/t-series.json"
import q0ProSeries from "@/data/products/q0-pro-series.json"
import atSeries from "@/data/products/at-series.json"
import ctSeries from "@/data/products/ct-series.json"
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

interface ProductJSON {
  title: string
  brand?: string
  description: { en: string; id: string }
  media?: { type: string; url: string }
  slug: string
}

const productFiles: Record<string, ProductJSON> = {
  "p-series": pSeries as unknown as ProductJSON,
  "a-series": aSeries as unknown as ProductJSON,
  "c-series": cSeries as unknown as ProductJSON,
  "g-series": gSeries as unknown as ProductJSON,
  "i-series": iSeries as unknown as ProductJSON,
  "h-series": hSeries as unknown as ProductJSON,
  "k-series": kSeries as unknown as ProductJSON,
  "t-series": tSeries as unknown as ProductJSON,
  "q0-pro-series": q0ProSeries as unknown as ProductJSON,
  "at-series": atSeries as unknown as ProductJSON,
  "ct-series": ctSeries as unknown as ProductJSON,
  "iloader-eco": iloaderEco as unknown as ProductJSON,
  "iloader": iloader as unknown as ProductJSON,
  "k-loader": kLoader as unknown as ProductJSON,
  "k-loader-pro": kLoaderPro as unknown as ProductJSON,
  "m-loader": mLoader as unknown as ProductJSON,
  "t-loader": tLoader as unknown as ProductJSON,
  "dex2-m-series": dex2MSeries as unknown as ProductJSON,
  "ehave2-cm-series": ehave2CmSeries as unknown as ProductJSON,
  "lux-series": luxSeries as unknown as ProductJSON,
  "metatig-acdc-series": metatigAcdcSeries as unknown as ProductJSON,
  "metatig-dc-series": metatigDcSeries as unknown as ProductJSON,
  "sa-series": saSeries as unknown as ProductJSON,
  "st-series": stSeries as unknown as ProductJSON,
  "smarc": smarc as unknown as ProductJSON,
}

export function getProductInfo(slug: string, locale: Locale) {
  const data = productFiles[slug]
  if (data) {
    return {
      name: data.title,
      description: t(data.description, locale),
      image: data.media?.url || `/products/${slug}.webp`,
      slug,
    }
  }
  return {
    name: slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    description: "",
    image: `/products/${slug}.webp`,
    slug,
  }
}

export function getProductBrand(slug: string): string {
  return productFiles[slug]?.brand ?? "Bodor"
}
