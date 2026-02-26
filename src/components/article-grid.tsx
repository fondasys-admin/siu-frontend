"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const PAGE_SIZE = 6

interface Article {
  category: string
  title: string
  description: string
  image: string
  slug: string
  href: string
}

interface ArticleGridProps {
  articles: Article[]
  readMoreLabel: string
  viewMoreLabel: string
}

export function ArticleGrid({ articles, readMoreLabel, viewMoreLabel }: ArticleGridProps) {
  const [visible, setVisible] = useState(PAGE_SIZE)
  const shown = articles.slice(0, visible)
  const hasMore = visible < articles.length

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {shown.map((article) => (
          <Link
            key={article.slug}
            href={article.href}
            className="bg-[#faf7f5] flex flex-col pt-4 px-4 pb-6 group"
          >
            <div className="relative w-full h-[180px] sm:h-[224px] mb-4 sm:mb-6">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="text-sm text-[#3c4043] leading-[22px] sm:leading-[26px]">
                {article.category}
              </p>
              <h3 className="text-lg sm:text-2xl font-bold text-[#3c4043] leading-[22px] sm:leading-[27px] capitalize">
                {article.title}
              </h3>
              <p className="text-sm sm:text-base text-[#3c4043] leading-[22px] sm:leading-[26px]">
                {article.description}
              </p>
              <span className="text-[#ff5b00] text-sm sm:text-base font-medium leading-[22px] sm:leading-[26px] inline-flex items-center">
                {readMoreLabel} <ChevronRight className="size-4 sm:size-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-10 sm:pt-20">
          <Button
            variant="secondary"
            className="bg-[#3c4043] text-white hover:bg-[#3c4043]/90 w-full sm:w-auto"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            {viewMoreLabel}
          </Button>
        </div>
      )}
    </>
  )
}
