'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Leaf, FlaskConical, Award, Globe, Package, Sprout } from 'lucide-react'
import SafeImage from '@/components/public/SafeImage'

const sampleProducts: any[] = [
  { id: '1', name: 'Urea', category: 'Fertilizer', slug: 'urea', image: '/images/products/product1.svg', description: 'High-grade urea for nitrogen nutrition in crops' },
  { id: '2', name: 'DAP', category: 'Fertilizer', slug: 'dap', image: '/images/products/product2.svg', description: 'Diammonium Phosphate for phosphorus and nitrogen' },
  { id: '3', name: 'Ammonium Sulphate', category: 'Chemical', slug: 'ammonium-sulphate', image: '/images/products/product3.svg', description: 'Industrial-grade ammonium sulphate' },
  { id: '4', name: 'Methanol', category: 'Chemical', slug: 'methanol', image: '/images/products/product4.svg', description: 'High-purity methanol for industrial applications' },
  { id: '5', name: 'Complex Fertilizers', category: 'Fertilizer', slug: 'complex-fertilizers', description: 'NPK complex fertilizers for balanced nutrition' },
  { id: '6', name: 'Formic Acid', category: 'Chemical', slug: 'formic-acid', description: 'Specialty chemicals for downstream industries' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/products').then((res) => res.json()).then((data) => {
      setProducts(data.items || [])
    })
  }, [])

  const categories = [
    { name: 'Fertilizer', description: 'Urea, DAP, complex fertilizers, and specialty blends for agriculture.' },
    { name: 'Industrial', description: 'Methanol, formic acid, and other industrial chemicals.' },
    { name: 'Ammonia', description: 'Ammonia and related intermediates for downstream industries.' },
    { name: 'Specialty', description: 'High-performance specialty products for niche applications.' },
  ]

  const getProductCount = (categoryName: string) => {
    return products.filter((p) => p.category?.toLowerCase().includes(categoryName.toLowerCase())).length
  }

  const displayProducts = products.length > 0 ? products : sampleProducts

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>Products</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight text-white">
              Quality products for agriculture and industry.
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              Explore RCF's comprehensive range of fertilizers, chemicals, and industrial products manufactured to the highest standards for Indian agriculture and industry.
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
              <Link key={index} href={`/products?category=${category.name.toLowerCase()}`} className="govt-border-block group flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-gray-600">{getProductCount(category.name)}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-rcf-green-dark mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                  <span className="link-arrow text-xs">View <ChevronRight className="ml-1 h-3 w-3" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="govt-section-heading">Our Products</div>
            <h2 className="section-title">Fertilizers &amp; Chemicals</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">High-quality fertilizers and industrial chemicals manufactured at RCF's state-of-the-art facilities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product: any) => (
              <Link key={product.id} href={`/products/${product.slug || product.id}`} className="govt-border-block group bg-white rounded-xl p-4 block">
                <div className="aspect-video bg-gray-100 mb-3 overflow-hidden rounded-lg border border-gray-200">
                  {product.image ? (
                    <SafeImage src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-10 w-10 text-rcf-green" />
                    </div>
                  )}
                </div>
                <div>
                  {product.category && (
                    <span className="text-xs font-semibold text-rcf-green-dark uppercase tracking-wider mb-2 block">{product.category}</span>
                  )}
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-rcf-green transition-colors">{product.name}</h3>
                  {product.description && (
                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="govt-section-heading">Quality &amp; Standards</div>
            <h2 className="section-title">Our Commitment</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 govt-border-block bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-rcf-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-rcf-green-dark" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">ISO Certified</h3>
              <p className="text-xs text-gray-600">Manufacturing facilities certified under ISO 9001, ISO 14001 and ISO 45001 standards.</p>
            </div>
            <div className="text-center p-6 govt-border-block bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-rcf-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FlaskConical className="h-8 w-8 text-rcf-green-dark" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">R&amp;D Excellence</h3>
              <p className="text-xs text-gray-600">Advanced research facilities driving innovation in fertilizer technology and chemical processes.</p>
            </div>
            <div className="text-center p-6 govt-border-block bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-rcf-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-rcf-green-dark" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-xs text-gray-600">Committed to sustainable manufacturing and green practices for environmental protection.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
