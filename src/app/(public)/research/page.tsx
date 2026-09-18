'use client'

import Link from 'next/link'
import { ChevronRight, FlaskConical, Award, BookOpen, Lightbulb } from 'lucide-react'

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gray-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Research & Development</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Science behind better solutions.</h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              World-class research and development driving innovation in chemical fertilizers and advanced materials.
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Materials Science', desc: 'Advanced research into material properties, characterization, and performance optimization.', href: '/research/materials-science' },
              { title: 'Metallurgy', desc: 'Innovative metallurgical processes and alloy development for industrial applications.', href: '/research/metallurgy' },
              { title: 'Process Engineering', desc: 'Optimization and advancement of chemical and manufacturing processes.', href: '/research/process-engineering' },
              { title: 'Characterization', desc: 'State-of-the-art laboratory facilities for material testing and analysis.', href: '/research/characterization' },
              { title: 'Innovation', desc: 'Pioneering research in sustainable chemistry and next-generation materials.', href: '/research/innovation' },
              { title: 'Publications', desc: 'Scientific papers, patents, and technical reports from our research divisions.', href: '/research/publications' },
            ].map((area, index) => (
              <Link key={index} href={area.href} className="card-base p-8 hover:shadow-lg transition-shadow group">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{area.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{area.desc}</p>
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
