'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, ArrowRight, DollarSign, ShieldCheck, Info, Search } from 'lucide-react'

interface FarmerScheme {
  id: string
  schemeName: string
  provider: string
  eligibility: string
  benefits: string
  docsRequired: string
  howToApply: string
  officialSource: string
}

export default function FarmerSupportPage() {
  const [schemes, setSchemes] = useState<FarmerScheme[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchSchemes() {
      try {
        const res = await fetch('/api/farmer-schemes')
        const data = await res.json()
        if (data.items) setSchemes(data.items)
      } catch (error) {
        console.error('Error fetching schemes:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSchemes()
  }, [])

  const filteredSchemes = schemes.filter(s =>
    s.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.provider.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>Farmer Support</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight text-white">
              Financial Support & Subsidies
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-3xl leading-relaxed">
              Empowering our farmers with direct access to financial aid, government subsidies, and low-interest loans to improve agricultural productivity.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for schemes, providers..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all bg-gray-50"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                <ShieldCheck className="h-4 w-4 mr-2" /> Verified Gov Schemes
              </div>
              <div className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100">
                <DollarSign className="h-4 w-4 mr-2" /> Direct Benefit Transfer
              </div>
            </div>
          </div>

          {filteredSchemes.length === 0 ? (
            <div className="text-center py-20">
              <Info className="h-16 w-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Schemes Found</h3>
              <p className="text-gray-500">We couldn't find any schemes matching your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSchemes.map((scheme) => (
                <div key={scheme.id} className="govt-card group hover:border-primary transition-all flex flex-col">
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <FileText className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{scheme.provider}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {scheme.schemeName}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                      {scheme.benefits}
                    </p>
                  </div>
                  <div className="p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                    <Link
                      href={`/farmer-support/${scheme.id}`}
                      className="flex items-center justify-center w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all"
                    >
                      View Details <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
