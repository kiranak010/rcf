'use client'

import Link from 'next/link'
import { ChevronRight, FlaskConical, Users } from 'lucide-react'

const laboratories = [
  { name: 'Advanced Materials Laboratory', region: 'Asia-Pacific', country: 'India', director: 'Dr. Rajesh Kumar', divisions: 'Materials Science, Metallurgy, Characterization' },
  { name: 'Process Engineering Center', region: 'Europe', country: 'Germany', director: 'Dr. Anna Schmidt', divisions: 'Process Engineering, Chemical Engineering, Optimization' },
  { name: 'Innovation Hub', region: 'North America', country: 'United States', director: 'Dr. Michael Chen', divisions: 'Applied Research, Product Development, Prototyping' },
  { name: 'Characterization Facility', region: 'Asia-Pacific', country: 'Japan', director: 'Dr. Yuki Tanaka', divisions: 'Material Testing, Analysis, Quality Control' },
]

export default function ResearchLaboratoriesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gray-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Research & Laboratories</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Research Laboratories</h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              World-class research facilities advancing the science of chemical fertilizers and advanced materials.
            </p>
          </div>
        </div>
      </section>

      {/* Laboratories */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-6">
            {laboratories.map((lab, index) => (
              <div key={index} className="card-base p-8 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-sm bg-primary/10 text-primary">{lab.region}</span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-sm bg-gray-100 text-gray-700">{lab.country}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{lab.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">Director: {lab.director}</p>
                    <p className="text-sm text-gray-600 mb-4">Divisions: {lab.divisions}</p>
                    <Link href={`/research-laboratories/${index + 1}`} className="link-arrow text-sm">
                      View laboratory details <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
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
