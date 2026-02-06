"use client"

import Image from "next/image"
import Link from "next/link"
import posthog from "posthog-js"

interface ProductCardProps {
  name: string
  description: string
  image: string
  href: string
}

export function ProductCard({ name, description, image, href }: ProductCardProps) {
  return (
    <Link
      href={href}
      className="bg-[#faf7f5] rounded-md p-6 flex flex-col justify-between hover:bg-[#f5f1ee] transition-colors h-[308px]"
      onClick={() => posthog.capture('product_card_clicked', {
        product_name: name,
        product_href: href,
      })}
    >
      <div className="flex flex-col">
        <h3 className="text-[#ff5b00] text-lg font-bold leading-[21.6px]">
          {name}
        </h3>
        <p className="text-[#3c4043] text-sm font-normal leading-[22.4px]">
          {description}
        </p>
      </div>
      <div className="relative h-[190px]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
        />
      </div>
    </Link>
  )
}
