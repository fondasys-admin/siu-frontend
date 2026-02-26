"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { renderInline } from "@/lib/parse-markdown"

interface ArticleChecklistProps {
  items: { text: string; checked: boolean }[]
}

export function ArticleChecklist({ items }: ArticleChecklistProps) {
  const [checked, setChecked] = useState(() =>
    items.map((item) => item.checked)
  )

  function handleToggle(index: number) {
    setChecked((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  return (
    <ul className="flex flex-col gap-3 text-base leading-[26px] text-[#3c4043]">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <Checkbox
            checked={checked[i]}
            onCheckedChange={() => handleToggle(i)}
            className="mt-1.5 shrink-0"
          />
          <span className={checked[i] ? "line-through opacity-60" : ""}>
            {renderInline(item.text)}
          </span>
        </li>
      ))}
    </ul>
  )
}
