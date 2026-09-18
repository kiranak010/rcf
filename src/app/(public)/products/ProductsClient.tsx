'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package } from 'lucide-react'
import SafeImage from '@/components/public/SafeImage'

interface Product {
  id: string
  name: string
  slug: string
  description?: string
  category?: string
  specifications?: string
  applications?: string
  packaging?: string
  brochure?: string
  documents?: string
  images?: string
  isFeatured: boolean
  status: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.items.filter((p: Product) => p.status === 'published'))
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Products</h1>
        <p className="text-lg text-gray-600">Our product range</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const images = product.images ? product.images.split(',').map((img) => img.trim()).filter(Boolean) : []
          const mainImage = images[0] || ''
          return (
            <div key={product.id} className="bg-white shadow rounded-sm overflow-hidden hover:shadow-md transition-shadow">
               {mainImage && (
                 <SafeImage src={mainImage} alt={product.name} className="w-full h-48 object-cover" />
               )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Package className="h-8 w-8 text-primary" />
                  {product.isFeatured && (
                     <span className="px-2 py-1 text-xs font-semibold rounded-sm bg-yellow-100 text-yellow-800">Featured</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                {product.category && <p className="text-sm text-gray-500 mb-2">{product.category}</p>}
                {product.description && <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>}
                {product.specifications && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Specifications</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.specifications}</p>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  {product.brochure && (
                    <a href={product.brochure} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary/80">
                      Download Brochure
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products available.</p>
        </div>
      )}
    </div>
  )
}
