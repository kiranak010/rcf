'use client'

import Link from 'next/link'
import { ChevronRight, Accessibility, FileText, Users } from 'lucide-react'

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70 z-10" />
        <div className="relative z-20 container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Accessibility</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Accessibility at RCF
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              We are committed to making our website accessible to all users.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-base p-8">
              <Accessibility className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Accessible Design</h3>
              <p className="text-sm text-gray-600">WCAG 2.1 compliant design with keyboard navigation and screen reader support.</p>
            </div>
            <div className="card-base p-8">
              <FileText className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Text Resizing</h3>
              <p className="text-sm text-gray-600">Increase or decrease text size using the accessibility controls in the header.</p>
            </div>
            <div className="card-base p-8">
              <Users className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Feedback</h3>
              <p className="text-sm text-gray-600">Report accessibility issues via the contact form or grievance portal.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
