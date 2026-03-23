import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/smooth-scroll";
import { isLocale } from "@/lib/i18n";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.siu-indo.com"),
  title: "PT Synergis Industrial Utama",
  description:
    "PT Synergis Industrial Utama — authorized distributor of Bodor laser cutting machines and Megmeet welding machines. Fiber laser, tube laser, MIG, TIG, and SAW solutions for manufacturing and fabrication across Indonesia.",
  appleWebApp: {
    capable: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const lang = rawLocale && isLocale(rawLocale) ? rawLocale : "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <SmoothScroll />
        {children}
        <Toaster />
        <Script
          src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
