"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa"
import { type Locale, localePath, defaultLocale } from "@/lib/i18n"
import posthog from "posthog-js"

export function BrandCTA({ locale = defaultLocale }: { locale?: Locale }) {
  return (
    <section className="bg-[#3c4043] rounded-lg w-full flex items-center justify-center px-6 py-28">
      <div className="flex flex-col gap-6 max-w-[1164px]">
        <h2 className="text-2xl text-white leading-[42px] capitalize">
          We deliver tailored laser cutting and welding solutions that<br/>
          <span className="text-[#ff5b00] text-5xl font-bold">
            drive your metal fabricating business&apos;s output
          </span>
          . <br/>
          Send your requirements and we’ll reply with the right machine recommendation + price range today.
        </h2>
        <div className="flex gap-6">
          <Button
            size="lg"
            asChild
            className="bg-[#25D366] hover:bg-[#1da851] text-white"
            onClick={() => posthog.capture('brand_cta_whatsapp_clicked', { locale })}
          >
            <Link href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="size-5" />
              Get Quote on Whatsapp
            </Link>
          </Button>
          <Button
            size="lg"
            asChild
            onClick={() => posthog.capture('brand_cta_contact_clicked', { locale })}
          >
            <Link href={localePath("/inquiry", locale)}>Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
