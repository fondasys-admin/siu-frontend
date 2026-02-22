import type { Metadata } from "next"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { ScrollFadeUp } from "@/components/ui/scroll-fade-up"
import { t, isLocale, localePath, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/site"
import data from "@/data/pages/story.json"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"

  const title = locale === "id"
    ? "Tentang Kami - PT Synergis Utama Indonesia"
    : "About Us - PT Synergis Utama Indonesia"
  const description = locale === "id"
    ? "Tentang PT Synergis Utama Indonesia — agen resmi Bodor dan Megmeet di Indonesia. Kami menyediakan mesin laser cutting industri, peralatan las, instalasi, training operator, dan dukungan purna jual."
    : "Learn about PT Synergis Utama Indonesia — authorized agent for Bodor and Megmeet in Indonesia. We provide industrial laser cutting machines, welding equipment, installation, operator training, and after-sales support."
  const canonicalUrl = `${SITE_URL}/story`
  const currentUrl = `${SITE_URL}${localePath("/story", locale)}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/story`,
        id: `${SITE_URL}/id/story`,
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

export default async function StoryPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"

  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="flex flex-col items-center gap-4 px-6 pt-12 pb-12 sm:pt-20 sm:pb-20">
        <ScrollFadeUp>
          <Image src="/logo.svg" alt="Synergis" width={84} height={128} />
        </ScrollFadeUp>
        <ScrollFadeUp>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3c4043] text-center tracking-tight capitalize">
            {t(data.aboutTitle, locale)}
          </h1>
        </ScrollFadeUp>
        <ScrollFadeUp>
          <p className="text-base text-[#3c4043] leading-6 text-center">
            {t(data.subtitle, locale)}
          </p>
        </ScrollFadeUp>
      </section>

      {/* Hero Image */}
      <ScrollFadeUp className="w-full max-w-[1600px] px-6">
        <div className="relative w-full h-[280px] sm:h-[400px] md:h-[680px] overflow-hidden rounded-sm">
          <Image
            src={data.heroImage}
            alt={t(data.aboutTitle, locale)}
            fill
            className="object-cover"
          />
        </div>
      </ScrollFadeUp>

      {/* About Intro */}
      <ScrollFadeUp className="max-w-[1600px] w-full px-6 py-12 sm:py-20">
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#3c4043] leading-[1.4] capitalize">
          {t(data.intro, locale)}
        </p>
      </ScrollFadeUp>

      {/* Pre-Sales Services */}
      <section className="max-w-[1600px] w-full px-6 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-[25px]">
          {data.services.map((service, i) => (
            <ScrollFadeUp key={t(service.title, "en")} style={{ transitionDelay: `${i * 100}ms` }}>
              <ServiceCard title={t(service.title, locale)} description={t(service.description, locale)} />
            </ScrollFadeUp>
          ))}
        </div>
      </section>

      {/* Strategic Sourcing */}
      <section className="max-w-[1600px] w-full px-6 pb-12 sm:pb-20">
        <div className="flex flex-col gap-4 mb-6">
          <ScrollFadeUp>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3c4043] tracking-tight capitalize">
              {t(data.strategicSourcing.title, locale)}
            </h2>
          </ScrollFadeUp>
          <ScrollFadeUp>
            <p className="text-base text-[#3c4043] leading-6">
              {t(data.strategicSourcing.description, locale)}
            </p>
          </ScrollFadeUp>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-[25px]">
          {data.strategicSourcing.cards.map((card, i) => (
            <ScrollFadeUp key={t(card.title, "en")} style={{ transitionDelay: `${i * 100}ms` }}>
              <ServiceCard title={t(card.title, locale)} description={t(card.description, locale)} />
            </ScrollFadeUp>
          ))}
        </div>
      </section>

      {/* After-Sales Service */}
      <section className="max-w-[1600px] w-full px-6 pb-12 sm:pb-20">
        <div className="flex flex-col gap-4 mb-6">
          <ScrollFadeUp>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3c4043] tracking-tight capitalize">
              {t(data.afterSales.title, locale)}
            </h2>
          </ScrollFadeUp>
          <ScrollFadeUp>
            <p className="text-base text-[#3c4043] leading-6">
              {t(data.afterSales.description, locale)}
            </p>
          </ScrollFadeUp>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-[25px]">
          {data.afterSales.cards.map((card, i) => (
            <ScrollFadeUp key={t(card.title, "en")} style={{ transitionDelay: `${i * 100}ms` }}>
              <ServiceCard title={t(card.title, locale)} description={t(card.description, locale)} />
            </ScrollFadeUp>
          ))}
        </div>
      </section>

      {/* Image Break */}
      <ScrollFadeUp className="max-w-[1600px] w-full px-6 pb-12 sm:pb-20">
        <div className="relative w-full h-[250px] sm:h-[400px] md:h-[565px] overflow-hidden rounded-sm">
          <Image
            src={data.breakImage}
            alt="Synergis facility"
            fill
            className="object-cover"
          />
        </div>
      </ScrollFadeUp>

      {/* Why Us */}
      <section className="max-w-[1600px] w-full px-6 pb-12 sm:pb-20">
        <div className="flex flex-col gap-4">
          <ScrollFadeUp>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3c4043] tracking-tight capitalize">
              {t(data.whyUs.title, locale)}
            </h2>
          </ScrollFadeUp>
          {data.whyUs.paragraphs[locale].map((paragraph: string, i: number) => (
            <ScrollFadeUp key={i}>
              <p className="text-base text-[#3c4043] leading-6">
                {paragraph}
              </p>
            </ScrollFadeUp>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 pt-7">
          {data.whyUs.stats.map((stat, i) => (
            <ScrollFadeUp key={t(stat.label, "en")} className="min-w-[140px] flex-1" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex flex-col gap-2">
                <span className="text-base text-[#5e6166] uppercase leading-6">
                  {t(stat.label, locale)}
                </span>
                <span className="text-2xl font-medium text-[#ff5b00] capitalize leading-[30px]">
                  {stat.value}
                </span>
              </div>
            </ScrollFadeUp>
          ))}
        </div>
      </section>

      {/* Where Are We */}
      <section className="max-w-[1600px] w-full px-6 pb-12 sm:pb-20">
        <ScrollFadeUp className="relative w-full h-[250px] sm:h-[400px] md:h-[565px] mb-7 overflow-hidden rounded-sm">
          <Image
            src={data.locationImage}
            alt="Synergis location"
            fill
            className="object-cover"
          />
        </ScrollFadeUp>
        <div className="flex flex-col gap-4">
          <ScrollFadeUp>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3c4043] tracking-tight capitalize">
              {t(data.whereAreWe.title, locale)}
            </h2>
          </ScrollFadeUp>
          <ScrollFadeUp>
            <p className="text-base text-[#3c4043] leading-6 whitespace-pre-line max-w-[511px]">
              {t(data.whereAreWe.address, locale)}
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      <Separator className="max-w-[1600px] w-full" />
    </main>
  )
}

function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-[#faf7f5] px-4 py-6 sm:min-h-[262px] h-full">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-[#3c4043] leading-[30px] capitalize text-center">
          {title}
        </h3>
        <p className="text-base text-[#3c4043] leading-6 text-center">
          {description}
        </p>
      </div>
    </div>
  )
}
