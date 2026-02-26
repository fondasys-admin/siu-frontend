import type { Metadata } from "next";
import NewsCarousel from "@/components/layout/news-carousel";
import ProductGrid from "@/components/layout/product-grid";
import { ContactForm } from "@/components/contact-form";
import { TrackedLink } from "@/components/ui/tracked-link";
import { newsItems } from "@/data/news-carousel-demo";
import { productGridData } from "@/data/product-grid-demo";
import { productHref } from "@/data/product-registry";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

interface PageProps {
  params: Promise<{ locale: string }>
}

const aboutContent = {
  subtitle: { en: "About Synergis Utama Industrial", id: "Tentang Synergis Utama Industrial" },
  title: { en: "Where quality meets innovation", id: "Di mana kualitas bertemu inovasi" },
  description: {
    en: "At Synergis Industrial Utama, we take pride in being the leading purveyor of top-notch laser cutting machines, coupled with unparalleled technical expertise and exceptional customer service. Synergis Industrial Utama serves as the exclusive agent, supplier, and distributor of Bodor Machine products in Indonesia.",
    id: "Di Synergis Industrial Utama, kami bangga menjadi penyedia terdepan mesin laser cutting berkualitas tinggi, didukung oleh keahlian teknis yang tak tertandingi dan layanan pelanggan yang luar biasa. Synergis Industrial Utama adalah agen, pemasok, dan distributor eksklusif produk Bodor Machine di Indonesia."
  },
  button: { en: "Learn More", id: "Pelajari Lebih Lanjut" },
}

