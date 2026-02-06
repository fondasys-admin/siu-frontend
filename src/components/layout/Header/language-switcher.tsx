'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Locale } from '@/lib/i18n'
import { defaultLocale, locales } from '@/lib/i18n'
import posthog from 'posthog-js'

import enIcon from '@/../public/en-icon.webp'
import idIcon from '@/../public/id-icon.webp'

const icons = { en: enIcon, id: idIcon } as const
const labels = { en: 'EN', id: 'ID' } as const

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  // Strip current locale prefix to get the base path
  function getBasePath() {
    for (const loc of locales) {
      if (loc === defaultLocale) continue
      if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1)
      if (pathname === `/${loc}`) return '/'
    }
    return pathname
  }

  function getLocalizedPath(target: Locale) {
    const base = getBasePath()
    if (target === defaultLocale) return base
    return `/${target}${base}`
  }

  return (
    <Select
      value={locale}
      onValueChange={(value) => {
        posthog.capture('language_switched', {
          from_locale: locale,
          to_locale: value,
        })
        window.location.href = getLocalizedPath(value as Locale)
      }}
    >
      <SelectTrigger className="w-[100%] data-[size=default]:h-11 !opacity-100">
        <SelectValue>
          <div className="flex px-1 items-center">
            <Image
              src={icons[locale]}
              width={24}
              height={24}
              className="mr-2"
              alt={`${locale}-icon`}
            />
            {labels[locale]}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            <div className="flex items-center">
              <Image
                src={icons[loc]}
                width={24}
                height={24}
                className="mr-2"
                alt={`${loc}-icon`}
              />
              {labels[loc]}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
