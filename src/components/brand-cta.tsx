"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa"
import { type Locale, localePath, defaultLocale } from "@/lib/i18n"
import posthog from "posthog-js"

const content = {
  en: {
    intro: "We deliver tailored laser cutting and welding solutions that",
    hook: "drive your metal fabricating business's output",
    outro: "Send your requirements and we'll reply with the right machine recommendation + price range today.",
    whatsapp: "Get Quote on Whatsapp",
    contact: "Contact Sales",
  },
  id: {
    intro: "Kami menyediakan solusi laser cutting dan welding yang disesuaikan untuk",
    hook: "meningkatkan output bisnis fabrikasi logam Anda",
    outro: "Kirimkan kebutuhan Anda dan kami akan membalas dengan rekomendasi mesin yang tepat + kisaran harga hari ini.",
    whatsapp: "Dapatkan Penawaran di Whatsapp",
    contact: "Hubungi Sales",
  },
}

export function BrandCTA({ locale = defaultLocale }: { locale?: Locale }) {
  const t = content[locale]

  return (
    <section className="bg-[#3c4043] rounded-lg w-full flex items-center justify-center px-4 sm:px-6 py-12 sm:py-28">
      <div className="flex flex-col gap-4 sm:gap-6 max-w-[1164px]">
        <h2 className="text-base sm:text-2xl text-white leading-6 sm:leading-[42px] capitalize">
          {t.intro}
          <span className="text-[#ff5b00] text-4xl sm:text-5xl font-bold block sm:inline py-2 sm:py-0">
            {" "}{t.hook}
          </span>
          <span className="block mt-2 sm:mt-0 sm:inline">
            {t.outro}
          </span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <Button
            size="lg"
            asChild
            className="bg-[#25D366] hover:bg-[#1da851] text-white w-full sm:w-auto"
            onClick={() => posthog.capture('brand_cta_whatsapp_clicked', { locale })}
          >
            <Link href="https://wa.me/6285121305368" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="size-5" />
              {t.whatsapp}
            </Link>
          </Button>
          <Button
            size="lg"
            asChild
            className="w-full sm:w-auto"
            onClick={() => posthog.capture('brand_cta_contact_clicked', { locale })}
          >
            <Link href={localePath("/inquiry", locale)}>{t.contact}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
