'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, Briefcase, MapPin, Clock, Tag } from 'lucide-react'

interface Recruitment {
  id: string
  jobTitle: string
  advertisementNo?: string
  department?: string
  location?: string
  grade?: string
  qualification?: string
  experience?: string
  openingDate?: string
  closingDate?: string
  jobDescription?: string
  notificationPdf?: string
  applyUrl?: string
  status: string
  type: string
}

export default function RecruitmentPage() {
  const [items, setItems] = useState<Recruitment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/recruitment')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items.filter((r: Recruitment) => r.status === 'published' || r.status === 'active'))
        setLoading(false)
      })
  }, [])

  const getTypeBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      vacancy: 'bg-blue-100 text-blue-800 border-blue-200',
      shortlist: 'bg-green-100 text-green-800 border-green-200',
      result: 'bg-purple-100 text-purple-800 border-purple-200',
      update: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    }
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const vacancies = items.filter(i => i.type === 'vacancy')
  const results = items.filter(i => i.type === 'result' || i.type === 'shortlist')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>Careers</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              Recruitment
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              Current job openings, recruitment notices, and results. Join our team and build a rewarding career.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {vacancies.length > 0 && (
            <div className="mb-8">
              <div className="govt-section-heading mb-4">Current Vacancies</div>
              <div className="govt-border-block overflow-x-auto">
                <table className="govt-table w-full">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Department</th>
                      <th>Location</th>
                      <th>Closing Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vacancies.map((item) => (
                      <tr key={item.id}>
                        <td className="font-medium">{item.jobTitle}</td>
                        <td>{item.department || '-'}</td>
                        <td>{item.location || '-'}</td>
                        <td>{item.closingDate ? new Date(item.closingDate).toLocaleDateString() : '-'}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Link href={`/recruitment/${item.id}`} className="text-primary font-semibold hover:underline text-xs">View Details</Link>
                            {item.notificationPdf && (
                              <a href={item.notificationPdf} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline text-xs">Download</a>
                            )}
                            {item.applyUrl && (
                              <a href={item.applyUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline text-xs">Apply</a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div>
              <div className="govt-section-heading mb-4">Results & Shortlists</div>
              <div className="govt-border-block overflow-x-auto">
                <table className="govt-table w-full">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Department</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((item) => (
                      <tr key={item.id}>
                        <td className="font-medium">{item.jobTitle}</td>
                        <td>{item.type}</td>
                        <td>{item.department || '-'}</td>
                        <td>{item.closingDate ? new Date(item.closingDate).toLocaleDateString() : '-'}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Link href={`/recruitment/${item.id}`} className="text-primary font-semibold hover:underline text-xs">View Details</Link>
                            {item.notificationPdf && (
                              <a href={item.notificationPdf} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline text-xs">Download</a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {items.length === 0 && (
            <div className="text-center py-16">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No recruitment notices available at this time.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
