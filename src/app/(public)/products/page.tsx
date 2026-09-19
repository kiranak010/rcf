'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Leaf, FlaskConical, Award, Globe } from 'lucide-react'
import SafeImage from '@/components/public/SafeImage'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/products').then((res) => res.json()).then((data) => {
      setProducts(data.items || [])
    })
  }, [])

  const categories = [
    { name: 'Fertilizer', description: 'Urea, complex fertilizers, and specialty blends for agriculture.' },
    { name: 'Industrial', description: 'Methanol, formic acid, and other industrial chemicals.' },
    { name: 'Ammonia', description: 'Ammonia and related intermediates for downstream industries.' },
    { name: 'Specialty', description: 'High-performance specialty products for niche applications.' },
  ]

  const getCategoryCount = (categoryName: string) => {
    return products.filter(p => p.category?.toLowerCase().includes(categoryName.toLowerCase())).length
  }

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>Products</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              Quality products for agriculture and industry.
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              Explore RCF&apos;s comprehensive range of fertilizers, chemicals, and industrial products manufactured to the highest standards for Indian agriculture and industry.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="govt-section-heading">Our Portfolio</div>
            <h2 className="section-title">Product Categories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <Link key={index} href={`/products/${category.name.toLowerCase()}`} className="govt-border-block group flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-gray-600">{getCategoryCount(category.name)}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                  <span className="link-arrow text-xs">View <ChevronRight className="ml-1 h-3 w-3" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-8">
              <div className="govt-section-heading">Featured</div>
              <h2 className="section-title">Our Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product: any) => (
                <div key={product.id} className="govt-border-block">
                  {product.image && (
                    <SafeImage src={product.image} alt={product.name} className="w-full h-48 object-cover mb-3" />
                  )}
                  <div>
                    {product.category && (
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 block">{product.category}</span>
                    )}
                    <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
