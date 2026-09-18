import { notFound } from 'next/navigation'
import { Calendar, MapPin, Briefcase, GraduationCap, UserCheck, ArrowLeft, ExternalLink, FileText } from 'lucide-react'
import Link from 'next/link'

async function getJob(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/recruitment/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.item
  } catch (error) {
    return null
  }
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <Link href="/careers" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Openings
            </Link>
            <div className="govt-badge mb-4">
              <span className="bg-white/20 text-white">Career Opportunity</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight text-white">
              {job.jobTitle || job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 mt-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{job.location || 'Location not specified'}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                <span>{job.department || 'Department not specified'}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Closing Date: {job.closingDate ? new Date(job.closingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not specified'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h3>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12 whitespace-pre-wrap">
                {job.jobDescription || job.description || 'No detailed job description available.'}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="govt-border-block p-6 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                    Educational Qualifications
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{job.qualification || 'Not specified'}</p>
                </div>
                <div className="govt-border-block p-6 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <UserCheck className="h-5 w-5 mr-2 text-primary" />
                    Experience Required
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{job.experience || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="govt-border-block p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Application Details</h3>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Grade/Level</p>
                      <p className="text-sm text-gray-700 font-medium">{job.grade || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Advertisement No.</p>
                      <p className="text-sm text-gray-700 font-medium">{job.advertisementNo || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {job.applyUrl && (
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full flex items-center justify-center py-4">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Apply Online
                    </a>
                  )}

                  {job.notificationPdf && (
                    <a href={job.notificationPdf} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all">
                      <FileText className="h-5 w-5 mr-2" />
                      Download Notification
                    </a>
                  )}

                  {!job.applyUrl && !job.notificationPdf && (
                    <div className="p-4 bg-gray-100 rounded-lg text-center text-sm text-gray-500">
                      Application details not available. Please check the official portal.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
