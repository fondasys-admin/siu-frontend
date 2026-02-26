interface LocalizedString { en: string; id: string }

export interface NewsItem {
  id: string
  category: LocalizedString
  title: LocalizedString
  tag: LocalizedString
  image: string
  description: LocalizedString
  link: string
}

export const newsItems: NewsItem[] = [
  {
    id: '1',
    category: { en: 'Event', id: 'Event' },
    title: { en: 'Manufacturing Indonesia 2025 Recap', id: 'Rekap Manufacturing Indonesia 2025' },
    tag: { en: 'Event', id: 'Event' },
    image: '/layout/carousel-0.jpg',
    description: { en: 'Watch the recap of our biggest event yet.', id: 'Tonton rekap acara terbesar kami.' },
    link: 'https://www.instagram.com/p/DSWPffGEn0t/'
  },
  {
    id: '2',
    category: { en: 'Product Showcase', id: 'Pameran Produk' },
    title: { en: 'Bodor A Series Laser Cutter', id: 'Bodor A Series Laser Cutter' },
    tag: { en: 'Product Showcase', id: 'Pameran Produk' },
    image: '/layout/carousel-1.png',
    description: { en: 'Our Best Selling Laser cutting machine to date', id: 'Mesin laser cutting terlaris kami hingga saat ini' },
    link: '/products/laser-cutting-machines/sheet-laser-cutting/a-series'
  },
  {
    id: '3',
    category: { en: 'Product Showcase', id: 'Pameran Produk' },
    title: { en: 'Dex2 M Series', id: 'Dex2 M Series' },
    tag: { en: 'Product Showcase', id: 'Pameran Produk' },
    image: '/layout/carousel-2.png',
    description: { en: 'World Class Full-Digital Intelligent MIG/MAG Welding Machine at unbeatable value', id: 'Mesin Las MIG/MAG Intelligent Full-Digital Kelas Dunia dengan harga tak tertandingi' },
    link: '/products/welding-machines/mig-mag-welding/dex2-m-series'
  },
  {
    id: '4',
    category: { en: 'News', id: 'Berita' },
    title: { en: '3 Reasons why Megmeet is the solution for you', id: '3 Alasan Mengapa Megmeet Solusi untuk Anda' },
    tag: { en: 'News', id: 'Berita' },
    image: '/layout/carousel-3.png',
    description: { en: 'Why are so many industries turning to Megmeet? Click to find out more.', id: 'Mengapa begitu banyak industri beralih ke Megmeet? Klik untuk mengetahui lebih lanjut.' },
    link: 'https://www.instagram.com/p/DTfRd9iDwao/?img_index=1'
  },
  {
    id: '5',
    category: { en: 'Thought Leadership', id: 'Thought Leadership' },
    title: { en: '3kW vs 6kW Which One to Buy', id: '3kW vs 6kW Mana yang Harus Dibeli' },
    tag: { en: 'Thought Leadership', id: 'Thought Leadership' },
    image: '/articles/3kw-vs-6kw-fiber-laser-cutting-machine-guide.jpg',
    description: { en: 'Choosing between a 3kW and 6kW fiber laser cutting machine? This practical guide compares throughput, cost, and ideal use cases to help workshop owners pick the right wattage for their job profile.', id: 'Memilih antara mesin laser cutting fiber 3kW dan 6kW? Panduan praktis ini membandingkan throughput, biaya, dan kasus penggunaan ideal untuk membantu pemilik bengkel memilih daya yang tepat.' },
    link: '/articles/3kw-vs-6kw-fiber-laser-cutting-machine-guide'
  }
]
