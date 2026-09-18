import { notFound } from 'next/navigation'
import { ArrowLeft, BookOpen, UserCheck, ArrowRight, Info } from 'lucide-react'
import Link from 'next/link'

const KISAN_RESOURCES = [
  {
    title: 'Modern Farming Techniques',
    description: 'Comprehensive guide on implementing sustainable and high-yield farming practices.',
    content: 'Our Modern Farming program focuses on the integration of precision agriculture, drip irrigation, and organic soil management. By adopting these techniques, farmers can significantly reduce water usage while increasing crop quality and quantity.',
    benefits: ['Reduced Input Costs', 'Higher Crop Yield', 'Environmental Sustainability'],
    action: 'Download Guide'
  },
  {
    title: 'Fertilizer Application Guide',
    description: 'Detailed instructions on the optimal use of Urea Gold and NPK complexes.',
    content: 'Proper nutrient management is key to agricultural success. This guide provides a detailed schedule for fertilizer application based on crop types and soil health markers, ensuring that the plants receive the right nutrients at the right time.',
    benefits: ['Optimized Nutrient Use', 'Prevention of Over-fertilization', 'Improved Soil Health'],
    action: 'Read Manual'
  },
  {
    title: 'Digital Tools for Farmers',
    description: 'Leveraging mobile technology for weather forecasts and market prices.',
    content: 'The Digital Farmer initiative empowers rural communities with real-time data. Through our mobile app and SMS alerts, farmers receive accurate weather warnings, current market prices (Mandi rates), and expert agronomic advice instantly.',
    benefits: ['Real-time Market Data', 'Accurate Weather Alerts', 'Direct Expert Access'],
    action: 'Access Portal'
  }
]

export default async function KisanResourcePage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const resource = KISAN_RESOURCES[id - 1]

  if (!resource) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <Link href="/kisan-manch" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Kisan Manch
            </Link>
            <div className="govt-badge mb-4">
              <span>Farmer Resource</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight text-white">
              {resource.title}
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-3xl leading-relaxed">
              {resource.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="h-6 w-6 mr-2 text-primary" />
                Detailed Guide
              </h3>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12 whitespace-pre-wrap">
                {resource.content}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="govt-border-block p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Key Benefits</h3>
                <div className="space-y-4 mb-8">
                  {resource.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <UserCheck className="h-5 w-5 text-primary mr-3" />
                      <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
                <a href="#" className="btn-primary w-full flex items-center justify-center py-4">
                  {resource.action} <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
