import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { renderInline } from "@/lib/parse-markdown"

interface ArticleProductShowcaseProps {
  image: string
  title: string
  subtitle: string
  points: string[]
  buttonLabel: string
  href: string
}

export function ArticleProductShowcase({
  image,
  title,
  subtitle,
  points,
  buttonLabel,
  href,
}: ArticleProductShowcaseProps) {
  return (
    <section className="my-8 rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-[45%] aspect-[4/3] sm:aspect-auto bg-gray-50">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, 360px"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:w-[55%]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Featured product
            </p>
            <h3 className="mt-1 text-2xl font-bold text-[#3c4043]">{title}</h3>
            <p className="mt-1 text-sm text-[#3c4043]/70">{subtitle}</p>
          </div>
          <ul className="flex flex-col gap-2">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-[22px] text-[#3c4043]">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span>{renderInline(point)}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="w-fit">
            <Link href={href}>
              {buttonLabel}
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
