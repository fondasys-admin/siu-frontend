import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // PostHog reverse proxy - handle before locale routing
  if (pathname.startsWith("/ingest/static/")) {
    const url = new URL(pathname.replace("/ingest/static/", "/static/"), "https://us-assets.i.posthog.com")
    url.search = request.nextUrl.search
    return NextResponse.rewrite(url)
  }

  if (pathname.startsWith("/ingest/")) {
    const url = new URL(pathname.replace("/ingest/", "/"), "https://us.i.posthog.com")
    url.search = request.nextUrl.search
    return NextResponse.rewrite(url)
  }

  if (pathname === "/ingest") {
    const url = new URL("/", "https://us.i.posthog.com")
    url.search = request.nextUrl.search
    return NextResponse.rewrite(url)
  }

  // Redirect /en/... → /... so the canonical (bare) URL is used
  if (
    pathname === `/${defaultLocale}` ||
    pathname.startsWith(`/${defaultLocale}/`)
  ) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(`/${defaultLocale}`.length) || "/"
    return NextResponse.redirect(url, 301)
  }

  // Non-default locales (e.g. /id/...) pass through
  const hasLocale = locales.some(
    (locale) =>
      locale !== defaultLocale &&
      (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
  )
  if (hasLocale) return NextResponse.next()

  // Rewrite to default locale internally (no redirect, URL stays clean)
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    // Match PostHog ingest paths
    '/ingest/:path*',
    // Match all paths except Next.js internals and static files
    '/((?!_next|api|favicon\\.ico|.*\\..*).*)',
  ],
}
