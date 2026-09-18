import { notFound } from 'next/navigation'
import { ArrowLeft, FileText, Package, CheckCircle2, Info } from 'lucide-react'
import Link from 'next/link'
import SafeImage from '@/components/public/SafeImage'

async function getProduct(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/products/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.item
  } catch (error) {
    return null
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <Link href="/products" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Products
            </Link>
            <div className="govt-badge mb-4">
              <span>{product.category || 'Industrial Product'}</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight text-white">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-3xl leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              {product.image ? (
                <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
                  <SafeImage src={product.image} alt={product.name} className="w-full h-auto" />
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 mb-8">
                  <Package className="h-20 w-20" />
                </div>
              )}

              {product.brochure && (
                <a href={product.brochure} target="_blank" rel="noopener noreferrer" className="btn-primary w-full flex items-center justify-center py-4">
                  <FileText className="h-5 w-5 mr-2" />
                  Download Product Brochure
                </a>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="h-6 w-6 mr-2 text-primary" />
                  Product Overview
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {product.specifications && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                    Technical Specifications
                  </h3>
                  <div className="govt-border-block p-6 bg-gray-50 rounded-xl">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {product.specifications}
                    </div>
                  </div>
                </div>
              )}

              {product.applications && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Applications</h3>
                  <div className="govt-border-block p-6 bg-gray-50 rounded-xl">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {product.applications}
                    </div>
                  </div>
                </div>
              )}

              {product.packaging && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Packaging Details</h3>
                  <div className="govt-border-block p-6 bg-gray-50 rounded-xl">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {product.packaging}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
