"use client"

import { useState } from "react"
import Image from "next/image"
import { type Locale, defaultLocale, localePath, t } from "@/lib/i18n"
import megaMenuData from "@/data/mega-menu.json"

interface MegaMenuItem {
  label: { en: string; id: string }
  description: { en: string; id: string }
  href: string
  image: string
  brand: string
}

interface MegaMenuCategory {
  label: { en: string; id: string }
  items: MegaMenuItem[]
}

const brandLogos: Record<string, string> = {
  bodor: "/bodor.png",
  megmeet: "/megmeet.png",
}

export function ProductsMegaMenu({
  locale = defaultLocale,
  onNavigate,
}: {
  locale?: Locale
  onNavigate?: () => void
}) {
  const categories = megaMenuData.categories as MegaMenuCategory[]
  const [activeItem, setActiveItem] = useState<MegaMenuItem>(categories[0].items[0])

  return (
    <div className="flex items-stretch justify-between w-full gap-4">
      {/* Left columns */}
      <div className="flex flex-col shrink-0 ">
        <div className="flex gap-4">
          {categories.map((category) => (
            <div key={t(category.label, "en")} className="flex flex-col w-[360px]">
              {/* Category header */}
              <span className="text-[11px] text-[#3c4043] uppercase tracking-widest pb-2 px-2">
                {t(category.label, locale)}
              </span>

              {/* Subcategory items */}
              {category.items.map((item) => {
                const isActive = item === activeItem
                return (
                  <a
                    key={item.href}
                    href={localePath(item.href, locale)}
                    className={`flex flex-col gap-0.5 rounded-md p-4 justify-center transition-colors ${
                      isActive ? "bg-[#ffdbba]" : "hover:bg-[#faf7f5]"
                    }`}
                    onMouseEnter={() => setActiveItem(item)}
                    onClick={onNavigate}
                  >
                    <span className="text-base font-semibold capitalize leading-snug text-[#cc4900]">
                      {t(item.label, locale)}
                    </span>
                    <span className="text-sm text-[#3c4043] leading-snug text-[11px]">
                      {t(item.description, locale)}
                    </span>
                  </a>
                )
              })}
            </div>
          ))}
        </div>
        <a
          href={localePath("/products", locale)}
          onClick={onNavigate}
          className="text-sm font-semibold text-[#ff5b00] hover:underline mt-auto pt-4 px-2"
        >
          {locale === "id" ? "Lihat Semua Produk →" : "View All Products →"}
        </a>
      </div>

      {/* Right preview card */}
      <div className="bg-[#faf7f5] rounded-md flex-1 flex flex-col items-center justify-between px-6 py-10">
        <div key={activeItem.href + "-img"} className="relative w-full flex-1 animate-fade-in">
          {activeItem.image ? (
            <Image
              src={activeItem.image}
              alt={t(activeItem.label, locale)}
              fill
              sizes="500px"
              quality={90}
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full bg-[#e8e8e8] rounded flex items-center justify-center text-sm text-[#5e6166]">
              No preview
            </div>
          )}
        </div>
        <div key={activeItem.href + "-info"} className="flex gap-8 items-start just w-full animate-fade-in">
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-[#ff5b00] leading-snug">
              {t(activeItem.label, locale)}
            </h3>
            <p className="text-base text-[#3c4043]">
              {t(activeItem.description, locale)}
            </p>
          </div>
          {brandLogos[activeItem.brand] && (
            <div className="flex justify-end">
              <div className="relative min-w-[120px] min-h-[48px]">
                <Image
                  src={brandLogos[activeItem.brand]}
                  alt={activeItem.brand}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
