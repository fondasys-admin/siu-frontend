"use client"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { renderInline } from "@/lib/parse-markdown"

interface ArticleFaqProps {
  items: { question: string; answer: string }[]
}

export function ArticleFaq({ items }: ArticleFaqProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="text-base font-semibold text-[#3c4043] text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-base leading-[26px] text-[#3c4043]">
            {item.answer.split("\n\n").map((paragraph, j) => (
              <p key={j} className={j > 0 ? "mt-3" : ""}>
                {renderInline(paragraph)}
              </p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
