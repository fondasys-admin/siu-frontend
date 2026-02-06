"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import posthog from "posthog-js"

interface SpecData {
  title: string
  data: Array<{ dTitle: string; dValue: string }>
}

interface ProductSidebarProps {
  productTitle: string
  description: string
  specs: SpecData[]
}

export function ProductSidebar({ productTitle, description, specs }: ProductSidebarProps) {
  const [selectedVariant, setSelectedVariant] = useState(specs[0].title)

  const activeSpec = specs.find((s) => s.title === selectedVariant) ?? specs[0]

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${productTitle} (${selectedVariant}). Can I get a quote?`
  )

  return (
    <aside className="w-[340px] shrink-0 sticky top-28 max-lg:hidden">
      <div className="bg-[#faf7f5] flex flex-col justify-center px-7 py-10">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-[#ff5b00] capitalize leading-[30px]">
            {productTitle}
          </h3>
          <p className="text-base text-[#3c4043] leading-6">
            {description}
          </p>

          {specs.length > 1 && (
            <Select
              value={selectedVariant}
              onValueChange={(value) => {
                posthog.capture('product_variant_changed', {
                  product_title: productTitle,
                  previous_variant: selectedVariant,
                  new_variant: value,
                })
                setSelectedVariant(value)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {specs.map((spec) => (
                  <SelectItem key={spec.title} value={spec.title}>
                    {spec.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <dl className="flex flex-col text-base leading-6">
            {activeSpec.data.slice(0, 6).map((spec) => (
              <div key={spec.dTitle}>
                <dt className="font-bold text-black">{spec.dTitle.trim()}</dt>
                <dd className="text-black mb-2">{spec.dValue}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Button
          size="lg"
          className="w-full mt-4"
          asChild
          onClick={() => posthog.capture('quote_request_clicked', {
            product_title: productTitle,
            selected_variant: selectedVariant,
            location: 'product_sidebar',
          })}
        >
          <Link href={`https://wa.me/6285121305368?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
            Request a Free Quote on Whatsapp
          </Link>
        </Button>
      </div>
    </aside>
  )
}

export function MobileQuoteBar({ productTitle }: { productTitle: string }) {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${productTitle}. Can I get a quote?`
  )

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e8e8e8] px-4 py-3">
      <Button
        size="lg"
        className="w-full"
        asChild
        onClick={() => posthog.capture('mobile_quote_clicked', {
          product_title: productTitle,
          location: 'mobile_quote_bar',
        })}
      >
        <Link href={`https://wa.me/6285121305368?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
          Request a Free Quote
        </Link>
      </Button>
    </div>
  )
}
