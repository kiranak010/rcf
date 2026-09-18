'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function SitemapPage() {
  const sitemap = [
    {
      title: 'Main',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Products', href: '/products' },
        { name: 'Manufacturing', href: '/manufacturing' },
        { name: 'News', href: '/news' },
        { name: 'Tenders', href: '/tenders' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Investors', href: '/investors' },
        { name: 'Farmers', href: '/farmers' },
        { name: 'Grievance', href: '/grievance' },
        { name: 'Kisan Manch', href: '/kisan-manch' },
        { name: 'HR', href: '/hr' },
        { name: 'Vigilance', href: '/vigilance' },
        { name: 'CSR', href: '/csr' },
        { name: 'Sustainability', href: '/sustainability' },
      ],
    },
    {
      title: 'Admin',
      links: [
        { name: 'Admin Login', href: '/admin/login' },
      ],
    },
    {
      title: 'Utility',
      links: [
        { name: 'Accessibility', href: '/accessibility' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Use', href: '/terms' },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70 z-10" />
        <div className="relative z-20 container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Sitemap</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Site Map
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              Complete directory of RCF website pages and sections.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sitemap.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-gray-600 hover:text-primary">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
