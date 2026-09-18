'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, ExternalLink, FileText, ArrowRight, Clock, Tag } from 'lucide-react'
import SafeImage from '@/components/public/SafeImage'

interface Announcement {
  id: string
  title: string
  description?: string
  category?: string
  publishDate?: string
  expiryDate?: string
  isNew: boolean
  externalUrl?: string
  pdfFile?: string
  status: string
  isFeatured: boolean
  createdAt: string
  image?: string
}

export default function AnnouncementsClient() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/announcements')
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(data.items.filter((a: Announcement) => a.status === 'published'))
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const featured = announcements.filter(a => a.isFeatured)
  const regular = announcements.filter(a => !a.isFeatured)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Announcements</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Latest updates, notifications, and important announcements from the organization</p>
      </div>

      {featured.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Tag className="h-6 w-6 mr-2 text-primary" />
            Featured Announcements
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {featured.map((announcement) => (
              <div key={announcement.id} className="govt-card border-l-4 border-l-primary">
                <div className="flex flex-col lg:flex-row gap-6">
                   {announcement.image && (
                     <div className="lg:w-1/3">
                       <SafeImage src={announcement.image} alt={announcement.title} className="w-full h-48 lg:h-full object-cover rounded-lg" />
                     </div>
                   )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {announcement.isNew && (
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800">NEW</span>
                      )}
                      {announcement.category && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{announcement.category}</span>
                      )}
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">Featured</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{announcement.title}</h3>
                    {announcement.description && (
                      <p className="text-gray-600 mb-4 leading-relaxed">{announcement.description}</p>
                    )}
                    <div className="flex items-center text-sm text-gray-500 space-x-6 mb-4">
                      {announcement.publishDate && (
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Published: {new Date(announcement.publishDate).toLocaleDateString()}
                        </span>
                      )}
                      {announcement.expiryDate && (
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href={`/announcements/${announcement.id}`} className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                        Read More
                      </Link>
                      {announcement.pdfFile && (
                        <a href={announcement.pdfFile} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                          <FileText className="h-4 w-4 mr-2" />
                          Download PDF
                        </a>
                      )}
                      {announcement.externalUrl && (
                        <a href={announcement.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary hover:text-white transition-colors">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          External Link
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {regular.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Announcements</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regular.map((announcement) => (
              <div key={announcement.id} className="govt-card">
                 {announcement.image && (
                   <SafeImage src={announcement.image} alt={announcement.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                 )}
                <div className="flex items-center gap-2 mb-3">
                  {announcement.isNew && (
                    <span className="px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800">NEW</span>
                  )}
                  {announcement.category && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{announcement.category}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{announcement.title}</h3>
                {announcement.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">{announcement.description}</p>
                )}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  {announcement.publishDate ? new Date(announcement.publishDate).toLocaleDateString() : new Date(announcement.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/announcements/${announcement.id}`} className="text-primary font-semibold hover:underline text-sm">
                    Read More
                  </Link>
                  {announcement.pdfFile && (
                    <a href={announcement.pdfFile} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80" title="Download PDF">
                      <FileText className="h-5 w-5" />
                    </a>
                  )}
                  {announcement.externalUrl && (
                    <a href={announcement.externalUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80" title="External Link">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {announcements.length === 0 && (
        <div className="text-center py-16">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No announcements available at this time.</p>
        </div>
      )}
    </div>
  )
}
