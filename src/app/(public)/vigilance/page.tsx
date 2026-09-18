'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function VigilancePage() {
  const sections = [
    { title: 'Vigilance Measures in RCF', href: '/vigilance', description: 'Overview of vigilance measures.' },
    { title: 'Chief Vigilance Officer', href: '/vigilance', description: 'CVO details and contacts.' },
    { title: 'Systemic Improvement Measures', href: '/vigilance', description: 'Systemic improvements and reforms.' },
    { title: 'Vigilance Complaint Lodging Systems', href: '/vigilance', description: 'How to lodge complaints.' },
    { title: 'Vigilance Awards', href: '/vigilance', description: 'Awards and recognitions.' },
    { title: 'Vigilance Gallery', href: '/vigilance', description: 'Photo gallery of vigilance events.' },
    { title: 'VAW-2024', href: '/vigilance', description: 'Vigilance Awareness Week 2024.' },
    { title: 'VAW-2025', href: '/vigilance', description: 'Vigilance Awareness Week 2025.' },
  ]

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>Vigilance</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              Vigilance
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              Transparency, accountability, and ethical governance at RCF.
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
