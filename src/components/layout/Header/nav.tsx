"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { type Locale, defaultLocale, localePath } from "@/lib/i18n"
import { ProductsMegaMenu } from "./products-mega-menu"

interface NavItem {
  url: string
  label: string
}

interface NavData {
  en: NavItem[]
  id: NavItem[]
}

const Nav = ({
  header,
  className,
  locale = defaultLocale,
}: {
  header: NavData
  categories?: unknown
  products?: unknown
  className?: string
  locale?: Locale
}) => {
  const navItems = header?.[locale] || []
  const pathname = usePathname()

  return (
    <NavigationMenu className={className} orientation="horizontal">
      <NavigationMenuList>
        {navItems.map((link, index) =>
          link.label === "Products" || link.label === "Produk" ? (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger>
                <NavigationMenuLink
                  asChild
                  active={pathname?.includes("/products")}
                  className={cn(navigationMenuTriggerStyle(), "p-0")}
                >
                  <Link href={localePath(link.url, locale)}>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-5">
                <ProductsMegaMenu locale={locale} />
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink
                asChild
                active={
                  pathname?.split("/")[1] === link?.url.split("/")[1]
                }
                className={navigationMenuTriggerStyle()}
              >
                <Link href={localePath(link?.url, locale)}>
                  {link.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  )
}

export default Nav
