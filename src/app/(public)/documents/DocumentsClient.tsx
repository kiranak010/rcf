'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Download, Search } from 'lucide-react'

interface Document {
  id: string
  title: string
  description?: string
  category?: string
  filePath: string
  fileType?: string
  fileSize?: number
  isPublic: boolean
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`/api/documents?limit=100&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data.items.filter((d: Document) => d.isPublic))
        setLoading(false)
      })
  }, [search])

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="govt-badge mb-4">
              <span>Documents</span>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              Documents
            </h1>
            <p className="mt-3 text-lg text-gray-200 md:text-xl max-w-3xl">
              Download important documents and forms.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documents..."
                className="pl-10 block w-full border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="govt-border-block overflow-x-auto">
            <table className="govt-table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="font-medium">{doc.title}</td>
                    <td>{doc.category || '-'}</td>
                    <td>{formatFileSize(doc.fileSize)}</td>
                    <td>
                      <a href={doc.filePath} download className="text-primary font-semibold hover:underline text-xs">Download</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {documents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No documents available.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
