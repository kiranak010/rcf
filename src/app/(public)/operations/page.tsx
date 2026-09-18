'use client'

import Link from 'next/link'
import { ChevronRight, Factory, FlaskConical, Mountain, Recycle, Truck, Award } from 'lucide-react'
import SafeImage from '@/components/public/SafeImage'

const operations = [
  { title: 'Manufacturing', description: 'Large-scale production of urea, DAP, and complex fertilizers with advanced process control.', href: '/operations/manufacturing', icon: Factory },
  { title: 'Refining', description: 'High-purity refining processes ensuring consistent quality and performance.', href: '/operations/refining', icon: Recycle },
  { title: 'Research & Development', description: 'Advanced laboratories focused on material science, process innovation, and product development.', href: '/research', icon: FlaskConical },
  { title: 'Quality Assurance', description: 'Rigorous testing protocols and quality management systems meeting global standards.', href: '/operations/quality', icon: Award },
  { title: 'Logistics & Supply Chain', description: 'Efficient distribution networks ensuring timely delivery across the nation.', href: '/operations/logistics', icon: Truck },
  { title: 'Resources & Mining', description: 'Sustainable sourcing of raw materials and responsible resource management.', href: '/operations/resources', icon: Mountain },
]

export default function OperationsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gray-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Operations</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Operations</h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              Integrated manufacturing, refining, and logistics capabilities delivering advanced chemical fertilizers at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Operations Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operations.map((operation, index) => (
              <Link key={index} href={operation.href} className="card-base p-8 hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-6">
                  <operation.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{operation.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{operation.description}</p>
                <span className="link-arrow text-sm">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Manufacturing Excellence</div>
              <h2 className="section-title mb-6">Precision at scale.</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our manufacturing facilities combine advanced automation, rigorous process control, and sustainable practices to produce consistent, high-quality fertilizers. Each facility is designed for efficiency, safety, and environmental responsibility.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-primary">12</div>
                  <div className="text-sm text-gray-600">Manufacturing Plants</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">5M+</div>
                  <div className="text-sm text-gray-600">Tonnes Annual Capacity</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-gray-600">Years of Operation</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-gray-600">Skilled Professionals</div>
                </div>
              </div>
              <Link href="/operations/manufacturing" className="link-arrow">
                Explore manufacturing <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="aspect-w-16 aspect-h-9 rounded-sm overflow-hidden bg-gray-100">
              <SafeImage
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop"
                alt="Manufacturing facility"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
