'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function PlaceholderPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gray-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative container-custom">
          <div className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Section</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Details Coming Soon</h1>
          <p className="text-lg text-gray-200 leading-relaxed max-w-3xl">
            Detailed content for this section is being prepared.
          </p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Link href="/" className="link-arrow">
            Return to homepage <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
