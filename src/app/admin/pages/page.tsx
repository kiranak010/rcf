'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'

export default function PagesAdminPage() {
  const [pages, setPages] = useState<any[]>([])

  useEffect(() => {
    setPages([
      { id: '1', title: 'Home', slug: '/', status: 'published', updatedAt: '2024-01-15' },
      { id: '2', title: 'About Us', slug: '/about', status: 'published', updatedAt: '2024-01-14' },
      { id: '3', title: 'Products', slug: '/products', status: 'published', updatedAt: '2024-01-13' },
      { id: '4', title: 'Tenders', slug: '/tenders', status: 'published', updatedAt: '2024-01-12' },
      { id: '5', title: 'Careers', slug: '/careers', status: 'published', updatedAt: '2024-01-11' },
    ])
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
          <p className="text-gray-600 mt-2">Manage website pages and content.</p>
        </div>
        <Link href="/admin/pages/new" className="btn-primary">
          <Plus className="h-4 w-4 mr-2" /> New Page
        </Link>
      </div>

      <div className="card-base overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{page.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{page.slug}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-sm ${page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{page.updatedAt}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={page.slug} target="_blank" className="text-gray-600 hover:text-gray-900">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link href={`/admin/pages/${page.id}`} className="text-primary hover:text-primary/80">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
