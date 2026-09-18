'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function TendersPage() {
  const [tenders, setTenders] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/tenders').then((res) => res.json()).then((data) => setTenders(data.items || []))
  }, [])

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>Tenders</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              Business opportunities with RCF.
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              Browse current and upcoming tenders. Partner with us for goods, services, and works.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {tenders.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No active tenders</h2>
              <p className="text-gray-600">Check back later for new opportunities.</p>
            </div>
          ) : (
            <div className="govt-border-block overflow-x-auto">
              <table className="govt-table w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Reference</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tenders.map((tender: any) => (
                    <tr key={tender.id}>
                      <td className="font-medium">{tender.title}</td>
                      <td>{tender.referenceNumber || '-'}</td>
                      <td>{tender.deadline ? new Date(tender.deadline).toLocaleDateString() : '-'}</td>
                      <td>{tender.status || 'Active'}</td>
                      <td>
                        <Link href={`/tenders/${tender.slug || tender.id}`} className="text-primary font-semibold hover:underline">View</Link>
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
