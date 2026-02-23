import type { Metadata } from "next"
import { InquiryForm, type InquiryFormLabels } from "@/components/inquiry-form"
import { ScrollFadeUp } from "@/components/ui/scroll-fade-up"
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { t, isLocale, localePath, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/site"
import data from "@/data/pages/inquiry.json"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"

  const title = locale === "id"
    ? "Hubungi Kami - PT Synergis Utama Indonesia"
    : "Contact Us - PT Synergis Utama Indonesia"
  const description = locale === "id"
    ? "Hubungi PT Synergis Utama Indonesia untuk pertanyaan mesin laser cutting dan mesin las. Dapatkan penawaran gratis, demo produk, dan konsultasi ahli untuk kebutuhan manufaktur dan fabrikasi Anda di Indonesia."
    : "Contact PT Synergis Utama Indonesia for laser cutting machine and welding machine inquiries. Get a free quotation, product demo, and expert consultation for your manufacturing and fabrication needs in Indonesia."
  const currentUrl = `${SITE_URL}${localePath("/inquiry", locale)}`

  return {
    title,
    description,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/inquiry`,
        id: `${SITE_URL}/id/inquiry`,
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

export default async function InquiryPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"

  const formLabels: InquiryFormLabels = Object.fromEntries(
    Object.entries(data.formLabels).map(([key, val]) => [key, t(val, locale)])
  )

  const faqs = data.faqs.map((faq) => ({
    question: t(faq.question, locale),
    answer: t(faq.answer, locale),
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <main className="flex flex-col items-center">
      {/* JSON-LD for FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero: split layout */}
      <section className="max-w-[1600px] w-full px-6 pt-12 sm:pt-20 pb-12 sm:pb-20">
        <div className="flex max-lg:flex-col gap-10 lg:gap-16 items-start">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-8">
            <ScrollFadeUp>
              <h1 className="text-4xl sm:text-5xl font-semibold text-[#3c4043] tracking-tight leading-[1.1]">
                {t(data.title, locale)}
              </h1>
            </ScrollFadeUp>
            <ScrollFadeUp>
              <p className="text-base text-slate-500 leading-relaxed max-w-[500px]">
                {t(data.subtitle, locale)}
              </p>
            </ScrollFadeUp>

            {/* Contact details */}
            <ScrollFadeUp>
              <div className="grid grid-cols-2 gap-8 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#3c4043] mb-2">
                    {t(data.callCenter, locale)}
                  </h3>
                  <div className="flex flex-col gap-1 text-sm text-[#3c4043]">
                    <span>(62) 811-7710-691</span>
                    <span>(62) 778 - 457154</span>
                    <a
                      href="tel:+6285121305368"
                      className="underline hover:text-[#ff5b00]"
                    >
                      (62) 811-7710-691
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#3c4043] mb-2">
                    {t(data.ourLocation, locale)}
                  </h3>
                  <p className="text-sm text-[#3c4043] leading-relaxed">
                    Kedoya Elok Plaza Jl. Panjang No.65, Kedoya Sel., Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11520
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#3c4043] mb-2">
                    {t(data.email, locale)}
                  </h3>
                  <a
                    href="mailto:info@siu-indo.com"
                    className="text-sm text-[#3c4043] hover:text-[#ff5b00]"
                  >
                    info@siu-indo.com
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#3c4043] mb-2">
                    {t(data.social, locale)}
                  </h3>
                  <div className="flex gap-3 items-center">
                    <a
                      href="https://www.instagram.com/synergisiu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="text-[#3c4043] hover:text-[#ff5b00]"
                    >
                      <FaInstagram className="size-5" />
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61571196097631"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="text-[#3c4043] hover:text-[#ff5b00]"
                    >
                      <FaFacebookSquare className="size-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/sinergis-industrial-utama/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="text-[#3c4043] hover:text-[#ff5b00]"
                    >
                      <FaLinkedin className="size-5" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@synergisiu"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="text-[#3c4043] hover:text-[#ff5b00]"
                    >
                      <FaTiktok className="size-5" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollFadeUp>
          </div>

          {/* Right column: contact form card */}
          <div className="w-full lg:w-[523px] shrink-0">
            <ScrollFadeUp>
              <div className="bg-[#faf7f5] rounded-2xl p-8 sm:p-10">
                <InquiryForm
                  description={t(data.formDescription, locale)}
                  labels={formLabels}
                />
              </div>
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="max-w-[1600px] w-full px-6 pb-12 sm:pb-20">
        <ScrollFadeUp>
          <div className="w-full h-[300px] sm:h-[433px] rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6419.878384363061!2d106.7678865983964!3d-6.186098240600838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f789cbb60f7f%3A0x9222376b0d07c1c0!2sPT.%20Synergis%20Industrial%20Utama%20(Bodor%20Laser)!5e1!3m2!1sen!2sid!4v1770277916555!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PT Synergis Utama Indonesia location"
            />
          </div>
        </ScrollFadeUp>
      </section>

      {/* FAQ Section */}
      <section className="max-w-[1600px] w-full px-6 pb-12 sm:pb-20">
        <ScrollFadeUp>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3c4043] tracking-tight mb-4">
            {t(data.faqTitle, locale)}
          </h2>
          <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-[600px]">
            {t(data.faqSubtitle, locale)}
          </p>
        </ScrollFadeUp>
        <ScrollFadeUp>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium text-[#3c4043]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-500 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollFadeUp>
      </section>
    </main>
  )
}
