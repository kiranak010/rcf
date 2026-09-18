'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function CSRPage() {
  const sections = [
    { title: 'Social Responsibility', href: '/csr', description: 'Social responsibility initiatives.' },
    { title: 'Swachh Bharat Abhiyan', href: '/csr', description: 'Clean India campaign activities.' },
    { title: 'Sustainability Reports', href: '/sustainability', description: 'Sustainability reports and data.' },
    { title: 'ITEC', href: '/csr', description: 'International Technical and Economic Cooperation.' },
    { title: 'Annual Report on CSR Activities', href: '/csr', description: 'Annual CSR activity reports.' },
    { title: 'CSR Impact Assessment Reports', href: '/csr', description: 'Impact assessment of CSR programs.' },
  ]

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>Corporate Social Responsibility</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              CSR
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              Committed to sustainable development and community empowerment.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section, index) => (
              <Link key={index} href={section.href} className="govt-border-block group">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary mb-1">{section.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{section.description}</p>
                <span className="link-arrow text-xs">View <ChevronRight className="ml-1 h-3 w-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
