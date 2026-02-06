import Link from "next/link";
import { Mail, Phone, Headset } from "lucide-react";
import { FaInstagram, FaFacebookSquare, FaLinkedin, FaTiktok } from "react-icons/fa";
import { type Locale, localePath, defaultLocale, t } from "@/lib/i18n";
import { categoryRegistry } from "@/data/product-registry";

const Footer = async ({ locale = defaultLocale }: { locale?: Locale }) => {
  const lp = (path: string) => localePath(path, locale);

  const navLinks = [
    { label: "Home", href: lp("/") },
    { label: "Products", href: lp("/products") },
    { label: "About Us", href: lp("/story") },
    { label: "Articles", href: lp("/articles") },
    { label: "Contact", href: lp("/inquiry") },
  ];

  return (
    <footer className="w-full">
      {/* Divider */}
      <div className="mx-auto max-w-[1400px] border-t border-[#f2f2f2]" />

      {/* Main content */}
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-0">
        {/* Navigation columns */}
        <div className="flex max-lg:flex-col max-lg:gap-10 justify-between">
          {/* Site nav */}
          <div className="flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs text-dark tracking-[0.1px] leading-4 hover:underline ${i === 0 ? "border-b border-[#5e6166] w-fit" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Product category columns */}
          {categoryRegistry.map((category) => (
            <div key={category.slug} className="flex flex-col gap-6">
              <Link
                href={lp(`/products/${category.slug}`)}
                className="text-xs font-medium text-dark tracking-[0.1px] leading-4"
              >
                {t(category.label, locale)}
              </Link>
              {category.subCategories.map((sub, i) => (
                <Link
                  key={sub.slug}
                  href={lp(`/products/${category.slug}/${sub.slug}`)}
                  className={`text-xs text-dark tracking-[0.1px] leading-4 hover:underline ${i === 0 ? "border-b border-[#5e6166] w-fit" : ""}`}
                >
                  {t(sub.label, locale)}
                </Link>
              ))}
            </div>
          ))}

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <span className="flex items-center gap-2 text-xs text-dark tracking-[0.1px] leading-4">
              <Mail className="size-5 shrink-0" strokeWidth={1.5} />
              info@siu-indo.com
            </span>
            <span className="flex items-center gap-2 text-xs text-dark tracking-[0.1px] leading-4">
              <Phone className="size-5 shrink-0" strokeWidth={1.5} />
              +62-852-1323-8172
            </span>
            <span className="flex items-center gap-2 text-xs text-dark tracking-[0.1px] leading-4">
              <Headset className="size-5 shrink-0" strokeWidth={1.5} />
              7*24h
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex gap-[18px] items-start mt-20 text-dark tracking-[0.1px]">
          <span className="text-[10px] leading-[13px] shrink-0">1</span>
          <p className="text-xs leading-4">
            * Owing to the real-time updating of products and technologies, the
            datas and product pictures on the site are for reference only
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-[1400px] mt-20 border-t border-[#f2f2f2] flex max-lg:flex-col max-lg:gap-4 items-center justify-between h-14 px-6">
        {/* Social icons */}
        <div className="flex gap-4 items-center max-lg:pt-4">
          <a href="https://www.instagram.com/synergisiu/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-dark hover:opacity-70">
            <FaInstagram className="size-5" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61571196097631" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-dark hover:opacity-70">
            <FaFacebookSquare className="size-5" />
          </a>
          <a href="https://www.linkedin.com/company/sinergis-industrial-utama/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-dark hover:opacity-70">
            <FaLinkedin className="size-5" />
          </a>
          <a href="https://www.tiktok.com/@synergisiu" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-dark hover:opacity-70">
            <FaTiktok className="size-5" />
          </a>
        </div>

        {/* Legal links */}
        <div className="flex gap-4 items-center max-lg:pb-4">
          <Link
            href="#"
            className="text-[11px] text-dark leading-4 border-b border-[#5e6166] hover:opacity-70"
          >
            Privacy Statement
          </Link>
          <Link
            href="/sitemap.xml"
            className="text-[11px] text-dark leading-4 hover:underline"
          >
            Sitemap
          </Link>
          <span className="text-[11px] text-dark leading-4">
            © 2024 Synergis Industrial Utama
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
