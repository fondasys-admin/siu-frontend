export const locales = ['en', 'id'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

/**
 * Read a localized field like { en: "...", id: "..." }
 * Falls back to English if the requested locale is missing.
 */
export function t(field: { en: string; id?: string } | string, locale: Locale): string {
  if (typeof field === 'string') return field
  return field[locale] ?? field.en
}

/**
 * Prefix a path with the locale segment (only for non-default locales).
 * e.g. localePath('/products', 'en') => '/products'
 *      localePath('/products', 'id') => '/id/products'
 */
export function localePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path
  return `/${locale}${path}`
}
