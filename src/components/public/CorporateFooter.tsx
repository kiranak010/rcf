'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Shield } from 'lucide-react'

export default function CorporateFooter() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    about: [
      { name: 'RCF at Glance', href: '/about' },
      { name: 'Vision, Mission & Values', href: '/about/vision' },
      { name: 'Board of Directors', href: '/about/leadership' },
      { name: "Chairman's Message", href: '/about' },
      { name: 'Policies', href: '/about' },
      { name: 'Corporate Film', href: '/about' },
      { name: 'Citizen Charter', href: '/about' },
      { name: 'MoU', href: '/about' },
      { name: 'Sustainability at RCF', href: '/sustainability' },
      { name: 'New Projects', href: '/about' },
    ],
    products: [
      { name: 'Fertilizer Products', href: '/products' },
      { name: 'Industrial Chemicals', href: '/products' },
      { name: 'MSDS for Fertilizers', href: '/products' },
      { name: 'MSDS for IPD Products', href: '/products' },
    ],
    resources: [
      { name: 'News & Media', href: '/news' },
      { name: 'Tenders', href: '/tenders' },
      { name: 'Recruitment', href: '/careers' },
      { name: 'Documents', href: '/documents' },
      { name: 'Announcements', href: '/announcements' },
    ],
    support: [
      { name: 'Investor Relations', href: '/investors' },
      { name: 'CSR', href: '/csr' },
      { name: 'Vigilance', href: '/vigilance' },
      { name: 'RTI', href: '/rti' },
      { name: 'Grievance', href: '/grievance' },
      { name: 'Contact', href: '/contact' },
    ],
  }

  const partners = [
    { name: 'Election Commission' },
    { name: 'Digital India' },
    { name: 'Swachh Bharat' },
    { name: 'Make In India' },
    { name: 'Fertilizer' },
    { name: 'India.gov.in' },
    { name: 'Mahila E-Haat' },
    { name: 'Khelo India' },
  ]

  return (
    <footer className="govt-footer">
      <div className="h-1 bg-gradient-to-r from-rcf-gold via-rcf-harvest to-rcf-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-white border border-gray-300 flex items-center justify-center mr-3">
                <span className="text-sm font-bold" style={{ color: 'var(--rcf-navy)' }}>RCF</span>
              </div>
              <div>
                <div className="font-bold text-sm leading-tight text-white">Rashtriya Chemicals and Fertilizers Limited</div>
                <div className="text-xs text-gray-400">A Government of India Enterprise</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-md">
              Rashtriya Chemicals and Fertilizers Limited is a leading Indian public-sector enterprise engaged in the manufacture and marketing of fertilizers and chemicals.
            </p>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-start">
                <MapPin className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0 text-green-400" />
                <span>RCF Bhawan, Administrative Block, Mumbai - 400001, Maharashtra, India</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-2 flex-shrink-0 text-green-400" />
                <span>+91-22-12345678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-3 w-3 mr-2 flex-shrink-0 text-green-400" />
                <span>info@rcf.gov.in</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-xs text-gray-500">
              © {currentYear} Rashtriya Chemicals and Fertilizers Limited. All rights reserved.
            </div>
            <div className="text-xs text-gray-500">
              CIN: L24110MH1978GOI020185
            </div>
            <div className="text-xs text-gray-500">
              Visitor Counter: 210514
            </div>
            <div className="text-xs text-gray-500">
              Last Updated On : {new Date().toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/accessibility" className="text-xs text-gray-500 hover:text-white transition-colors">Accessibility</Link>
            <Link href="/sitemap" className="text-xs text-gray-500 hover:text-white transition-colors">Sitemap</Link>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Best viewed in Chrome 90+, Firefox 88+, Edge 90+
          </p>
        </div>
      </div>
    </footer>
  )
}
