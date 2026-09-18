import { notFound } from 'next/navigation'
import { ArrowLeft, FileText, CheckCircle2, HelpCircle, ExternalLink, Download, Info } from 'lucide-react'
import Link from 'next/link'

async function getScheme(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/farmer-schemes/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.item
  } catch (error) {
    return null
  }
}

export default async function SchemeDetailPage({ params }: { params: { id: string } }) {
  const scheme = await getScheme(params.id)

  if (!scheme) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <Link href="/farmer-support" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Support Center
            </Link>
            <div className="govt-badge mb-4">
              <span>Financial Assistance</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight text-white">
              {scheme.schemeName}
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-3xl leading-relaxed">
              Provided by: <span className="font-bold">{scheme.provider}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-2 text-primary" />
                  Scheme Overview
                </h3>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {scheme.benefits}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle2 className="h-6 w-6 mr-2 text-primary" />
                  Eligibility Criteria
                </h3>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {scheme.eligibility}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="h-6 w-6 mr-2 text-primary" />
                  How to Apply
                </h3>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {scheme.howToApply}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="govt-border-block p-6 sticky top-24 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Documents Required
                  </h3>
                  <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {scheme.docsRequired}
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={scheme.officialSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full flex items-center justify-center py-4 font-bold"
                  >
                    Visit Official Portal <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                  <button className="w-full btn-secondary py-4 font-bold flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" /> Download Application Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
