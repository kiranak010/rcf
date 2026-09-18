'use client'

import Link from 'next/link'
import { ChevronRight, Newspaper, Image, Video, Download } from 'lucide-react'

export default function MediaPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70 z-10" />
        <div className="relative z-20 container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Media Center</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              News, images and corporate communications.
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              Press releases, news, images, videos, publications, and downloads from RCF.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/news" className="card-base p-8 hover:shadow-lg transition-shadow">
              <Newspaper className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Press Releases</h3>
              <p className="text-sm text-gray-600 mb-4">Latest press releases and corporate announcements.</p>
              <span className="link-arrow text-sm">View Press Releases <ChevronRight className="ml-1 h-4 w-4" /></span>
            </Link>
            <Link href="/news" className="card-base p-8 hover:shadow-lg transition-shadow">
              <Image className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Images</h3>
              <p className="text-sm text-gray-600 mb-4">Official RCF images for media use.</p>
              <span className="link-arrow text-sm">View Images <ChevronRight className="ml-1 h-4 w-4" /></span>
            </Link>
            <Link href="/news" className="card-base p-8 hover:shadow-lg transition-shadow">
              <Video className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Videos</h3>
              <p className="text-sm text-gray-600 mb-4">Corporate films and video content.</p>
              <span className="link-arrow text-sm">View Videos <ChevronRight className="ml-1 h-4 w-4" /></span>
            </Link>
            <Link href="/news" className="card-base p-8 hover:shadow-lg transition-shadow">
              <Download className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Publications</h3>
              <p className="text-sm text-gray-600 mb-4">Annual reports, brochures, and downloads.</p>
              <span className="link-arrow text-sm">View Publications <ChevronRight className="ml-1 h-4 w-4" /></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
