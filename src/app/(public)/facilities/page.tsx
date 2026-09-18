'use client'

import Link from 'next/link'
import { ChevronRight, Factory, MapPin, Globe } from 'lucide-react'

export default function FacilitiesPage() {
  const locations = [
    { name: 'Trombay Unit', location: 'Mumbai, Maharashtra', description: 'Flagship manufacturing facility producing urea, ammonia, and industrial chemicals.' },
    { name: 'Thal Unit', location: 'Raigad, Maharashtra', description: 'Advanced urea plant with modern technology and environmental compliance.' },
    { name: 'Chemicals Division', location: 'Multiple Locations', description: 'Manufacturing industrial chemicals, solvents, and specialty products.' },
  ]

  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70 z-10" />
        <div className="relative z-20 container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Plants & Facilities</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Our Presence
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              Manufacturing units, offices, and operational facilities across India.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc, index) => (
              <div key={index} className="card-base p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-6">
                  <Factory className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{loc.name}</h3>
                <div className="text-sm text-primary font-medium mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> {loc.location}
                </div>
                <p className="text-sm text-gray-600 mb-4">{loc.description}</p>
                <Link href={`/facilities/${index + 1}`} className="link-arrow text-sm">
                  View Details <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
