'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function SEOAdminPage() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    setItems([
      { id: '1', page: 'Home', title: 'RCF - Rashtriya Chemicals and Fertilizers Limited', updatedAt: '2024-01-15' },
      { id: '2', page: 'About Us', title: 'About RCF - Rashtriya Chemicals and Fertilizers Limited', updatedAt: '2024-01-10' },
    ])
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO</h1>
          <p className="text-gray-600 mt-2">Manage SEO metadata for pages.</p>
        </div>
        <Link href="/admin/seo/new" className="btn-primary">
          <Plus className="h-4 w-4 mr-2" /> New Entry
        </Link>
      </div>

      <div className="card-base overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SEO Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.page}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.updatedAt}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/seo/${item.id}`} className="text-primary hover:text-primary/80">
                      <Edit className="h-4 w-4" />
                    </Link>
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
