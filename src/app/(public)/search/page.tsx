'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Search } from 'lucide-react'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q') || ''
    setQuery(q)
    if (q) {
      setLoading(true)
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => setResults(data.suggestions || []))
        .finally(() => setLoading(false))
    }
  }, [])

  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70 z-10" />
        <div className="relative z-20 container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Search</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Search Results
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              {query ? `Results for "${query}"` : 'Search the RCF website'}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20 text-gray-600">Searching...</div>
          ) : results.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
              <p className="text-gray-600 mb-6">Try different keywords or browse sections.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/tenders" className="btn-secondary">Tenders</Link>
                <Link href="/products" className="btn-secondary">Products</Link>
                <Link href="/news" className="btn-secondary">News</Link>
                <Link href="/careers" className="btn-secondary">Careers</Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((item, index) => (
                <Link key={index} href={item.href} className="card-base p-6 hover:shadow-md transition-shadow block">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                      <span className="text-xs text-primary font-medium">{item.type}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
