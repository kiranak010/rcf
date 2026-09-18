'use client'

import Link from 'next/link'
import { ChevronRight, Leaf, Sun, Droplets, Recycle, Shield, Users, Zap } from 'lucide-react'

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gray-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Sustainability</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Growing responsibly.</h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              Committed to responsible operations, environmental stewardship, and sustainable growth for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Environmental Responsibility', description: 'Minimizing environmental impact through cleaner production and waste reduction.', href: '/sustainability/environment', icon: Leaf },
              { title: 'Energy Efficiency', description: 'Optimizing energy consumption across all operations and facilities.', href: '/sustainability/energy', icon: Zap },
              { title: 'Water Management', description: 'Responsible water management and conservation initiatives.', href: '/sustainability/water', icon: Droplets },
              { title: 'Circular Economy', description: 'Promoting recycling, reuse, and sustainable material flows.', href: '/sustainability/circular-economy', icon: Recycle },
              { title: 'Worker Safety', description: 'Ensuring the highest standards of health and safety across all operations.', href: '/sustainability/safety', icon: Shield },
              { title: 'Community Development', description: 'Supporting local communities through education, employment, and infrastructure.', href: '/sustainability/community', icon: Users },
            ].map((item, index) => (
              <Link key={index} href={item.href} className="card-base p-8 hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-6">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.description}</p>
                <span className="link-arrow text-sm">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
