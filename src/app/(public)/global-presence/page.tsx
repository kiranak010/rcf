'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Globe, MapPin } from 'lucide-react'

const regions = [
  { name: 'North America', countries: 'Canada, United States, Mexico', facilities: '12 facilities', laboratories: '4 laboratories' },
  { name: 'South America', countries: 'Brazil, Argentina, Chile, Peru', facilities: '8 facilities', laboratories: '2 laboratories' },
  { name: 'Europe', countries: 'Germany, France, United Kingdom, Netherlands', facilities: '15 facilities', laboratories: '6 laboratories' },
  { name: 'Middle East', countries: 'UAE, Saudi Arabia, Qatar, Oman', facilities: '6 facilities', laboratories: '2 laboratories' },
  { name: 'Africa', countries: 'South Africa, Nigeria, Kenya, Egypt', facilities: '9 facilities', laboratories: '3 laboratories' },
  { name: 'Asia-Pacific', countries: 'India, China, Japan, South Korea, Australia', facilities: '22 facilities', laboratories: '8 laboratories' },
]

export default function GlobalPresencePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gray-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Global Presence</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">A global network of expertise.</h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              Strategic locations across six continents, serving agricultural and industrial markets with advanced chemical solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, index) => (
              <div key={index} className="card-base p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{region.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{region.countries}</p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1.5" />
                        {region.facilities}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1.5" />
                        {region.laboratories}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
