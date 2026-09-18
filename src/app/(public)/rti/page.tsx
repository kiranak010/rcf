'use client'

import Link from 'next/link'
import { ChevronRight, FileText } from 'lucide-react'

export default function RTIPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70 z-10" />
        <div className="relative z-20 container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">RTI</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Right to Information
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              RTI disclosures, contacts, and annual reports.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/hr" className="card-base p-8 hover:shadow-lg transition-shadow">
              <FileText className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">RTI Act</h3>
              <p className="text-sm text-gray-600 mb-4">Right to Information Act 2005 and rules.</p>
              <span className="link-arrow text-sm">View Details <ChevronRight className="ml-1 h-4 w-4" /></span>
            </Link>
            <Link href="/hr" className="card-base p-8 hover:shadow-lg transition-shadow">
              <FileText className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Annual Reports</h3>
              <p className="text-sm text-gray-600 mb-4">RTI annual reports and disclosures.</p>
              <span className="link-arrow text-sm">View Reports <ChevronRight className="ml-1 h-4 w-4" /></span>
            </Link>
            <Link href="/hr" className="card-base p-8 hover:shadow-lg transition-shadow">
              <FileText className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Contact CPIO</h3>
              <p className="text-sm text-gray-600 mb-4">Central Public Information Officer contact details.</p>
              <span className="link-arrow text-sm">Contact <ChevronRight className="ml-1 h-4 w-4" /></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
