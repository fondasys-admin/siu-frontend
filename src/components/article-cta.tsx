"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa"
import posthog from "posthog-js"

function renderHighlight(text: string): ReactNode[] {
  return text.split(/(\*\*.*?\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span key={i} className="text-[#ff5b00]">
        {part.slice(2, -2)}
      </span>
    ) : (
      part
    ),
  )
}

interface ArticleCtaProps {
  heading: string
  whatsappLabel: string
  whatsappUrl: string
  contactLabel: string
  contactHref: string
}

export function ArticleCta({
  heading,
  whatsappLabel,
  whatsappUrl,
  contactLabel,
  contactHref,
}: ArticleCtaProps) {
  return (
    <section className="bg-[#3c4043] rounded-lg w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-12 sm:py-28 mt-12 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-[1164px]">
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug max-w-[600px] text-center">
          {renderHighlight(heading)}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <Button
            size="lg"
            asChild
            className="bg-[#25D366] hover:bg-[#1da851] text-white w-full sm:w-auto"
            onClick={() => posthog.capture("article_cta_whatsapp_clicked")}
          >
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="size-5" />
              {whatsappLabel}
            </Link>
          </Button>
          <Button
            size="lg"
            asChild
            className="w-full sm:w-auto"
            onClick={() => posthog.capture("article_cta_contact_clicked")}
          >
            <Link href={contactHref}>
              {contactLabel}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
