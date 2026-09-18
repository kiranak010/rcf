import { notFound } from 'next/navigation'
import { Calendar, FileText, ExternalLink, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

async function getTender(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/tenders/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.item
  } catch (error) {
    return null
  }
}

export default async function TenderDetailPage({ params }: { params: { id: string } }) {
  const tender = await getTender(params.id)

  if (!tender) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <Link href="/tenders" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Tenders
            </Link>
            <div className="govt-badge mb-4">
              <span className={tender.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                {tender.status === 'active' ? 'Active Tender' : 'Closed'}
              </span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight text-white">
              {tender.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 mt-4">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Tender No:</span>
                {tender.referenceNumber || 'N/A'}
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Deadline: {tender.deadline ? new Date(tender.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not specified'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tender Details</h3>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
                {tender.description}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="govt-border-block p-6 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-2">Estimated Value</h4>
                  <p className="text-gray-600">{tender.estimatedValue || 'Not disclosed'}</p>
                </div>
                <div className="govt-border-block p-6 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-2">Department</h4>
                  <p className="text-gray-600">{tender.department || 'Corporate Office'}</p>
                </div>
              </div>

              {tender.documents && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-primary" />
                    Tender Documents
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tender.documents.split(',').map((doc: string, idx: number) => (
                      <a key={idx} href={doc.trim()} target="_blank" rel="noopener noreferrer" className="govt-border-block p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <span className="text-sm font-medium text-gray-700 truncate mr-2">Download Document {idx + 1}</span>
                        <FileText className="h-4 w-4 text-primary" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="govt-border-block p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact & Application</h3>

                <div className="space-y-6 mb-8">
                  {tender.contactDetails && (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-3 text-primary mt-1" />
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                          <p className="text-sm text-gray-700">{tender.contactDetails.phone || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-primary mt-1" />
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                          <p className="text-sm text-gray-700">{tender.contactDetails.email || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-3 text-primary mt-1" />
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase">Office</p>
                          <p className="text-sm text-gray-700">{tender.contactDetails.office || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {tender.externalUrl ? (
                  <a href={tender.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full flex items-center justify-center py-4">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Apply Online
                  </a>
                ) : (
                  <div className="p-4 bg-gray-100 rounded-lg text-center text-sm text-gray-500">
                    Offline application only. Refer to documents.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
