import { notFound } from 'next/navigation'
import { ArrowLeft, Factory, MapPin, Info } from 'lucide-react'
import Link from 'next/link'

const FACILITIES_DATA = [
  {
    name: 'Trombay Unit',
    location: 'Mumbai, Maharashtra',
    description: 'The Trombay Unit is RCF\'s flagship manufacturing facility. It is a state-of-the-art complex producing urea and various industrial chemicals, utilizing advanced ammonia synthesis and urea production processes. It serves as the operational heart of the organization.',
    details: 'The facility includes a massive ammonia plant, urea plants, and a sophisticated chemical complex. It is known for its high standards of environmental safety and operational efficiency, contributing significantly to the national fertilizer supply.',
    highlights: ['Advanced Ammonia Synthesis', 'Integrated Chemical Complex', 'Strategic Port Access']
  },
  {
    name: 'Thal Unit',
    location: 'Raigad, Maharashtra',
    description: 'The Thal Unit is a modern urea manufacturing plant designed for high efficiency and low environmental impact. It utilizes the latest technology to produce high-quality urea for the agricultural sector.',
    details: 'Strategically located in Raigad, the Thal unit is optimized for logistics and distribution. It incorporates energy-saving technologies and stringent waste management systems to ensure sustainable operations.',
    highlights: ['Modern Technology', 'Energy Efficient', 'Strategic Logistics']
  },
  {
    name: 'Chemicals Division',
    location: 'Multiple Locations',
    description: 'The Chemicals Division focuses on the production of industrial-grade chemicals, solvents, and specialty products used across various industries.',
    details: 'This division produces a wide array of products including Methanol, Formic Acid, and other intermediates. These chemicals are critical for the pharmaceutical, textile, and leather industries in India.',
    highlights: ['Diversified Product Range', 'Industrial Grade Purity', 'Widespread Application']
  }
]

export default async function FacilityDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const facility = FACILITIES_DATA[id - 1]

  if (!facility) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <Link href="/facilities" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Facilities
            </Link>
            <div className="govt-badge mb-4">
              <span>Facility Details</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight text-white">
              {facility.name}
            </h1>
            <div className="flex items-center text-white/80 mt-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{facility.location}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="h-6 w-6 mr-2 text-primary" />
                Overview
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {facility.description}
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Information</h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                {facility.details}
              </p>
            </div>

            <div className="lg:col-span-1">
              <div className="govt-border-block p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Key Highlights</h3>
                <div className="space-y-4">
                  {facility.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      <span className="text-sm text-gray-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
