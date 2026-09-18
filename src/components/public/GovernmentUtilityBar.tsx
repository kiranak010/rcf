'use client'

import Link from 'next/link'
import { Globe, Accessibility, BookOpen, Languages } from 'lucide-react'

export default function GovernmentUtilityBar() {
  return (
    <div className="bg-primary text-white text-xs">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 py-2">
          <div className="flex flex-wrap items-center gap-3 text-gray-200">
            <span className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              Government of India
            </span>
            <span className="hidden md:inline text-gray-500">|</span>
            <span>Ministry of Chemicals & Fertilizers</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-gray-200">
            <button className="hover:text-white font-medium">Skip to Main Content</button>
            <span className="text-gray-500">|</span>
            <button className="hover:text-white font-medium">Screen Reader Access</button>
            <span className="text-gray-500">|</span>
            <Link href="/accessibility" className="hover:text-white font-medium flex items-center gap-1">
              <Accessibility className="h-3.5 w-3.5" /> Accessibility
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/sitemap" className="hover:text-white font-medium">Sitemap</Link>
            <span className="text-gray-500">|</span>
            <Link href="/hi" className="hover:text-white font-medium flex items-center gap-1">
              <Languages className="h-3.5 w-3.5" /> Hindi
            </Link>
            <span className="text-gray-500">|</span>
            <span className="font-medium">English</span>
          </div>
        </div>
      </div>
    </div>
  )
}
