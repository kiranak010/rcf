'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, ExternalLink, ArrowRight, Tag } from 'lucide-react'
import SafeImage from '@/components/public/SafeImage'

interface News {
  id: string
  title: string
  slug: string
  description?: string
  content?: string
  image?: string
  date?: string
  category?: string
  documents?: string
  externalLinks?: string
  status: string
  isFeatured?: boolean
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        setNews(data.items.filter((n: News) => n.status === 'published'))
        setLoading(false)
      })
  }, [])

  const featured = news.filter(n => n.isFeatured || n.image)
  const regular = news.filter(n => !n.isFeatured && !n.image)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">News & Media</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Latest news, press releases, and media coverage from the organization</p>
      </div>

      {featured.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Tag className="h-6 w-6 mr-2 text-primary" />
            Featured Stories
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featured.map((item) => (
              <div key={item.id} className="govt-card group">
                 {item.image && (
                   <div className="relative overflow-hidden rounded-lg mb-4">
                     <SafeImage src={item.image} alt={item.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                     {item.category && (
                       <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-white text-primary shadow-lg">
                         {item.category}
                       </span>
                     )}
                   </div>
                 )}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  {item.date && (
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                {item.description && <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>}
                <Link href={`/news/${item.id}`} className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {regular.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All News</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regular.map((item) => (
              <div key={item.id} className="govt-card">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  {item.date && (
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  )}
                  {item.category && (
                    <span className="ml-auto px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{item.category}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                {item.description && <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>}
                <Link href={`/news/${item.slug || item.id}`} className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {news.length === 0 && (
        <div className="text-center py-16">
          <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No news available at this time.</p>
        </div>
      )}
    </div>
  )
}
