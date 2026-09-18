'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Briefcase, MapPin, Calendar } from 'lucide-react'

export default function CareersPage() {
  const [recruitments, setRecruitments] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/recruitment').then((res) => res.json()).then((data) => setRecruitments(data.items || []))
  }, [])

  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70 z-10" />
        <div className="relative z-20 container-custom">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Careers</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Join the RCF team.
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              Build a rewarding career with a leading public sector enterprise. Explore opportunities and grow with us.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Opportunities</div>
            <h2 className="section-title">Current Openings</h2>
          </div>
          {recruitments.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No active openings</h2>
              <p className="text-gray-600">Check back later for new career opportunities.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recruitments.map((job: any) => (
                <div key={job.id} className="card-base p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        {job.department && <span>Dept: {job.department}</span>}
                        {job.location && (
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" /> {job.location}
                          </span>
                        )}
                        {job.closingDate && (
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" /> Last Date: {new Date(job.closingDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link href={`/careers/${job.slug || job.id}`} className="btn-primary">
                      Apply Now
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
