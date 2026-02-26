import { renderInline } from "@/lib/parse-markdown"

interface ArticleTableProps {
  headers: string[]
  rows: string[][]
}

export function ArticleTable({ headers, rows }: ArticleTableProps) {
  return (
    <div className="overflow-x-auto my-2 rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left text-[#3c4043]">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 font-semibold whitespace-nowrap"
              >
                {renderInline(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/50">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 leading-[22px] ${j === 0 ? "font-medium" : ""}`}
                >
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
