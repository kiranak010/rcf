'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import SafeImage from '@/components/public/SafeImage'

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/news').then((res) => res.json()).then((data) => setNews(data.items || []))
  }, [])

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>News & Media</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              Latest updates and press releases.
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              Stay informed with the latest news, announcements, and insights from Rashtriya Chemicals and Fertilizers Limited.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {news.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No news yet</h2>
              <p className="text-gray-600">Check back later for the latest updates.</p>
            </div>
          ) : (
            <div className="govt-border-block overflow-x-auto">
              <table className="govt-table w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((item: any) => (
                    <tr key={item.id}>
                      <td className="font-medium">{item.title}</td>
                      <td>{item.category || '-'}</td>
                      <td>{item.date ? new Date(item.date).toLocaleDateString() : '-'}</td>
                      <td>
                        <Link href={`/news/${item.slug || item.id}`} className="text-primary font-semibold hover:underline">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
