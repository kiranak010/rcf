'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Globe, Shield, FileText, Package, ChevronLeft, ChevronRight as ChevronRightIcon, Sprout } from 'lucide-react'
import SafeImage from '@/components/public/SafeImage'

export default function HomePage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [hero, setHero] = useState<any>(null)
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [tenders, setTenders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [news, setNews] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/settings').then((res) => res.json()).then(setSettings)
    fetch('/api/homepage').then((res) => res.json()).then((data) => {
      if (data.hero) setHero(data.hero)
    })
    fetch('/api/announcements?limit=6').then((res) => res.json()).then((data) => setAnnouncements(data.items?.slice(0, 6) || []))
    fetch('/api/tenders?limit=5').then((res) => res.json()).then((data) => setTenders(data.items?.slice(0, 5) || []))
    fetch('/api/products?limit=8').then((res) => res.json()).then((data) => setProducts(data.items?.slice(0, 8) || []))
    fetch('/api/news?limit=4').then((res) => res.json()).then((data) => setNews(data.items?.slice(0, 4) || []))
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[480px] md:h-[560px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-//photo-1500382017468-some-id-for-indian-agriculture-field")', // I will use a generic high-quality agri field image
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          {/* Gradient Overlay: Dark Green Left -> Transparent Right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#002d19a6] to-transparent" />
        </div>

        <div className="container-custom relative z-10 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-//text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white mb-6">
              Powering Indian Agriculture<br />
              <span className="text-[#D7F06A]">Through Chemistry & Innovation</span>
            </h1>
            <p className="text-white text-lg md:text-xl max-w-2xl mb-8 leading-relaxed opacity-90">
              Strengthening Indian agriculture through quality fertilizers, innovation and sustainable solutions.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/products" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg">
                EXPLORE PRODUCTS
              </Link>
              <Link href="/kisan-manch" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-green-900 transition-all">
                KISAN MANCH
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          <button className="p-2 rounded-full border border-white/30 text-white hover:bg-white/20 transition-all">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === 1 ? 'w-8 bg-[#D7F06A]' : 'w-2 bg-white/50'}`} />
            ))}
          </div>
          <button className="p-2 rounded-full border border-white/30 text-white hover:bg-white/20 transition-all">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* What's New */}
      {announcements.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="govt-section-heading">Farmer Updates</div>
                <h2 className="section-title">Announcements</h2>
              </div>
              <Link href="/announcements" className="text-xs font-semibold text-primary hover:underline">Read More..</Link>
            </div>
            <div className="govt-border-block">
              <div className="divide-y divide-gray-200">
                {announcements.slice(0, 5).map((item: any) => {
                  const dateObj = item.date ? new Date(item.date) : new Date()
                  const month = dateObj.toLocaleString('en-US', { month: 'short' })
                  const day = dateObj.getDate()
                  return (
                    <div key={item.id} className="flex items-start gap-4 py-3">
                      <div className="flex-shrink-0 w-16 text-center border-r border-gray-200 pr-3">
                        <div className="text-xs font-bold text-gray-500 uppercase">{month}</div>
                        <div className="text-xl font-bold text-gray-900">{day}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-red-100 text-red-800 px-2 py-0.5 text-xs font-bold border border-red-200">NEW</span>
                          {item.category && <span className="bg-gray-100 text-gray-800 px-2 py-0.5 text-xs font-semibold border border-gray-200">{item.category}</span>}
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">
                          <Link href={`/announcements/${item.slug || item.id}`} className="hover:text-primary hover:underline">{item.title}</Link>
                        </h3>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Our Inspiration */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="govt-section-heading">Our Inspiration</div>
            <h2 className="section-title">Leadership</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Guided by the vision of our national leadership to make India agriculturally self-reliant.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="govt-border-block text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-100 mb-4 overflow-hidden rounded-xl border border-gray-100">
                <SafeImage src="/images/ministers/modi.png" alt="Shri. Narendra Modi" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Shri. Narendra Modi</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Hon'ble Prime Minister</p>
            </div>
            <div className="govt-border-block text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-100 mb-4 overflow-hidden rounded-xl border border-gray-100">
                <SafeImage src="/images/ministers/nadda.png" alt="Shri. Jagat Prakash Nadda" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Shri. Jagat Prakash Nadda</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Hon'ble Minister of Chemicals & Fertilizers</p>
            </div>
            <div className="govt-border-block text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-100 mb-4 overflow-hidden rounded-xl border border-gray-100">
                <SafeImage src="/images/ministers/anupriya.png" alt="Ms. Anupriya Patel" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Ms. Anupriya Patel</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Hon'ble Minister of State Chemicals & Fertilizers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="govt-section-heading">Our Products</div>
            <h2 className="section-title">Fertilizers & Chemicals for Every Crop</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product: any) => (
              <Link key={product.id} href={`/products/${product.slug || product.id}`} className="govt-border-block group">
                <div className="aspect-video bg-gray-100 mb-3 overflow-hidden border border-gray-200">
                  {product.image ? (
                    <SafeImage src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Package className="h-10 w-10 text-gray-500" />
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary">{product.name}</h3>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button className="px-3 py-2 border border-gray-300 bg-white text-xs font-semibold hover:bg-gray-50 flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button className="px-3 py-2 border border-gray-300 bg-white text-xs font-semibold hover:bg-gray-50 flex items-center gap-2">
              Next <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Active Tenders */}
      {tenders.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="govt-section-heading">Active Tenders</div>
                <h2 className="section-title">Tenders</h2>
              </div>
              <Link href="/tenders" className="text-xs font-semibold text-primary hover:underline">Read More..</Link>
            </div>
            <div className="govt-border-block">
              <div className="divide-y divide-gray-200">
                {tenders.slice(0, 3).map((tender: any) => {
                  const deadline = tender.deadline ? new Date(tender.deadline) : null
                  const month = deadline ? deadline.toLocaleString('en-US', { month: 'short' }) : 'TBD'
                  const day = deadline ? deadline.getDate() : ''
                  return (
                    <div key={tender.id} className="flex items-start gap-4 py-3">
                      <div className="flex-shrink-0 w-16 text-center border-r border-gray-200 pr-3">
                        <div className="text-xs font-bold text-gray-500 uppercase">{month}</div>
                        <div className="text-xl font-bold text-gray-900">{day}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 text-xs font-bold border border-green-200">New</span>
                          {tender.referenceNumber && <span className="text-xs text-gray-500">Ref: {tender.referenceNumber}</span>}
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">
                          <Link href={`/tenders/${tender.slug || tender.id}`} className="hover:text-primary hover:underline">{tender.title}</Link>
                        </h3>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Kisan Samriddhi */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="govt-section-heading">12 Years Of Kisan Samriddhi</div>
            <h2 className="section-title">Kisan Manch</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="aspect-video bg-gray-100 overflow-hidden border border-gray-200">
                <SafeImage src={`/images/kisan/${num}.png`} alt={`Kisan Samriddhi ${num}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button className="px-3 py-2 border border-gray-300 bg-white text-xs font-semibold hover:bg-gray-50 flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button className="px-3 py-2 border border-gray-300 bg-white text-xs font-semibold hover:bg-gray-50 flex items-center gap-2">
              Next <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Let Us Grow Together */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="govt-section-heading">Let Us Grow Together</div>
            <h2 className="section-title">Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
              <div key={num} className="aspect-square bg-gray-100 overflow-hidden border border-gray-200">
                <SafeImage src={`/images/gallery/${num}.jpg`} alt={`Gallery ${num}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button className="px-3 py-2 border border-gray-300 bg-white text-xs font-semibold hover:bg-gray-50 flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button className="px-3 py-2 border border-gray-300 bg-white text-xs font-semibold hover:bg-gray-50 flex items-center gap-2">
              Next <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="govt-section-heading">Our Partners</div>
            <h2 className="section-title">Strategic Associations</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Digital India', color: 'bg-blue-50' },
              { name: 'Make In India', color: 'bg-orange-50' },
              { name: 'Swachh Bharat', color: 'bg-green-50' },
              { name: 'Election Commission', color: 'bg-gray-50' },
              { name: 'India.gov.in', color: 'bg-blue-50' },
              { name: 'Khelo India', color: 'bg-red-50' },
            ].map((partner) => (
              <div key={partner.name} className={`h-20 border border-gray-100 ${partner.color} rounded-xl flex items-center justify-center p-4 hover:border-primary transition-all cursor-default`}>
                <span className="text-xs font-bold text-gray-700 text-center uppercase tracking-wider">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statutory */}
      <section className="bg-white border-t border-gray-200">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-gray-900">© {new Date().getFullYear()} Rashtriya Chemicals and Fertilizers Limited.</span>
              <span className="text-xs">All rights reserved.</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-gray-900">Corporate Identity</span>
              <span>CIN: L24110MH1978GOI020185</span>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <span className="font-bold text-gray-900">System Status</span>
              <span>Last Updated: {new Date().toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
