"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ui/product-card";

import Link from "next/link";
import { productHref } from "@/data/product-registry";
import { type Locale, localePath, defaultLocale } from "@/lib/i18n";

interface ProductCardData {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  brand: string;
}

interface CategoryData {
  title: string;
  description: string;
  learnMoreLink: string;
  backgroundImage: string;
  brandLogo: string;
  products: ProductCardData[];
}

interface ProductGridProps {
  categories: {
    [key: string]: CategoryData;
  };
  locale?: Locale;
}

export default function ProductGrid({ categories, locale = defaultLocale }: ProductGridProps) {
  const tabs = [
    { id: "laser-cutting", label: "Laser Cutting Machine" },
    { id: "welding", label: "Welding Machine" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [animKey, setAnimKey] = useState(0);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setAnimKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col mx-auto">
      <h2 className="text-4xl sm:text-5xl font-semibold mb-8">Our solutions at a glance</h2>

      {/* Tabbed layout for sm+ */}
      <div className="max-sm:hidden">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList variant="underline" className="w-full mb-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="capitalize text-md font-medium active:text-[#FF5b00]"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => {
            const category = categories[tab.id];
            return (
              <TabsContent key={tab.id} value={tab.id}>
                <div key={animKey} className="flex flex-col md:grid md:grid-cols-[273px_1fr] gap-3 h-full lg:h-[540px]">
                  <InfoCard category={category} animated locale={locale} />
                  <div className="grid grid-cols-2 md:grid-rows-2 gap-2">
                    {category.products.slice(0, 4).map((product, i) => (
                      <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${250 + (i + 1) * 80}ms` }}>
                        <ProductCard
                          name={product.name}
                          description={product.description}
                          image={product.image}
                          href={localePath(productHref(product.slug), locale)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      {/* Stacked list layout for below sm */}
      <div className="sm:hidden flex flex-col gap-6">
        {tabs.map((tab) => {
          const category = categories[tab.id];
          return (
            <div key={tab.id} className="flex flex-col gap-3">
              <InfoCard category={category} locale={locale} />
              <div className="grid grid-cols-1 gap-2">
                {category.products.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    description={product.description}
                    image={product.image}
                    href={localePath(productHref(product.slug), locale)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InfoCard({ category, animated, locale = defaultLocale }: { category: CategoryData; animated?: boolean; locale?: Locale }) {
  return (
    <div
      className={`${animated ? 'animate-pop-center' : ''} relative flex flex-row items-center sm:flex-col sm:justify-between rounded-sm px-7 py-[26px] bg-cover bg-center overflow-hidden h-[200px] sm:h-auto`}
      style={{
        backgroundImage: `url(${category.backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-[#331200]/56" />
      <div className="relative z-10 flex flex-col gap-4 text-white">
        <h2 className={`${animated ? 'animate-fade-up' : ''} text-2xl font-bold capitalize leading-[27.36px] tracking-[-0.5px]`} style={animated ? { animationDelay: '330ms' } : undefined}>
          {category.title}
        </h2>
        <p className={`${animated ? 'animate-fade-up' : ''} text-base font-normal leading-6 max-sm:hidden`} style={animated ? { animationDelay: '410ms' } : undefined}>
          {category.description}
        </p>
        <Link
          href={localePath(category.learnMoreLink, locale)}
          className={`${animated ? 'animate-fade-up' : ''} text-base font-normal leading-6 hover:underline`}
          style={animated ? { animationDelay: '490ms' } : undefined}
        >
          Learn More &gt;
        </Link>
      </div>

      <div className="relative z-10 flex items-center justify-end py-2">
        <div className="w-[140px] h-[38px] relative">
          <Image
            src={category.brandLogo}
            alt="Brand logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
