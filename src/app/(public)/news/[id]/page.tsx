import { notFound } from 'next/navigation'
import { Calendar, Tag, FileText, ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import SafeImage from '@/components/public/SafeImage'

async function getNewsItem(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/news/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.item
  } catch (error) {
    return null
  }
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const item = await getNewsItem(params.id)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <Link href="/news" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to News
            </Link>
            <div className="govt-badge mb-4">
              <span>{item.category || 'Press Release'}</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight text-white">
              {item.title}
            </h1>
            <div className="flex items-center text-white/80 mt-4">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{item.date ? new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date not available'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {item.image && (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                  <SafeImage src={item.image} alt={item.title} className="w-full h-auto" />
                </div>
              )}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {item.content ? (
                  <div className="whitespace-pre-wrap">{item.content}</div>
                ) : (
                  <div className="whitespace-pre-wrap">{item.description}</div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="govt-border-block p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h3>

                <div className="space-y-4">
                  {item.documents && (
                    <div>
                      <div className="flex items-center text-sm font-semibold text-gray-500 mb-2">
                        <FileText className="h-4 w-4 mr-2" />
                        Documents
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.documents.split(',').map((doc: string, idx: number) => (
                          <a key={idx} href={doc.trim()} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline block mb-1">
                            Download PDF
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.externalLinks && (
                    <div>
                      <div className="flex items-center text-sm font-semibold text-gray-500 mb-2">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        External Links
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.externalLinks.split(',').map((link: string, idx: number) => (
                          <a key={idx} href={link.trim()} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline block mb-1">
                            Visit Website
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {!item.documents && !item.externalLinks && (
                    <p className="text-sm text-gray-500 italic">No additional resources available for this story.</p>
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
