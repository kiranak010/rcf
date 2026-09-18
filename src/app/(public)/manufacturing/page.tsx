'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Factory, Shield, FlaskConical, Settings, Gauge } from 'lucide-react'
import SafeImage from '@/components/public/SafeImage'

export default function ManufacturingPage() {
  const facilities = [
    {
      name: 'Trombay Unit',
      location: 'Mumbai, Maharashtra',
      description: 'Flagship manufacturing facility producing urea, ammonia, and industrial chemicals.',
      capacity: 'Large-scale integrated complex',
    },
    {
      name: 'Thal Unit',
      location: 'Raigad, Maharashtra',
      description: 'Advanced urea plant with modern technology and environmental compliance.',
      capacity: 'High-efficiency production',
    },
    {
      name: 'Chemicals Division',
      location: 'Multiple Locations',
      description: 'Manufacturing industrial chemicals, solvents, and specialty products.',
      capacity: 'Diverse product portfolio',
    },
  ]

  const capabilities = [
    { title: 'Quality Assurance', description: 'Rigorous quality control at every stage of production.', icon: Shield },
    { title: 'Technology', description: 'Advanced manufacturing technologies for efficiency and sustainability.', icon: Settings },
    { title: 'Safety', description: 'World-class safety standards and compliance across all facilities.', icon: Shield },
    { title: 'Sustainability', description: 'Environmentally responsible practices and resource optimization.', icon: FlaskConical },
    { title: 'Innovation', description: 'Continuous process improvement and product innovation.', icon: Gauge },
    { title: 'Capacity', description: 'Large-scale production capacity serving national demand.', icon: Factory },
  ]

  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70 z-10" />
        <div className="relative z-20 container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Manufacturing</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Advanced manufacturing for a self-reliant India.
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              State-of-the-art manufacturing facilities producing fertilizers and chemicals with precision, quality, and sustainability.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Our Facilities</div>
            <h2 className="section-title">Manufacturing Units</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <div key={index} className="card-base overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop"
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{facility.name}</h3>
                  <div className="text-sm text-primary font-medium mb-3">{facility.location}</div>
                  <p className="text-sm text-gray-600 mb-4">{facility.description}</p>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{facility.capacity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Capabilities</div>
            <h2 className="section-title">What Sets Us Apart</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <div key={index} className="card-base p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-6">
                  <capability.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{capability.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
