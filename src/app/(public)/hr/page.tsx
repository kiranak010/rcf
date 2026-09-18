'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function HRPage() {
  const sections = [
    { title: 'Human Resource', href: '/hr', description: 'HR policies, employee welfare, and organizational development.' },
    { title: 'HRD', href: '/hr', description: 'Human Resource Development initiatives and training programs.' },
    { title: 'CDA Rules', href: '/hr', description: 'Conduct, Discipline and Appeal rules for employees.' },
    { title: 'Standing Order', href: '/hr', description: 'Standing orders governing service conditions.' },
    { title: 'HR Policy', href: '/hr', description: 'Comprehensive HR policies and guidelines.' },
    { title: 'RTI', href: '/rti', description: 'Right to Information disclosures and contacts.' },
    { title: 'Recruitment', href: '/careers', description: 'Current openings and recruitment processes.' },
    { title: 'RCF Internal Committee (IC) (POSH)', href: '/hr', description: 'Internal committee for POSH.' },
  ]

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>Human Resources</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              HR at RCF
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              People policies, recruitment, and employee services at Rashtriya Chemicals and Fertilizers Limited.
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
                <span className="link-arrow text-xs">Explore <ChevronRight className="ml-1 h-3 w-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
