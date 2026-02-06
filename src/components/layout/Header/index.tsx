import React from "react";

import { Button } from "@/components/ui/button";
import Nav from "./nav";

import Link from "next/link";
import Mobile from "./mobile";
import Logo from "./logo";
import navData from "@/data/global/nav.json";
import { type Locale, defaultLocale, localePath } from "@/lib/i18n";
import LanguageSwitcher from "./language-switcher";

const Header = async ({ locale = defaultLocale }: { locale?: Locale }) => {
  const nav = navData;
  const categories = null;
  const products = null;
  const contacts = null;

  return (
    <div className="w-full sticky top-0 bg-white z-30">
      <div className="max-w-[1600px] mx-auto px-6 flex py-4 items-center justify-between">
        <Logo locale={locale} />
        {/* NavLinks */}
        <Nav
          className="hidden lg:block"
          header={nav}
          categories={categories}
          products={products}
          locale={locale}
        />
        {/* Contact & Localization */}
        <div className="gap-2 hidden lg:flex">
          <LanguageSwitcher locale={locale} />
          <Link href={localePath("/inquiry", locale)} passHref>
            <Button className="h-11">Contact Us</Button>
          </Link>
        </div>
        {/* Mobile Nav */}
        <Mobile
          header={nav}
          categories={categories}
          products={products}
          contacts={contacts}
          locale={locale}
        />
      </div>
    </div>
  );
};

export default Header;
