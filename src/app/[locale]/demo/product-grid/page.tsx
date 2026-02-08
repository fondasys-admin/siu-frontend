import type { Metadata } from "next"
import ProductGrid from '@/components/layout/product-grid'
import { productGridData } from '@/data/product-grid-demo'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ProductGridDemo() {
  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Product Grid Demo</h1>
        <ProductGrid categories={productGridData} />
      </div>
    </div>
  )
}
