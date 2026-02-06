import type { ReactNode } from "react"
import { createElement } from "react"

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[]; ordered: boolean }

/**
 * Parse a markdown content string into typed blocks.
 * Supports: ## headings, ### headings, - unordered lists, and paragraphs.
 */
export function parseMarkdown(content: string): Block[] {
  const lines = content.split("\n")
  const blocks: Block[] = []
  let currentList: string[] | null = null

  function flushList() {
    if (currentList && currentList.length > 0) {
      blocks.push({ type: "list", items: currentList, ordered: false })
      currentList = null
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    // Empty line — flush any pending list
    if (trimmed === "") {
      flushList()
      continue
    }

    // ### heading (check before ##)
    const h3Match = trimmed.match(/^###\s+(.+)$/)
    if (h3Match) {
      flushList()
      blocks.push({ type: "heading", level: 3, text: h3Match[1] })
      continue
    }

    // ## heading
    const h2Match = trimmed.match(/^##\s+(.+)$/)
    if (h2Match) {
      flushList()
      blocks.push({ type: "heading", level: 2, text: h2Match[1] })
      continue
    }

    // Unordered list item
    const listMatch = trimmed.match(/^-\s+(.+)$/)
    if (listMatch) {
      if (!currentList) currentList = []
      currentList.push(listMatch[1])
      continue
    }

    // Regular paragraph
    flushList()
    blocks.push({ type: "paragraph", text: trimmed })
  }

  flushList()
  return blocks
}

/**
 * Convert inline markdown (bold) to React elements.
 * Transforms **text** into <strong>text</strong>.
 */
export function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    const boldMatch = part.match(/^\*\*(.+)\*\*$/)
    if (boldMatch) {
      return createElement("strong", { key: i }, boldMatch[1])
    }
    return part
  })
}
