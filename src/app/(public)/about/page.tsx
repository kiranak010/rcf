'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function AboutPage() {
  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    fetch('/api/content?section=about')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent(null))
  }, [])

  const sections = [
    { title: 'RCF at Glance', href: '/about', description: 'Overview of Rashtriya Chemicals and Fertilizers Limited.' },
    { title: 'Vision, Mission & Values', href: '/about/vision', description: 'Our guiding principles and long-term goals.' },
    { title: 'Board of Directors', href: '/about/leadership', description: 'Leadership and governance structure.' },
    { title: "Chairman's Message", href: '/about', description: 'Message from the Chairman.' },
    { title: 'Policies', href: '/about', description: 'Corporate policies and frameworks.' },
    { title: 'Corporate Film', href: '/about', description: 'Watch our corporate film.' },
    { title: 'Citizen Charter', href: '/about', description: 'Our commitment to citizens.' },
    { title: 'MoU', href: '/about', description: 'Memorandum of Understanding.' },
    { title: 'Media Center', href: '/news', description: 'News, press releases, and media coverage.' },
    { title: 'Sustainability at RCF', href: '/sustainability', description: 'Sustainability initiatives and reports.' },
    { title: 'RCF Darpan', href: '/about', description: 'RCF Darpan publications.' },
    { title: 'RCF State Wise GSTN Number', href: '/about', description: 'GSTN details state-wise.' },
    { title: 'Promotion of Digital Payments', href: '/about', description: 'Digital payment initiatives.' },
    { title: 'Certificate', href: '/about', description: 'Certificates and recognitions.' },
    { title: 'New Projects', href: '/about', description: 'Upcoming and ongoing projects.' },
  ]

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>About Us</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              About RCF
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              Rashtriya Chemicals and Fertilizers Limited (RCF) is a Maharatna PSU under the Ministry of Chemicals and Fertilizers, Government of India. Incorporated in 1978 and headquartered in Mumbai, RCF manufactures a wide range of nitrogenous fertilizers including urea, ammonia, and complex fertilizers, along with industrial chemicals such as methanol and formic acid.
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
