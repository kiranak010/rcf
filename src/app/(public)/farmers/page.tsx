'use client'

import Link from 'next/link'
import { ChevronRight, Sprout, BookOpen, Download, Users } from 'lucide-react'

export default function FarmersPage() {
  const resources = [
    { id: '1', title: 'Fertilizer Guide for Kharif', crop: 'Rice', type: 'Guide' },
    { id: '2', title: 'Soil Health Card Benefits', crop: 'Wheat', type: 'Scheme' },
    { id: '3', title: 'Organic Farming Practices', crop: 'Vegetables', type: 'Guide' },
  ]

  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70 z-10" />
        <div className="relative z-20 container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Farmers</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Kisan Manch
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              Farmer-centric resources, crop guidance, and agricultural knowledge from RCF.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link href="/kisan-manch" className="card-base p-8 hover:shadow-md transition-shadow group">
              <Sprout className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fertilizer Information</h3>
              <p className="text-sm text-gray-600 mb-4">Product information and usage guidance for farmers.</p>
              <span className="link-arrow text-sm">Explore <ChevronRight className="ml-1 h-4 w-4" /></span>
            </Link>
            <Link href="/kisan-manch" className="card-base p-8 hover:shadow-md transition-shadow group">
              <BookOpen className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Crop Guidance</h3>
              <p className="text-sm text-gray-600 mb-4">Crop-specific recommendations and best practices.</p>
              <span className="link-arrow text-sm">Explore <ChevronRight className="ml-1 h-4 w-4" /></span>
            </Link>
            <Link href="/kisan-manch" className="card-base p-8 hover:shadow-md transition-shadow group">
              <Download className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Downloads</h3>
              <p className="text-sm text-gray-600 mb-4">Brochures, guides, and farmer-friendly documents.</p>
              <span className="link-arrow text-sm">Explore <ChevronRight className="ml-1 h-4 w-4" /></span>
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Farmer Resources</div>
            <h2 className="section-title">Latest Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div key={resource.id} className="card-base p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 text-xs font-semibold rounded-sm bg-primary/10 text-primary">{resource.crop}</span>
                  <span className="text-xs text-gray-500">{resource.type}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{resource.title}</h3>
                <Link href={`/kisan-manch/${resource.id}`} className="link-arrow text-sm">
                  View <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
