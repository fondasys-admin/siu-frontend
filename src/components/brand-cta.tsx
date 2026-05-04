"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa"
import { ArrowRight } from "lucide-react"
import { type Locale, localePath, defaultLocale } from "@/lib/i18n"
import posthog from "posthog-js"

const content = {
  en: {
    tag: "Get started today",
    headline: "Ready to upgrade your\nproduction line?",
    description: "Send your requirements and we'll reply with the right machine recommendation + price range today.",
    whatsapp: "Get Quote on WhatsApp",
    contact: "Contact Sales",
    statLabel: "Trusted by",
    statValue: "500+",
    statSuffix: "Manufacturers across Indonesia",
  },
  id: {
    tag: "Mulai hari ini",
    headline: "Siap meningkatkan\nlini produksi Anda?",
    description: "Kirimkan kebutuhan Anda dan kami akan membalas dengan rekomendasi mesin yang tepat + kisaran harga hari ini.",
    whatsapp: "Dapatkan Penawaran di WhatsApp",
    contact: "Hubungi Sales",
    statLabel: "Dipercaya oleh",
    statValue: "500+",
    statSuffix: "Manufaktur di seluruh Indonesia",
  },
}

export function BrandCTA({ locale = defaultLocale }: { locale?: Locale }) {
  const t = content[locale]

  return (
    <section className="relative overflow-hidden rounded-2xl" style={{ background: "linear-gradient(135deg, #1a1d20 0%, #2a1a10 50%, #1a1d20 100%)" }}>
      {/* Orange glow top-right */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #ff5b00 0%, transparent 70%)" }} />
      {/* Subtle secondary glow bottom-left */}
      <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #ff8c42 0%, transparent 70%)" }} />
      {/* Orange accent bar at top */}
      <div className="absolute top-0 left-12 right-12 h-[2px]" style={{ background: "linear-gradient(90deg, transparent 0%, #ff5b00 30%, #ff5b00 70%, transparent 100%)" }} />

      <div className="relative flex max-lg:flex-col items-center justify-between px-6 py-12 sm:px-12 sm:py-16">
        <div className="flex flex-col gap-5 max-w-[580px]">
          <p className="text-xs font-mono font-medium tracking-widest uppercase text-primary">
            {t.tag}
          </p>
          <h2 className="text-white text-2xl sm:text-4xl font-bold tracking-tight leading-[1.15] whitespace-pre-line">
            {t.headline}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-[480px]">
            {t.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              size="lg"
              asChild
              className="bg-[#25D366] hover:bg-[#1ebe5a] text-white font-medium h-12 px-7 rounded-lg transition-colors w-full sm:w-auto"
              onClick={() => posthog.capture('brand_cta_whatsapp_clicked', { locale })}
            >
              <Link href="https://wa.me/6285213238172" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="size-5" />
                {t.whatsapp}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-zinc-700 bg-transparent text-white hover:bg-white/5 hover:border-zinc-500 font-medium h-12 px-7 rounded-lg transition-colors w-full sm:w-auto"
              onClick={() => posthog.capture('brand_cta_contact_clicked', { locale })}
            >
              <Link href={localePath("/inquiry", locale)}>
                {t.contact}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col items-end text-right max-lg:items-center max-lg:text-center max-lg:mt-10">
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-500 mb-2">
            {t.statLabel}
          </span>
          <span className="text-7xl font-semibold text-primary tracking-tighter leading-none">
            {t.statValue}
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-500 mt-2">
            {t.statSuffix}
          </span>
        </div>
      </div>
    </section>
  )
}
