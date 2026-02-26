import type { ReactNode } from "react"
import { createElement } from "react"

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[]; ordered: boolean }
  | { type: "checklist"; items: { text: string; checked: boolean }[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | { type: "product-showcase" }

/**
 * Parse a markdown content string into typed blocks.
 * Supports: ## headings, ### headings, - unordered lists, | tables |, and paragraphs.
 * Call collectFaq() on the result to group FAQ sections into accordion blocks.
 */
export function parseMarkdown(content: string): Block[] {
  const lines = content.split("\n")
  const blocks: Block[] = []
  let currentList: string[] | null = null
  let currentChecklist: { text: string; checked: boolean }[] | null = null
  let currentTable: string[] | null = null

  function flushList() {
    if (currentList && currentList.length > 0) {
      blocks.push({ type: "list", items: currentList, ordered: false })
      currentList = null
    }
  }

  function flushChecklist() {
    if (currentChecklist && currentChecklist.length > 0) {
      blocks.push({ type: "checklist", items: currentChecklist })
      currentChecklist = null
    }
  }

  function parseRow(line: string): string[] {
    return line.split("|").slice(1, -1).map((cell) => cell.trim())
  }

  function flushTable() {
    if (currentTable && currentTable.length > 0) {
      const headers = parseRow(currentTable[0])
      const rows = currentTable.slice(1).map(parseRow)
      blocks.push({ type: "table", headers, rows })
      currentTable = null
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    // Table lines: start with | and end with |
    const isTableLine = trimmed.startsWith("|") && trimmed.endsWith("|")
    if (isTableLine) {
      // Flush any pending list/checklist before starting a table
      if (!currentTable) {
        flushList()
        flushChecklist()
        currentTable = []
      }
      // Skip separator rows like |---|---|
      if (!/^\|[\s\-:|]+\|$/.test(trimmed)) {
        currentTable.push(trimmed)
      }
      continue
    }

    // If we were collecting table lines and hit a non-table line, flush
    if (currentTable) {
      flushTable()
    }

    // Empty line — flush any pending list/checklist
    if (trimmed === "") {
      flushList()
      flushChecklist()
      continue
    }

    // ### heading (check before ##)
    const h3Match = trimmed.match(/^###\s+(.+)$/)
    if (h3Match) {
      flushList()
      flushChecklist()
      blocks.push({ type: "heading", level: 3, text: h3Match[1] })
      continue
    }

    // ## heading
    const h2Match = trimmed.match(/^##\s+(.+)$/)
    if (h2Match) {
      flushList()
      flushChecklist()
      blocks.push({ type: "heading", level: 2, text: h2Match[1] })
      continue
    }

    // Checklist item: - [ ] or - [x] (check before generic list)
    const checklistMatch = trimmed.match(/^-\s+\[([ xX])\]\s+(.+)$/)
    if (checklistMatch) {
      flushList()
      if (!currentChecklist) currentChecklist = []
      currentChecklist.push({
        text: checklistMatch[2],
        checked: checklistMatch[1].toLowerCase() === "x",
      })
      continue
    }

    // Unordered list item
    const listMatch = trimmed.match(/^-\s+(.+)$/)
    if (listMatch) {
      flushChecklist()
      if (!currentList) currentList = []
      currentList.push(listMatch[1])
      continue
    }

    // Embedded component markers
    if (trimmed === "{{product-showcase}}") {
      flushList()
      flushChecklist()
      blocks.push({ type: "product-showcase" })
      continue
    }

    // Regular paragraph
    flushList()
    flushChecklist()
    blocks.push({ type: "paragraph", text: trimmed })
  }

  flushList()
  flushChecklist()
  flushTable()
  return blocks
}

/**
 * Post-process parsed blocks to group FAQ sections.
 * Finds an h2 heading containing "FAQ", then collects all subsequent
 * h3 (question) + paragraph (answer) pairs into a single faq block.
 */
export function collectFaq(blocks: Block[]): Block[] {
  const faqIndex = blocks.findIndex(
    (b) => b.type === "heading" && b.level === 2 && /faq/i.test(b.text)
  )
  if (faqIndex === -1) return blocks

  const before = blocks.slice(0, faqIndex)
  const faqHeading = blocks[faqIndex] as { type: "heading"; text: string }
  const after = blocks.slice(faqIndex + 1)

  const items: { question: string; answer: string }[] = []
  let currentQuestion: string | null = null
  let currentAnswer: string[] = []

  for (const block of after) {
    if (block.type === "heading" && block.level === 3) {
      if (currentQuestion) {
        items.push({ question: currentQuestion, answer: currentAnswer.join("\n\n") })
      }
      currentQuestion = block.text
      currentAnswer = []
    } else if (currentQuestion && block.type === "paragraph") {
      currentAnswer.push(block.text)
    }
  }
  if (currentQuestion) {
    items.push({ question: currentQuestion, answer: currentAnswer.join("\n\n") })
  }

  if (items.length === 0) return blocks

  return [
    ...before,
    { type: "heading" as const, level: 2 as const, text: faqHeading.text },
    { type: "faq" as const, items },
  ]
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
