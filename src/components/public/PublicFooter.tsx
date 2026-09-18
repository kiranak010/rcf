'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center mr-3 border-2 border-primary/30">
                <span className="text-white text-lg font-bold">RCF</span>
              </div>
              <div>
                <span className="font-bold text-xl block">RCF</span>
                <span className="text-sm text-gray-400">Government Portal</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Your trusted partner for excellence. Building a better future through innovation and dedication. Committed to transparent and efficient governance.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <div className="flex items-center text-sm text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                +91-11-12345678
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                info@example.com
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/announcements" className="text-gray-400 hover:text-white text-sm transition-colors">Announcements</Link></li>
              <li><Link href="/tenders" className="text-gray-400 hover:text-white text-sm transition-colors">Tenders</Link></li>
              <li><Link href="/recruitment" className="text-gray-400 hover:text-white text-sm transition-colors">Recruitment</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white text-sm transition-colors">Products</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-white text-sm transition-colors">News & Media</Link></li>
              <li><Link href="/documents" className="text-gray-400 hover:text-white text-sm transition-colors">Documents</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>123 Business Park, City, State - 110001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>+91-11-12345678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>info@example.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} RCF. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Use</Link>
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
