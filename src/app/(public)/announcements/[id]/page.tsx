import { notFound } from 'next/navigation'
import { Calendar, Tag, FileText, ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

async function getAnnouncement(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/announcements/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.item
  } catch (error) {
    return null
  }
}

export default async function AnnouncementDetailPage({ params }: { params: { id: string } }) {
  const announcement = await getAnnouncement(params.id)

  if (!announcement) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <Link href="/announcements" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Announcements
            </Link>
            <div className="govt-badge mb-4">
              <span>{announcement.category || 'General Announcement'}</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight text-white">
              {announcement.title}
            </h1>
            <div className="flex items-center text-white/80 mt-4">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{announcement.date ? new Date(announcement.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date not available'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="govt-border-block p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap mb-12">
                {announcement.description || 'No detailed content available for this announcement.'}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                {announcement.pdfFile && (
                  <a href={announcement.pdfFile} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center px-6 py-3">
                    <FileText className="h-5 w-5 mr-2" />
                    Download PDF
                  </a>
                )}
                {announcement.externalUrl && (
                  <a href={announcement.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center px-6 py-3">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Visit External Link
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
