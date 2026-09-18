'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, ExternalLink, FileText, ArrowRight, Clock, Tag, Building2 } from 'lucide-react'

interface Tender {
  id: string
  title: string
  tenderNumber: string
  department?: string
  description?: string
  publishDate?: string
  closingDate?: string
  status: string
  tenderValue?: string
  contactDetails?: string
  documents?: string
  externalUrl?: string
}

export default function TendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tenders')
      .then((res) => res.json())
      .then((data) => {
        setTenders(data.items.filter((t: Tender) => t.status === 'active' || t.status === 'upcoming'))
        setLoading(false)
      })
  }, [])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800 border-green-200',
      upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
      closed: 'bg-gray-100 text-gray-800 border-gray-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const activeTenders = tenders.filter(t => t.status === 'active')
  const upcomingTenders = tenders.filter(t => t.status === 'upcoming')

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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Tenders</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Current and upcoming tenders. View details, download documents, and submit bids.</p>
      </div>

      {activeTenders.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Tag className="h-6 w-6 mr-2 text-green-600" />
            Active Tenders
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {activeTenders.map((tender) => (
              <div key={tender.id} className="govt-card border-l-4 border-l-green-500">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(tender.status)}`}>
                        {tender.status.toUpperCase()}
                      </span>
                      {tender.department && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{tender.department}</span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tender.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">Tender No: {tender.tenderNumber}</p>
                    {tender.description && (
                      <p className="text-gray-600 mb-4 leading-relaxed">{tender.description}</p>
                    )}
                    <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-6 mb-4">
                      {tender.publishDate && (
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Published: {new Date(tender.publishDate).toLocaleDateString()}
                        </span>
                      )}
                      {tender.closingDate && (
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Closes: {new Date(tender.closingDate).toLocaleDateString()}
                        </span>
                      )}
                      {tender.tenderValue && (
                        <span className="font-semibold text-gray-700">Value: {tender.tenderValue}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href={`/tenders/${tender.id}`} className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                        View Details
                      </Link>
                      {tender.documents && (
                        <a href={tender.documents} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                          <FileText className="h-4 w-4 mr-2" />
                          Download Documents
                        </a>
                      )}
                      {tender.externalUrl && (
                        <a href={tender.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary hover:text-white transition-colors">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          External Site
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

      {upcomingTenders.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Tag className="h-6 w-6 mr-2 text-blue-600" />
            Upcoming Tenders
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingTenders.map((tender) => (
              <div key={tender.id} className="govt-card">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full border ${getStatusColor(tender.status)}`}>
                    {tender.status.toUpperCase()}
                  </span>
                  {tender.department && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{tender.department}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tender.title}</h3>
                <p className="text-sm text-gray-500 mb-2">Tender No: {tender.tenderNumber}</p>
                {tender.closingDate && (
                  <p className="text-sm text-gray-600 mb-4 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Expected: {new Date(tender.closingDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tenders.length === 0 && (
        <div className="text-center py-16">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No tenders available at this time.</p>
        </div>
      )}
    </div>
  )
}
