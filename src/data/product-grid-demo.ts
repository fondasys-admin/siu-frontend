interface LocalizedString { en: string; id: string }

export interface ProductCardData {
  id: string
  name: string
  description: LocalizedString
  image: string
  slug: string
  brand: string
}

export interface CategoryData {
  title: LocalizedString
  description: LocalizedString
  learnMoreLink: string
  backgroundImage: string
  brandLogo: string
  products: ProductCardData[]
}

export const productGridData: Record<string, CategoryData> = {
  'laser-cutting': {
    title: { en: 'Fiber Laser Cutting Machines', id: 'Mesin Laser Cutting Fiber' },
    description: {
      en: 'Industrial fiber laser cutters for Indonesia—fast, precise sheet & tube cutting for manufacturing, fabrication, and shipyards.',
      id: 'Mesin laser cutting fiber industri untuk Indonesia—pemotongan plat & pipa yang cepat dan presisi untuk manufaktur, fabrikasi, dan galangan kapal.'
    },
    learnMoreLink: '/products/laser-cutting-machines',
    backgroundImage: '/layout/product-grid-0.jpg',
    brandLogo: '/bodor.png',
    products: [
      {
        id: 'a-series',
        name: 'A Series',
        description: { en: 'Entry-level Sheet Laser Cutting Machine', id: 'Mesin Laser Cutting Plat Tingkat Awal' },
        image: '/products/a-series.webp',
        slug: 'a-series',
        brand: 'bodor'
      },
      {
        id: 'k-series',
        name: 'K Series',
        description: { en: 'Entry-level Tube Laser Cutting Machine', id: 'Mesin Laser Cutting Pipa Tingkat Awal' },
        image: '/products/k-series.webp',
        slug: 'k-series',
        brand: 'bodor'
      },
      {
        id: 'c-series',
        name: 'C Series',
        description: { en: 'Sheet Laser Cutting Machine', id: 'Mesin Laser Cutting Plat' },
        image: '/products/c-series.webp',
        slug: 'c-series',
        brand: 'bodor'
      },
      {
        id: 't-series',
        name: 'T Series',
        description: { en: 'Performance Tube Laser Cutting Machine', id: 'Mesin Laser Cutting Pipa Performa Tinggi' },
        image: '/products/t-series.webp',
        slug: 't-series',
        brand: 'bodor'
      }
    ]
  },
  'welding': {
    title: { en: 'Welding Machines', id: 'Mesin Las' },
    description: {
      en: 'Industrial welding machines for Indonesia—MIG, TIG, MMA/Stick, SAW, and laser welding for heavy fabrication and oil & gas.',
      id: 'Mesin las industri untuk Indonesia—MIG, TIG, MMA/Stick, SAW, dan las laser untuk fabrikasi berat dan minyak & gas.'
    },
    learnMoreLink: '/products/welding-machines',
    backgroundImage: '/layout/product-grid-1.jpg',
    brandLogo: '/megmeet.png',
    products: [
      {
        id: 'dex2-m-series',
        name: 'DEX2 M Series',
        description: { en: 'Full-Digital Intelligent MIG/MAG Welding Machine', id: 'Mesin Las MIG/MAG Intelligent Full-Digital' },
        image: '/products/dex2-m-series.png',
        slug: 'dex2-m-series',
        brand: 'megmeet'
      },
      {
        id: 'ehave2-cm-series',
        name: 'eHave2 CM Series',
        description: { en: 'Full-Digital Multi-function Pulse MIG Welding Machine', id: 'Mesin Las MIG Pulse Multi-fungsi Full-Digital' },
        image: '/products/ehave2-cm-series.png',
        slug: 'ehave2-cm-series',
        brand: 'megmeet'
      },
      {
        id: 'metatig-acdc-series',
        name: 'MetaTIG ACDC Series',
        description: { en: 'Full-Digital AC/DC TIG Welding Machine', id: 'Mesin Las TIG AC/DC Full-Digital' },
        image: '/products/metatig-series.png',
        slug: 'metatig-acdc-series',
        brand: 'megmeet'
      },
      {
        id: 'lux-series',
        name: 'LUX Series',
        description: { en: 'Handheld Laser Welding & Cleaning Machine', id: 'Mesin Las & Pembersih Laser Genggam' },
        image: '/products/lux-series.png',
        slug: 'lux-series',
        brand: 'megmeet'
      }
    ]
  },
}
