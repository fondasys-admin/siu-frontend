"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import { FaTwitter, FaInstagram, FaFacebookSquare, FaYoutube, FaLinkedin } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContentNav,
  DrawerHeader,
} from "@/components/ui/drawer"
import Logo from "./logo"
import { type Locale, defaultLocale, locales, localePath, t } from "@/lib/i18n"
import { categoryRegistry } from "@/data/product-registry"
import posthog from "posthog-js"

import enIcon from "@/../public/en-icon.webp"
import idIcon from "@/../public/id-icon.webp"

const icons = { en: enIcon, id: idIcon } as const

type NavData = {
  en: Array<{ url: string; label: string }>
  id: Array<{ url: string; label: string }>
}

type Page = "main" | "products"

export default function Mobile({
  header,
  locale = defaultLocale,
}: {
  header: NavData | null
  products?: unknown
  contacts?: unknown
  categories?: unknown
  className?: string
  locale?: Locale
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState<Page>("main")
  const pathname = usePathname()

  const navItems = header?.[locale] ?? header?.en ?? []

  function handleClose() {
    setIsOpen(false)
    // Reset to main page after drawer close animation
    setTimeout(() => setPage("main"), 300)
  }

  // Language switcher helpers
  function getBasePath() {
    for (const loc of locales) {
      if (loc === defaultLocale) continue
      if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1)
      if (pathname === `/${loc}`) return "/"
    }
    return pathname
  }

  const otherLocale = locale === "en" ? "id" : "en"
  const otherLocalePath =
    otherLocale === defaultLocale
      ? getBasePath()
      : `/${otherLocale}${getBasePath()}`
  const otherLocaleLabel =
    locale === "en" ? "Change to Indonesian" : "Change to English"

  const productsLabel = locale === "id" ? "Produk" : "Products"

  return (
    <Drawer direction="right" open={isOpen} onClose={handleClose}>
      {/* Trigger — only visible below lg */}
      <Button
        variant="link"
        className="-mr-4 block ring-0 lg:hidden"
        onClick={() => {
          posthog.capture('mobile_nav_opened')
          setIsOpen(true)
        }}
      >
        <Menu className="size-6 text-black" />
      </Button>

      <DrawerContentNav>
        {page === "main" ? (
          /* ========== PAGE 1: Main Navigation ========== */
          <>
            <DrawerHeader className="max-lg:flex-row max-lg:items-center max-lg:justify-between max-lg:h-14 max-lg:px-5 max-lg:gap-0 shrink-0">
              <Logo locale={locale} />
              <DrawerClose asChild>
                <Button variant="link" className="px-0" onClick={handleClose}>
                  <X className="size-6 text-[#3c4043]" />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <nav className="flex flex-col gap-2.5 px-5 mt-2">
              {navItems.map((link) => {
                const isProducts = link.url === "/products"
                return (
                  <div key={link.url} className="flex flex-col gap-2.5">
                    {isProducts ? (
                      <button
                        type="button"
                        className="flex items-center justify-between h-10 py-2 pr-2 text-left"
                        onClick={() => setPage("products")}
                      >
                        <span className="text-base text-[#3c4043] capitalize">
                          {link.label}
                        </span>
                        <ChevronRight className="size-6 text-[#3c4043]" />
                      </button>
                    ) : (
                      <Link
                        href={localePath(link.url, locale)}
                        className="flex items-center h-10 py-2 pr-2"
                        onClick={handleClose}
                      >
                        <span className="text-base text-[#3c4043] capitalize">
                          {link.label}
                        </span>
                      </Link>
                    )}
                    <div className="h-px bg-border" />
                  </div>
                )
              })}

              <Link
                href={localePath("/inquiry", locale)}
                onClick={() => {
                  posthog.capture('mobile_contact_clicked', { locale })
                  handleClose()
                }}
              >
                <Button className="w-full h-10">
                  {locale === "id" ? "Hubungi Kami" : "Contact Us"}
                </Button>
              </Link>
            </nav>

            <div className="mt-auto flex flex-col gap-5 px-5 pb-8">
              <Link
                href={otherLocalePath}
                className="flex items-center gap-2"
                onClick={() => {
                  handleClose()
                  window.location.href = otherLocalePath
                }}
              >
                <Image
                  src={icons[otherLocale]}
                  width={16}
                  height={16}
                  alt={`${otherLocale}-icon`}
                />
                <span className="text-[11px] text-[#3c4043] tracking-[0.1px]">
                  {otherLocaleLabel}
                </span>
              </Link>

              <div className="flex items-center gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  onClick={() => posthog.capture('social_link_clicked', { platform: 'twitter', location: 'mobile_nav' })}
                >
                  <FaTwitter className="size-4 text-[#3c4043]" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  onClick={() => posthog.capture('social_link_clicked', { platform: 'instagram', location: 'mobile_nav' })}
                >
                  <FaInstagram className="size-4 text-[#3c4043]" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  onClick={() => posthog.capture('social_link_clicked', { platform: 'facebook', location: 'mobile_nav' })}
                >
                  <FaFacebookSquare className="size-4 text-[#3c4043]" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  onClick={() => posthog.capture('social_link_clicked', { platform: 'youtube', location: 'mobile_nav' })}
                >
                  <FaYoutube className="size-4 text-[#3c4043]" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  onClick={() => posthog.capture('social_link_clicked', { platform: 'linkedin', location: 'mobile_nav' })}
                >
                  <FaLinkedin className="size-4 text-[#3c4043]" />
                </a>
              </div>

              <div className="flex flex-col gap-2 text-[11px] text-[#3c4043] tracking-[0.1px]">
                <div className="flex gap-4">
                  <span>Privacy Statement</span>
                  <span>Sitemap</span>
                </div>
                <span>&copy; 2024 Synergis Industrial Utama</span>
              </div>
            </div>
          </>
        ) : (
          /* ========== PAGE 2: Products ========== */
          <>
            {/* Header with back button */}
            <DrawerHeader className="max-lg:flex-row max-lg:items-center max-lg:justify-between max-lg:h-14 max-lg:px-5 max-lg:gap-0 shrink-0">
              <button
                type="button"
                className="flex items-center gap-2"
                onClick={() => setPage("main")}
              >
                <ChevronLeft className="size-6 text-[#3c4043]" />
                <span className="text-base text-[#5e6166] tracking-[0.1px]">
                  {productsLabel}
                </span>
              </button>
              <DrawerClose asChild>
                <Button variant="link" className="px-0" onClick={handleClose}>
                  <X className="size-6 text-[#3c4043]" />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            {/* Category groups */}
            <div className="flex flex-col gap-2.5 px-5 mt-2 flex-1 overflow-y-auto">
              {categoryRegistry.map((category, catIndex) => (
                <div key={category.slug}>
                  {/* Category group */}
                  <div className="flex flex-col">
                    {/* Category label */}
                    <div className="h-10 flex items-center py-2">
                      <span className="text-xs font-medium text-[#5e6166] capitalize">
                        {t(category.label, locale)}
                      </span>
                    </div>

                    {/* Sub-category links */}
                    {category.subCategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={localePath(`/products/${category.slug}/${sub.slug}`, locale)}
                        className="h-10 flex items-center py-2"
                        onClick={handleClose}
                      >
                        <span className="text-base text-[#3c4043] capitalize">
                          {t(sub.label, locale)}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Separator between category groups */}
                  {catIndex < categoryRegistry.length - 1 && (
                    <div className="h-px bg-border mt-2.5" />
                  )}
                </div>
              ))}
            </div>

            {/* View All Products — pinned to bottom */}
            <div className="mt-auto px-5 pb-8">
              <Link
                href={localePath("/products", locale)}
                className="flex items-center justify-between h-10 py-2 pr-2"
                onClick={handleClose}
              >
                <span className="text-base text-[#3c4043] capitalize">
                  {locale === "id" ? "Lihat Semua Produk" : "View All Products"}
                </span>
                <ChevronRight className="size-6 text-[#3c4043]" />
              </Link>
            </div>
          </>
        )}
      </DrawerContentNav>
    </Drawer>
  )
}