const contactFormContent = {
  en: {
    title: "Get in Touch",
    description: "Fill out the form below and our team will get back to you with customized solutions and professional service support.",
  },
  id: {
    title: "Hubungi Kami",
    description: "Isi formulir di bawah ini dan tim kami akan menghubungi Anda dengan solusi yang disesuaikan dan dukungan layanan profesional.",
    labels: {
      name: "Nama",
      companyName: "Nama Perusahaan",
      country: "Negara",
      selectCountry: "Pilih Negara...",
      searchCountry: "Cari Negara...",
      noCountry: "Negara tidak ditemukan.",
      contactNumber: "Nomor Kontak",
      email: "Email",
      message: "Pesan",
      termsAgreement: "Anda menyetujui Syarat Layanan dan Kebijakan Privasi kami.",
      recaptchaNotice: "Situs ini dilindungi oleh reCAPTCHA dan Google.",
      privacyPolicy: "Kebijakan Privasi",
      termsOfService: "Syarat Layanan",
      submit: "Kirim",
      sending: "Mengirim",
      successTitle: "Pesan Anda berhasil terkirim!",
      successDescription: "Perwakilan kami akan segera menghubungi Anda",
      errorTitle: "Terjadi kesalahan.",
      errorDescription: "Ada masalah dengan permintaan Anda.",
      recaptchaFailed: "Verifikasi reCAPTCHA gagal. Silakan coba lagi.",
    },
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"

  const title = "PT Synergis Utama Indonesia"
  const description = locale === "id"
    ? "PT Synergis Utama Indonesia adalah distributor resmi mesin laser cutting Bodor dan mesin las Megmeet di Indonesia. Jual mesin laser cutting fiber, tube laser, mesin las MIG, TIG, SAW, dan sistem otomasi untuk manufaktur dan fabrikasi logam."
    : "PT Synergis Utama Indonesia is the authorized distributor of Bodor laser cutting machines and Megmeet welding machines in Indonesia. Shop fiber laser cutters, tube laser cutters, MIG welders, TIG welders, and automation systems for manufacturing and metal fabrication."
  const currentUrl = `${SITE_URL}${localePath("/", locale)}`

  return {
    title,
    description,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}${localePath("/", "en")}`,
        id: `${SITE_URL}${localePath("/", "id")}`,
        "x-default": `${SITE_URL}${localePath("/", "en")}`,
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

export default async function Home({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT Synergis Utama Indonesia",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: "Indonesia's leading supplier of industrial laser cutting machines and welding machines. Authorized agent for Bodor and Megmeet.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English", "Indonesian"],
    },
  }

  const allProducts = Object.values(productGridData).flatMap((cat) => cat.products)
  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Products",
    numberOfItems: allProducts.length,
    itemListElement: allProducts.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: `${SITE_URL}/${product.image}`,
        url: `${SITE_URL}${localePath(productHref(product.slug), locale)}`,
        brand: {
          "@type": "Brand",
          name: product.brand === "megmeet" ? "Megmeet" : "Bodor",
        },
        aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "11",
    },
      },
    })),
  }

  const brandsJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Bodor",
      url: `${SITE_URL}${localePath("/brands/bodor", locale)}`,
      logo: `${SITE_URL}/bodor.png`,
      description: "High-speed fiber laser cutting machines for all metals. Fully authorized in Indonesia.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Megmeet",
      url: `${SITE_URL}${localePath("/brands/megmeet", locale)}`,
      logo: `${SITE_URL}/megmeet.png`,
      description: "High-end industrial automatic welding equipment providing cost-effective, high-performance welding solutions. Fully authorized in Indonesia.",
    },
  ]

  const cfContent = contactFormContent[locale] ?? contactFormContent.en

  return (
    <div className="flex min-h-screen items-center w-full justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between pb-8 bg-white dark:bg-black sm:items-start">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
        />
        {brandsJsonLd.map((brand) => (
          <script
            key={brand.name}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(brand) }}
          />
        ))}
        <section id="news-carousel" className="w-full  max-w-[1600px] mx-auto px-6">
          <NewsCarousel items={newsItems} locale={locale} />
        </section>
        <section
          id="product-grid"
          className="w-full px-6 my-20  max-w-[1600px] mx-auto"
        >
          <ProductGrid categories={productGridData} locale={locale} />
        </section>
        <section id="about-section" className="w-full px-6 my-20  max-w-[1600px] mx-auto">
          <div className="rounded-md flex flex-col-reverse md:flex-row justify-center bg-[#FAF7F5] min-h-[550px] h-full lg:!h-[65vh]">
            <div className=" md:min-w-[50%] py-10 md:py-0">
              <div className=" max-w-[700px] h-full w-full ml-auto px-6 flex flex-col justify-center text-center md:text-left">
                <p
                  id="hero-subtitle"
                  className="text-black text-base md:text-lg font-semibold mb-6"
                >
                  {aboutContent.subtitle[locale]}
                </p>
                <h1
                  id="hero-title"
                  className="text-black text-4xl lg:text-5xl xl:text-6xl font-semibold mb-6 capitalize"
                >
                  {aboutContent.title[locale]}
                </h1>
                <p
                  id="hero-info"
                  className="text-black w-[100%] max-w-[550px] text-clip mb-6"
                >
                  {aboutContent.description[locale]}
                </p>
                <TrackedLink
                  href={localePath("/story", locale)}
                  eventName="learn_more_about_clicked"
                  eventProperties={{ locale, section: 'about' }}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-primary hover:text-white h-11 px-6 py-2 self-center md:self-start"
                >
                  {aboutContent.button[locale]}
                </TrackedLink>
              </div>
            </div>
            <div
              className="min-h-[350px] h-full md:h-auto rounded-md !bg-cover  md:w-full relative rounded-b-none md:rounded-b-md rounded-tl-md md:rounded-l-none !md:rounded-r-md"
              style={{
                backgroundImage:
                  "url('https://storage.googleapis.com/pt-synergis-utama.appspot.com/home-hero-3.jpg')",
              }}
            ></div>
          </div>
        </section>
        <section id="contact-form" className="w-full px-6 mb-20 max-w-[1200px] mx-auto">
          <ContactForm
            title={cfContent.title}
            description={cfContent.description}
            labels={"labels" in cfContent ? cfContent.labels : undefined}
          />
        </section>
      </main>
    </div>
  );
}
